import { describe, expect, test, vi } from "vitest";
import { getAuthUserId } from "./utils";

describe("getAuthUserId", () => {
  test("returns null when no user is authenticated", async () => {
    const mockCtx = {
      auth: {
        getUserIdentity: vi.fn().mockResolvedValue(null),
      },
    } as unknown as Parameters<typeof getAuthUserId>[0];

    const result = await getAuthUserId(mockCtx);

    expect(result).toBeNull();
  });

  test("returns subject from user identity when authenticated", async () => {
    const mockSubject = "user_123";
    const mockCtx = {
      auth: {
        getUserIdentity: vi.fn().mockResolvedValue({
          subject: mockSubject,
          issuer: "https://clerk.example.com",
        }),
      },
    } as unknown as Parameters<typeof getAuthUserId>[0];

    const result = await getAuthUserId(mockCtx);

    expect(result).toBe(mockSubject);
  });
});
