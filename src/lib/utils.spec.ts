import { describe, expect, test, vi } from "vitest";
import { formatDistanceToNow } from "./utils";

describe(formatDistanceToNow.name, () => {
  test("returns 'just now' for times less than 60 seconds ago", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    const result = formatDistanceToNow(now - 30 * 1000);

    expect(result).toBe("just now");
  });

  test("returns minutes ago for times less than 1 hour ago", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    const result = formatDistanceToNow(now - 5 * 60 * 1000);

    expect(result).toBe("5m ago");
  });

  test("returns hours ago for times less than 24 hours ago", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    const result = formatDistanceToNow(now - 3 * 60 * 60 * 1000);

    expect(result).toBe("3h ago");
  });

  test("returns days ago for times less than 7 days ago", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    const result = formatDistanceToNow(now - 2 * 24 * 60 * 60 * 1000);

    expect(result).toBe("2d ago");
  });

  test("returns weeks ago for times less than 4 weeks ago", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    const result = formatDistanceToNow(now - 2 * 7 * 24 * 60 * 60 * 1000);

    expect(result).toBe("2w ago");
  });

  test("returns months ago for times less than 12 months ago", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    const result = formatDistanceToNow(now - 3 * 30 * 24 * 60 * 60 * 1000);

    expect(result).toBe("3mo ago");
  });

  test("returns years ago for times more than 12 months ago", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    const result = formatDistanceToNow(now - 2 * 365 * 24 * 60 * 60 * 1000);

    expect(result).toBe("2y ago");
  });
});
