import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();

const WEBHOOK_URL: string = process.env.WEBHOOK_PROD_URL as string;

if (!WEBHOOK_URL) {
  throw new Error("Missing WEBHOOK_PROD_URL in environment variables");
}

// Configure multer for in-memory uploads
const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint
  app.post("/api/chat", upload.single("image"), async (req, res) => {
    try {
      const { sessionId, text } = req.body;
      const imageFile = req.file;

      // Build form-data payload for n8n
      const formData = new FormData();
      formData.append("sessionId", sessionId || "anonymous");

      if (text) {
        formData.append("text", text);
      }

      if (imageFile) {
        formData.append("image", imageFile.buffer, {
          filename: imageFile.originalname,
          contentType: imageFile.mimetype,
        });
      }

      // Send to n8n production webhook
      const { data } = await axios.post(WEBHOOK_URL, formData, {
        headers: formData.getHeaders(),
        timeout: 30000,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      // Expect clean JSON { "answer": "..." } from n8n
      let responseText: string;

      if (data?.answer) {
        responseText = typeof data.answer === "string" ? data.answer : JSON.stringify(data.answer);
      } else if (data?.output) {
        responseText = typeof data.output === "string" ? data.output : JSON.stringify(data.output);
      } else {
        // fallback: dump full response
        responseText = JSON.stringify(data);
      }

      return res.json({ response: responseText });
    } catch (error: unknown) {
      console.error("Webhook error:", error);

      if (axios.isAxiosError(error)) {
        return res.status(error.response?.status || 500).json({
          error: "Failed to process message",
          details: error.response?.data || error.message,
        });
      }

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
