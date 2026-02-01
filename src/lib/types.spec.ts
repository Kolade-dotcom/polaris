import { describe, expect, test } from "vitest";
import {
  createProjectId,
  createFileId,
  createUserId,
  createConversationId,
  createMessageId,
  type ProjectId,
  type FileId,
  type UserId,
  type ConversationId,
  type MessageId,
} from "./types";

describe("Branded ID factory functions", () => {
  test("createProjectId creates a branded ProjectId", () => {
    const id = createProjectId("proj_123");

    expect(id).toBe("proj_123");
    expect(typeof id).toBe("string");
  });

  test("createFileId creates a branded FileId", () => {
    const id = createFileId("file_456");

    expect(id).toBe("file_456");
    expect(typeof id).toBe("string");
  });

  test("createUserId creates a branded UserId", () => {
    const id = createUserId("user_789");

    expect(id).toBe("user_789");
    expect(typeof id).toBe("string");
  });

  test("createConversationId creates a branded ConversationId", () => {
    const id = createConversationId("conv_abc");

    expect(id).toBe("conv_abc");
    expect(typeof id).toBe("string");
  });

  test("createMessageId creates a branded MessageId", () => {
    const id = createMessageId("msg_def");

    expect(id).toBe("msg_def");
    expect(typeof id).toBe("string");
  });
});

describe("Brand type safety", () => {
  test("ProjectId accepts only valid project IDs at compile time", () => {
    // This test verifies the branded type pattern works
    // The actual type safety is enforced by TypeScript at compile time
    const projectId: ProjectId = createProjectId("test_project");
    expect(projectId).toBe("test_project");
  });

  test("FileId accepts only valid file IDs at compile time", () => {
    const fileId: FileId = createFileId("test_file");
    expect(fileId).toBe("test_file");
  });

  test("UserId accepts only valid user IDs at compile time", () => {
    const userId: UserId = createUserId("test_user");
    expect(userId).toBe("test_user");
  });

  test("ConversationId accepts only valid conversation IDs at compile time", () => {
    const conversationId: ConversationId = createConversationId("test_conv");
    expect(conversationId).toBe("test_conv");
  });

  test("MessageId accepts only valid message IDs at compile time", () => {
    const messageId: MessageId = createMessageId("test_msg");
    expect(messageId).toBe("test_msg");
  });
});
