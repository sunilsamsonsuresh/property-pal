import { z } from "zod";

export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  imageUrl: z.string().optional(),
  timestamp: z.number(),
});

export const sendMessageSchema = z.object({
  sessionId: z.string(),
  input: z.object({
    text: z.string().optional(),
    image: z.string().optional(),
  }),
});

export type Message = z.infer<typeof messageSchema>;
export type SendMessageRequest = z.infer<typeof sendMessageSchema>;
