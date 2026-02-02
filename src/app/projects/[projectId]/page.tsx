"use client";

import { useParams } from "next/navigation";
import { IDELayout } from "@/components/ide/IDELayout";
import { FileExplorer } from "@/components/file-explorer/FileExplorer";
import { Editor } from "@/components/editor/Editor";
import { AIChatPanel } from "@/components/ai/AIChatPanel";
import { createProjectId } from "@/lib/types";
import { Suspense } from "react";

export default function ProjectPage() {
  const params = useParams();
  const projectIdParam = params.projectId as string;

  if (!projectIdParam) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>No project ID provided</p>
      </div>
    );
  }

  const projectId = createProjectId(projectIdParam);

  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading IDE...</div>}>
      <IDELayout
        sidebar={<FileExplorer projectId={projectId} />}
        editor={<Editor projectId={projectId} />}
        aiPanel={<AIChatPanel projectId={projectId} />}
      />
    </Suspense>
  );
}
