import { inngest } from "../client";

// Function to process AI chat messages
export const processAIChat = inngest.createFunction(
  { id: "process-ai-chat" },
  { event: "ai/chat.requested" },
  async ({ event, step }) => {
    const { conversationId, message, model = "gemini-2.0-flash" } = event.data;

    // Log the request
    await step.run("log-request", async () => {
      console.log(`Processing AI chat for conversation ${conversationId}`);
      return { conversationId, model };
    });

    // Call AI API (placeholder for actual implementation)
    const response = await step.run("call-ai-api", async () => {
      // This will be implemented with the actual AI provider
      // For now, return a placeholder response
      return {
        content: "I'm processing your request. This is a placeholder response.",
        model,
        tokensUsed: 0,
      };
    });

    // Store the response
    await step.run("store-response", async () => {
      // This will call the Convex mutation to store the AI response
      return { success: true, conversationId };
    });

    return {
      success: true,
      conversationId,
      response: response.content,
    };
  }
);
