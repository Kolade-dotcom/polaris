"use client";

import { ReactNode } from "react";
import {
  Panel,
  Group as PanelGroup,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";

interface IDELayoutProps {
  sidebar: ReactNode;
  editor: ReactNode;
  aiPanel?: ReactNode;
}

export function IDELayout({ sidebar, editor, aiPanel }: IDELayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* IDE Toolbar */}
      <IDEToolbar />

      {/* Resizable Panels */}
      <PanelGroup direction="horizontal" className="flex-1">
        {/* File Explorer Sidebar */}
        <Panel
          defaultSize={20}
          minSize={15}
          maxSize={35}
          className="bg-card border-r border-border"
        >
          {sidebar}
        </Panel>

        <PanelResizeHandle className="w-1 bg-border hover:bg-coral/50 transition-colors" />

        {/* Editor Area */}
        <Panel defaultSize={aiPanel ? 55 : 80} minSize={30}>
          {editor}
        </Panel>

        {/* AI Panel (optional) */}
        {aiPanel && (
          <>
            <PanelResizeHandle className="w-1 bg-border hover:bg-coral/50 transition-colors" />
            <Panel
              defaultSize={25}
              minSize={20}
              maxSize={40}
              className="bg-card border-l border-border"
            >
              {aiPanel}
            </Panel>
          </>
        )}
      </PanelGroup>

      {/* Status Bar */}
      <IDEStatusBar />
    </div>
  );
}

function IDEToolbar() {
  return (
    <div className="h-12 border-b border-border bg-card flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-sm">Project Name</span>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>main</span>
          <span>•</span>
          <span>2 files changed</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function IDEStatusBar() {
  return (
    <div className="h-6 bg-primary text-primary-foreground flex items-center px-3 text-xs justify-between">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          main*
        </span>
        <span className="flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          0 errors, 0 warnings
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span>Ln 1, Col 1</span>
        <span>UTF-8</span>
        <span>TypeScript</span>
        <span className="flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Prettier
        </span>
      </div>
    </div>
  );
}
