"use client";

import { useParams } from "next/navigation";
import { IDELayout } from "@/components/ide/IDELayout";
import { FileExplorer } from "@/components/file-explorer/FileExplorer";
import { Editor } from "@/components/editor/Editor";
import { AIChatPanel } from "@/components/ai/AIChatPanel";
import { createProjectId } from "@/lib/types";

export default function ProjectPage() {
  const params = useParams();
  const projectId = createProjectId(params.projectId as string);

  return (
    <IDELayout
      sidebar={<FileExplorer projectId={projectId} />}
      editor={<Editor projectId={projectId} />}
      aiPanel={<AIChatPanel projectId={projectId} />}
    />
  );
}
