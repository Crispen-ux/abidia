import { NextResponse } from "next/server";
import { z } from "zod";
import { answerLocally, chatSystemPrompt, type ChatMessage } from "@/lib/chat-engine";

export const runtime = "nodejs";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      })
    )
    .min(1)
    .max(20),
});

async function askOpenAI(messages: ChatMessage[], system: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.CHAT_MODEL ?? "gpt-4o-mini",
      messages: [{ role: "system", content: system }, ...messages],
      max_tokens: 400,
      temperature: 0.3,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) throw new Error(`OpenAI responded ${response.status}`);
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("Empty completion");
  return content.trim();
}

async function askAnthropic(messages: ChatMessage[], system: string): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY as string,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.CHAT_MODEL ?? "claude-3-5-haiku-latest",
      system,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      max_tokens: 400,
      temperature: 0.3,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) throw new Error(`Anthropic responded ${response.status}`);
  const data = await response.json();
  const content = data?.content?.[0]?.text;
  if (typeof content !== "string") throw new Error("Empty completion");
  return content.trim();
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const messages = parsed.data.messages;
  const lastUser = [...messages].reverse().find((message) => message.role === "user");
  const system = chatSystemPrompt();

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const reply = await askAnthropic(messages, system);
      return NextResponse.json({ reply, source: "ai" });
    } catch {
      /* fall through to the local engine */
    }
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      const reply = await askOpenAI(messages, system);
      return NextResponse.json({ reply, source: "ai" });
    } catch {
      /* fall through to the local engine */
    }
  }

  const local = answerLocally(lastUser?.content ?? "");
  return NextResponse.json({ reply: local.content, suggestions: local.suggestions, source: "local" });
}
