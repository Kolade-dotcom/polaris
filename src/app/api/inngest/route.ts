import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { processAIChat } from "@/inngest/functions/ai-chat";
import { analyzeCode, processQuickEdit } from "@/inngest/functions/code-analysis";

// Create an API that serves Inngest functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processAIChat,
    analyzeCode,
    processQuickEdit,
    // Add more functions here
  ],
});
