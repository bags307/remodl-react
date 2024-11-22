import { OpenAIStream, StreamingTextResponse } from 'ai';
import { openai, ASSISTANT_ID } from '@/lib/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Create a thread
  const thread = await openai.beta.threads.create();

  // Add messages to thread
  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: messages[messages.length - 1].content,
  });

  // Run the assistant
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: ASSISTANT_ID,
  });

  // Create a stream
  const stream = OpenAIStream(await openai.beta.threads.runs.retrieve(thread.id, run.id));

  // Return a StreamingTextResponse
  return new StreamingTextResponse(stream);
}