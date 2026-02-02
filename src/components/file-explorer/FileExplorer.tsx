"use client";

import { useState, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
  FilePlus,
  FolderPlus,
  Trash2,
  Edit3,
} from "lucide-react";
import type { ProjectId } from "@/lib/types";

type FileType = "file" | "folder";

interface FileNode {
  _id: Id<"files">;
  name: string;
  type: FileType;
  path: string;
  parentId?: Id<"files">;
}

interface FileExplorerProps {
  projectId: ProjectId;
}

// Demo files for when Convex is not configured
const demoFiles: FileNode[] = [
  {
    _id: "demo-folder-1" as Id<"files">,
    name: "src",
    type: "folder",
    path: "/src",
  },
  {
    _id: "demo-file-1" as Id<"files">,
    name: "page.tsx",
    type: "file",
    path: "/src/page.tsx",
    parentId: "demo-folder-1" as Id<"files">,
  },
  {
    _id: "demo-file-2" as Id<"files">,
    name: "layout.tsx",
    type: "file",
    path: "/src/layout.tsx",
    parentId: "demo-folder-1" as Id<"files">,
  },
  {
    _id: "demo-file-3" as Id<"files">,
    name: "package.json",
    type: "file",
    path: "/package.json",
  },
];

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

export function FileExplorer({ projectId }: FileExplorerProps) {
  // Convert branded ProjectId to Convex Id format for the query
  const convexProjectId = projectId as unknown as Id<"projects">;

  // Try to use Convex, fallback to demo data if not configured
  let files: FileNode[] | undefined;
  try {
    files = useQuery(api.files.list, { projectId: convexProjectId });
  } catch (e) {
    // Convex not configured, use demo data
    files = demoFiles;
  }

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  const toggleFolder = useCallback((folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  }, []);

  const handleNewFile = useCallback(() => {
    console.log("New file clicked - not implemented yet");
  }, []);

  const handleNewFolder = useCallback(() => {
    console.log("New folder clicked - not implemented yet");
  }, []);

  const rootFiles = files ? buildTree(files) : [];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Explorer
        </span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleNewFile}
            title="New File"
          >
            <FilePlus className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleNewFolder}
            title="New Folder"
          >
            <FolderPlus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto py-2">
        {files === undefined ? (
          <div className="px-3 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 bg-muted rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="px-1">
            {rootFiles.map((file) => (
              <FileTreeNode
                key={file._id}
                file={file}
                files={files}
                expandedFolders={expandedFolders}
                onToggle={toggleFolder}
                level={0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface FileTreeNodeProps {
  file: FileNode;
  files: FileNode[];
  expandedFolders: Set<string>;
  onToggle: (id: string) => void;
  level: number;
}

function FileTreeNode({
  file,
  files,
  expandedFolders,
  onToggle,
  level,
}: FileTreeNodeProps) {
  const isExpanded = expandedFolders.has(file._id);
  const isFolder = file.type === "folder";
  const children = isFolder ? getChildren(files, file._id) : [];
  const paddingLeft = level * 12 + 8;

  const handleNewFile = useCallback(() => {
    console.log("New file in folder:", file.name);
  }, [file.name]);

  const handleNewFolder = useCallback(() => {
    console.log("New folder in folder:", file.name);
  }, [file.name]);

  const handleRename = useCallback(() => {
    console.log("Rename:", file.name);
  }, [file.name]);

  const handleDelete = useCallback(() => {
    console.log("Delete:", file.name);
  }, [file.name]);

  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>
          <button
            className="w-full flex items-center gap-1.5 px-2 py-1.5 text-sm hover:bg-secondary rounded-sm transition-colors group"
            style={{ paddingLeft }}
            onClick={() => isFolder && onToggle(file._id)}
          >
            {isFolder ? (
              <>
                <span className="w-4 flex items-center justify-center">
                  {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </span>
                {isExpanded ? (
                  <FolderOpen className="h-4 w-4 text-coral" />
                ) : (
                  <Folder className="h-4 w-4 text-coral" />
                )}
              </>
            ) : (
              <>
                <span className="w-4" />
                <File className="h-4 w-4 text-muted-foreground" />
              </>
            )}
            <span className="truncate">{file.name}</span>
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {isFolder ? (
            <>
              <ContextMenuItem onClick={handleNewFile}>
                <FilePlus className="h-4 w-4 mr-2" />
                New File
              </ContextMenuItem>
              <ContextMenuItem onClick={handleNewFolder}>
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </ContextMenuItem>
            </>
          ) : null}
          <ContextMenuItem onClick={handleRename}>
            <Edit3 className="h-4 w-4 mr-2" />
            Rename
          </ContextMenuItem>
          <ContextMenuItem className="text-destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {isFolder &&
        isExpanded &&
        children.map((child) => (
          <FileTreeNode
            key={child._id}
            file={child}
            files={files}
            expandedFolders={expandedFolders}
            onToggle={onToggle}
            level={level + 1}
          />
        ))}
    </div>
  );
}
