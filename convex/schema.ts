import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User profiles (extends Clerk user data)
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Projects
  projects: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    ownerId: v.string(), // Clerk user ID
    language: v.optional(v.string()), // primary language
    isPublic: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_owner_updated", ["ownerId", "updatedAt"]),

  // Files and folders
  files: defineTable({
    projectId: v.id("projects"),
    name: v.string(),
    path: v.string(), // full path like "/src/components/Button.tsx"
    type: v.union(v.literal("file"), v.literal("folder")),
    content: v.optional(v.string()), // only for files
    language: v.optional(v.string()), // typescript, javascript, css, etc.
    parentId: v.optional(v.id("files")), // null for root items
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_project_parent", ["projectId", "parentId"])
    .index("by_path", ["projectId", "path"]),

  // Conversations (AI chat)
  conversations: defineTable({
    projectId: v.optional(v.id("projects")), // null for general chat
    userId: v.string(), // Clerk user ID
    title: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"])
    .index("by_user_updated", ["userId", "updatedAt"]),

  // Messages within conversations
  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    metadata: v.optional(v.object({
      model: v.optional(v.string()),
      tokensUsed: v.optional(v.number()),
      processingTime: v.optional(v.number()),
    })),
    createdAt: v.number(),
  })
    .index("by_conversation", ["conversationId"])
    .index("by_conversation_created", ["conversationId", "createdAt"]),

  // Open files (for tracking which files are open in the editor)
  openFiles: defineTable({
    projectId: v.id("projects"),
    userId: v.string(), // Clerk user ID
    fileId: v.id("files"),
    isActive: v.boolean(), // is this the currently active tab
    cursorPosition: v.optional(v.object({
      line: v.number(),
      column: v.number(),
    })),
    openedAt: v.number(),
  })
    .index("by_user_project", ["userId", "projectId"])
    .index("by_file", ["fileId"]),
});
