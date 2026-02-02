"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import {
  Panel,
  Group as PanelGroup,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";
import { ArrowLeft, Search, Settings, Menu } from "lucide-react";

interface IDELayoutProps {
  sidebar: ReactNode;
  editor: ReactNode;
  aiPanel?: ReactNode;
}

export function IDELayout({ sidebar, editor, aiPanel }: IDELayoutProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* IDE Toolbar */}
      <IDEToolbar
        onSearch={() => setShowSearch(true)}
        onSettings={() => setShowSettings(true)}
      />

      {/* Resizable Panels */}
      <PanelGroup direction="horizontal" className="flex-1" autoSaveId="ide-layout">
        {/* File Explorer Sidebar */}
        <Panel
          id="sidebar"
          defaultSize={30}
          minSize={15}
          maxSize={40}
          className="bg-card border-r border-border"
        >
          {sidebar}
        </Panel>

        {/* Resize Handle - File Explorer to Editor */}
        <PanelResizeHandle className="w-1.5 bg-border hover:bg-coral transition-colors cursor-ew-resize relative z-10" />

        {/* Editor Area */}
        <Panel id="editor" defaultSize={40} minSize={25} maxSize={70}>
          {editor}
        </Panel>

        {/* AI Panel (optional) */}
        {aiPanel && (
          <>
            {/* Resize Handle - Editor to AI Panel */}
            <PanelResizeHandle className="w-1.5 bg-border hover:bg-coral transition-colors cursor-ew-resize relative z-10" />
            <Panel
              id="ai-panel"
              defaultSize={30}
              minSize={20}
              maxSize={45}
              className="bg-card border-l border-border"
            >
              {aiPanel}
            </Panel>
          </>
        )}
      </PanelGroup>

      {/* Status Bar */}
      <IDEStatusBar />

      {/* Search Modal */}
      {showSearch && (
        <SearchModal onClose={() => setShowSearch(false)} />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

interface ToolbarProps {
  onSearch: () => void;
  onSettings: () => void;
}

function IDEToolbar({ onSearch, onSettings }: ToolbarProps) {
  return (
    <div className="h-12 border-b border-border bg-card flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          title="Back to Projects"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Projects</span>
        </Link>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>main</span>
          <span>•</span>
          <span>2 files changed</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors"
          onClick={onSearch}
          title="Search (Ctrl+K)"
        >
          <Search className="w-4 h-4" />
        </button>
        <button
          className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors"
          onClick={onSettings}
          title="Settings"
        >
          <Settings className="w-4 h-4" />
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

function SearchModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search files, symbols, or text..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ESC to close
          </button>
        </div>
        <div className="pt-4 text-sm text-muted-foreground text-center">
          Search functionality coming soon...
        </div>
      </div>
    </div>
  );
}

function SettingsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          Settings functionality coming soon...
        </div>
      </div>
    </div>
  );
}
