"use client";

import { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { useTheme } from "next-themes";
import { X, Circle } from "lucide-react";
import type { ProjectId } from "@/lib/types";
import { polarisLight, polarisDark } from "./polaris-theme";

interface EditorProps {
  projectId: ProjectId;
}

interface Tab {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isModified: boolean;
}

// Language extension mapping
const getLanguageExtension = (language: string) => {
  switch (language?.toLowerCase()) {
    case "javascript":
    case "js":
      return javascript();
    case "typescript":
    case "ts":
      return javascript({ typescript: true });
    case "jsx":
    case "tsx":
      return javascript({ jsx: true, typescript: true });
    case "css":
      return css();
    case "html":
      return html();
    case "json":
      return json();
    case "markdown":
    case "md":
      return markdown();
    default:
      return javascript();
  }
};

export function Editor({ projectId }: EditorProps) {
  const { resolvedTheme } = useTheme();
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "1",
      name: "page.tsx",
      path: "/src/app/page.tsx",
      content: `export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Hello, Polaris!</h1>
    </div>
  );
}`,
      language: "typescript",
      isModified: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>("1");

  const activeTab = tabs.find((t) => t.id === activeTabId);

  // Use Polaris theme by default (matches site UI), fallback to appropriate theme
  const editorTheme = resolvedTheme === "dark" ? polarisDark : polarisLight;

  const handleContentChange = useCallback(
    (value: string) => {
      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTabId
            ? { ...tab, content: value, isModified: true }
            : tab
        )
      );
    },
    [activeTabId]
  );

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId && newTabs.length > 0) {
      setActiveTabId(newTabs[0].id);
    }
  };

  // Get language extension
  const languageExtension = activeTab
    ? getLanguageExtension(activeTab.language)
    : javascript();

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Tab Bar */}
      <div className="flex items-center border-b border-border bg-card overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`group flex items-center gap-2 px-4 py-2 text-sm border-r border-border min-w-fit transition-colors ${
              activeTabId === tab.id
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <span className="truncate max-w-[150px]">{tab.name}</span>
            {tab.isModified && (
              <Circle className="h-2 w-2 fill-current text-coral" />
            )}
            <span
              onClick={(e) => closeTab(tab.id, e)}
              className="opacity-0 group-hover:opacity-100 hover:bg-secondary rounded p-0.5 transition-opacity"
            >
              <X className="h-3 w-3" />
            </span>
          </button>
        ))}
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden cm-wrapper">
        {activeTab ? (
          <CodeMirror
            value={activeTab.content}
            height="100%"
            theme={editorTheme}
            extensions={[languageExtension]}
            onChange={handleContentChange}
            className="h-full text-sm"
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              highlightActiveLine: true,
              foldGutter: true,
              dropCursor: true,
              allowMultipleSelections: true,
              indentOnInput: true,
              bracketMatching: true,
              closeBrackets: true,
              autocompletion: true,
              highlightSelectionMatches: true,
              searchKeymap: true,
              foldKeymap: true,
              completionKeymap: true,
              lintKeymap: true,
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium">No file open</p>
              <p className="text-sm">Select a file from the explorer to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
