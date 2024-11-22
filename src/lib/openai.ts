import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: import.meta.env.VITE_OPENAI_ORG_ID,
});

export const ASSISTANT_ID = import.meta.env.VITE_OPENAI_ASSISTANT_ID;