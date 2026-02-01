import { describe, expect, test } from "vitest";
import type { Id } from "@convex/_generated/dataModel";

// Re-create the types and functions here for testing
type FileType = "file" | "folder";

interface FileNode {
  _id: Id<"files">;
  name: string;
  type: FileType;
  path: string;
  parentId?: Id<"files">;
}

function sortNodes(nodes: FileNode[]): FileNode[] {
  return [...nodes].sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }
    return a.type === "folder" ? -1 : 1;
  });
}

function buildTree(files: FileNode[]): FileNode[] {
  const map = new Map<string | undefined, FileNode[]>();

  for (const file of files) {
    const parentId = file.parentId;
    const existing = map.get(parentId);
    if (existing) {
      existing.push(file);
    } else {
      map.set(parentId, [file]);
    }
  }

  const rootFiles = map.get(undefined) ?? [];
  return sortNodes(rootFiles);
}

function getChildren(files: FileNode[], parentId: Id<"files">): FileNode[] {
  return sortNodes(files.filter((f) => f.parentId === parentId));
}

// Helper to create mock IDs
function mockId(id: string): Id<"files"> {
  return id as Id<"files">;
}

describe("sortNodes", () => {
  test("sorts folders before files", () => {
    const nodes: FileNode[] = [
      { _id: mockId("1"), name: "file.txt", type: "file", path: "/file.txt" },
      { _id: mockId("2"), name: "folder", type: "folder", path: "/folder" },
    ];

    const result = sortNodes(nodes);

    expect(result.map((n) => n.name)).toEqual(["folder", "file.txt"]);
  });

  test("sorts alphabetically within same type", () => {
    const nodes: FileNode[] = [
      { _id: mockId("1"), name: "zebra.txt", type: "file", path: "/zebra.txt" },
      { _id: mockId("2"), name: "alpha.txt", type: "file", path: "/alpha.txt" },
    ];

    const result = sortNodes(nodes);

    expect(result.map((n) => n.name)).toEqual(["alpha.txt", "zebra.txt"]);
  });

  test("handles empty array", () => {
    const result = sortNodes([]);
    expect(result).toEqual([]);
  });
});

describe("buildTree", () => {
  test("returns root-level files and folders", () => {
    const files: FileNode[] = [
      { _id: mockId("1"), name: "src", type: "folder", path: "/src" },
      { _id: mockId("2"), name: "package.json", type: "file", path: "/package.json" },
    ];

    const result = buildTree(files);

    expect(result).toHaveLength(2);
    expect(result.map((f) => f.name)).toEqual(["src", "package.json"]);
  });

  test("excludes nested files from root", () => {
    const parentId = mockId("1");
    const files: FileNode[] = [
      { _id: mockId("1"), name: "src", type: "folder", path: "/src" },
      { _id: mockId("2"), name: "index.ts", type: "file", path: "/src/index.ts", parentId },
    ];

    const result = buildTree(files);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("src");
  });

  test("handles empty array", () => {
    const result = buildTree([]);
    expect(result).toEqual([]);
  });
});

describe("getChildren", () => {
  test("returns children of specified parent", () => {
    const parentId = mockId("1");
    const files: FileNode[] = [
      { _id: mockId("1"), name: "src", type: "folder", path: "/src" },
      { _id: mockId("2"), name: "index.ts", type: "file", path: "/src/index.ts", parentId },
      { _id: mockId("3"), name: "utils.ts", type: "file", path: "/src/utils.ts", parentId },
    ];

    const result = getChildren(files, parentId);

    expect(result).toHaveLength(2);
    expect(result.map((f) => f.name)).toEqual(["index.ts", "utils.ts"]);
  });

  test("returns empty array when no children", () => {
    const parentId = mockId("1");
    const files: FileNode[] = [
      { _id: mockId("1"), name: "src", type: "folder", path: "/src" },
    ];

    const result = getChildren(files, parentId);

    expect(result).toEqual([]);
  });

  test("sorts children with folders first", () => {
    const parentId = mockId("1");
    const files: FileNode[] = [
      { _id: mockId("1"), name: "src", type: "folder", path: "/src" },
      { _id: mockId("2"), name: "index.ts", type: "file", path: "/src/index.ts", parentId },
      { _id: mockId("3"), name: "components", type: "folder", path: "/src/components", parentId },
    ];

    const result = getChildren(files, parentId);

    expect(result.map((f) => f.name)).toEqual(["components", "index.ts"]);
  });
});
