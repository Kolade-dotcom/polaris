// Branded types for IDs - following CLAUDE.md C-5
// This prevents mixing up different ID types

declare const __brand: unique symbol;

type Brand<B> = { [__brand]: B };

export type Branded<T, B> = T & Brand<B>;

// ID Types
export type ProjectId = Branded<string, "ProjectId">;
export type FileId = Branded<string, "FileId">;
export type UserId = Branded<string, "UserId">;
export type ConversationId = Branded<string, "ConversationId">;
export type MessageId = Branded<string, "MessageId">;

// Factory functions to create branded IDs
export function createProjectId(id: string): ProjectId {
  return id as ProjectId;
}

export function createFileId(id: string): FileId {
  return id as FileId;
}

export function createUserId(id: string): UserId {
  return id as UserId;
}

export function createConversationId(id: string): ConversationId {
  return id as ConversationId;
}

export function createMessageId(id: string): MessageId {
  return id as MessageId;
}
