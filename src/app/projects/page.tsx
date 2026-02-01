"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreVertical,
  Folder,
  Clock,
  Trash2,
  Edit,
  Code2,
  AlertTriangle,
} from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";

// Demo projects for when Convex is not configured
const demoProjects = [
  {
    _id: "demo-1",
    _creationTime: Date.now(),
    name: "Demo Project",
    description: "This is a demo project. Convex is not configured yet.",
    language: "typescript",
    updatedAt: Date.now(),
  },
];

export default function ProjectsPage() {
  const { user } = useUser();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    language: "typescript",
  });

  // Try to use Convex, fallback to demo data if not configured
  let projects;
  try {
    projects = useQuery(api.projects.list);
  } catch (e) {
    // Convex not configured, use demo data
    projects = demoProjects;
  }

  const convexConfigured = process.env.NEXT_PUBLIC_CONVEX_URL &&
    !process.env.NEXT_PUBLIC_CONVEX_URL.includes("127.0.0.1");

  const handleCreateProject = async () => {
    // TODO: Implement project creation mutation
    setIsCreateOpen(false);
    setNewProject({ name: "", description: "", language: "typescript" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-coral" />
              <span className="font-bold text-lg">Polaris</span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Projects</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.emailAddresses[0]?.emailAddress}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {!convexConfigured && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <div className="text-sm text-amber-800">
              <strong>Demo Mode:</strong> Convex is not configured.
              Run <code className="bg-amber-100 px-1 rounded">npx convex dev</code> to enable full functionality.
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and collaborate on your coding projects
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-coral hover:bg-coral/90 gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Start a new coding project with AI assistance
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    placeholder="My Awesome Project"
                    value={newProject.name}
                    onChange={(e) =>
                      setNewProject({ ...newProject, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="A brief description of your project..."
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Primary Language</Label>
                  <select
                    id="language"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newProject.language}
                    onChange={(e) =>
                      setNewProject({ ...newProject, language: e.target.value })
                    }
                  >
                    <option value="typescript">TypeScript</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="rust">Rust</option>
                    <option value="go">Go</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-coral hover:bg-coral/90"
                  onClick={handleCreateProject}
                  disabled={!newProject.name.trim()}
                >
                  Create Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        {projects === undefined ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No projects yet</h3>
            <p className="text-muted-foreground mt-1 mb-6">
              Create your first project to start coding with AI assistance
            </p>
            <Button
              className="bg-coral hover:bg-coral/90 gap-2"
              onClick={() => setIsCreateOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Create Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function ProjectCard({
  project,
}: {
  project: {
    _id: string;
    _creationTime: number;
    name: string;
    description?: string;
    language?: string;
    updatedAt: number;
  };
}) {
  return (
    <Card className="group hover:shadow-lg transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral/10 text-coral">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">
                <Link
                  href={`/projects/${project._id}`}
                  className="hover:text-coral transition-colors"
                >
                  {project.name}
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(project.updatedAt)}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description || "No description provided"}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium">
            {project.language || "typescript"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
