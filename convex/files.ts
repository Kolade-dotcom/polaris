import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "./utils";

// Get all files for a project
export const list = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    // Verify project ownership
    const project = await ctx.db.get(args.projectId);
    if (!project || project.ownerId !== userId) return [];

    return await ctx.db
      .query("files")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("asc")
      .collect();
  },
});

// Get a single file by ID
export const get = query({
  args: { id: v.id("files") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const file = await ctx.db.get(args.id);
    if (!file) return null;

    const project = await ctx.db.get(file.projectId);
    if (!project || project.ownerId !== userId) return null;

    return file;
  },
});

// Get file by path
export const getByPath = query({
  args: {
    projectId: v.id("projects"),
    path: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const project = await ctx.db.get(args.projectId);
    if (!project || project.ownerId !== userId) return null;

    const files = await ctx.db
      .query("files")
      .withIndex("by_path", (q) =>
        q.eq("projectId", args.projectId).eq("path", args.path)
      )
      .take(1);

    return files[0] ?? null;
  },
});

// Create a new file or folder
export const create = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.string(),
    path: v.string(),
    type: v.union(v.literal("file"), v.literal("folder")),
    content: v.optional(v.string()),
    language: v.optional(v.string()),
    parentId: v.optional(v.id("files")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const project = await ctx.db.get(args.projectId);
    if (!project || project.ownerId !== userId) {
      throw new Error("Project not found or access denied");
    }

    const now = Date.now();
    const fileId = await ctx.db.insert("files", {
      projectId: args.projectId,
      name: args.name,
      path: args.path,
      type: args.type,
      content: args.content,
      language: args.language,
      parentId: args.parentId,
      createdAt: now,
      updatedAt: now,
    });

    // Update project updatedAt
    await ctx.db.patch(args.projectId, { updatedAt: now });

    return fileId;
  },
});

// Update file content
export const updateContent = mutation({
  args: {
    id: v.id("files"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const file = await ctx.db.get(args.id);
    if (!file) throw new Error("File not found");

    const project = await ctx.db.get(file.projectId);
    if (!project || project.ownerId !== userId) {
      throw new Error("Access denied");
    }

    const now = Date.now();
    await ctx.db.patch(args.id, {
      content: args.content,
      updatedAt: now,
    });

    await ctx.db.patch(file.projectId, { updatedAt: now });

    return await ctx.db.get(args.id);
  },
});

// Rename a file or folder
export const rename = mutation({
  args: {
    id: v.id("files"),
    name: v.string(),
    path: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const file = await ctx.db.get(args.id);
    if (!file) throw new Error("File not found");

    const project = await ctx.db.get(file.projectId);
    if (!project || project.ownerId !== userId) {
      throw new Error("Access denied");
    }

    const now = Date.now();
    await ctx.db.patch(args.id, {
      name: args.name,
      path: args.path,
      updatedAt: now,
    });

    // If folder, update all children paths
    if (file.type === "folder") {
      const children = await ctx.db
        .query("files")
        .withIndex("by_project_parent", (q) =>
          q.eq("projectId", file.projectId).eq("parentId", args.id)
        )
        .collect();

      for (const child of children) {
        const newChildPath = args.path + child.path.slice(file.path.length);
        await ctx.db.patch(child._id, { path: newChildPath });
      }
    }

    await ctx.db.patch(file.projectId, { updatedAt: now });

    return await ctx.db.get(args.id);
  },
});

// Delete a file or folder
export const remove = mutation({
  args: { id: v.id("files") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const file = await ctx.db.get(args.id);
    if (!file) throw new Error("File not found");

    const project = await ctx.db.get(file.projectId);
    if (!project || project.ownerId !== userId) {
      throw new Error("Access denied");
    }

    // If folder, recursively delete children
    if (file.type === "folder") {
      const children = await ctx.db
        .query("files")
        .withIndex("by_project_parent", (q) =>
          q.eq("projectId", file.projectId).eq("parentId", args.id)
        )
        .collect();

      for (const child of children) {
        await ctx.db.delete(child._id);
      }
    }

    await ctx.db.delete(args.id);

    // Update project updatedAt
    await ctx.db.patch(file.projectId, { updatedAt: Date.now() });

    return { success: true };
  },
});
