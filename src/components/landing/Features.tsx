"use client";

import {
  Brain,
  Cloud,
  Code2,
  GitBranch,
  Layers,
  MessageSquare,
  Zap,
} from "lucide-react";

const features = [
  {
    name: "AI Code Assistant",
    description:
      "Get intelligent code suggestions, completions, and explanations powered by Gemini 2.0 Flash.",
    icon: Brain,
  },
  {
    name: "Real-time Collaboration",
    description:
      "Work together with your team in real-time with live cursors and instant synchronization.",
    icon: Cloud,
  },
  {
    name: "Smart Editor",
    description:
      "CodeMirror 6 powered editor with syntax highlighting, linting, and advanced editing features.",
    icon: Code2,
  },
  {
    name: "Git Integration",
    description:
      "Built-in Git support with visual diff, branch management, and seamless GitHub integration.",
    icon: GitBranch,
  },
  {
    name: "Project Templates",
    description:
      "Start quickly with pre-configured templates for React, Next.js, Node.js, and more.",
    icon: Layers,
  },
  {
    name: "AI Chat",
    description:
      "Have natural conversations with AI about your code, get explanations, and debug issues.",
    icon: MessageSquare,
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to{" "}
            <span className="text-coral">build faster</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete development environment with AI superpowers. Focus on
            writing code, let Polaris handle the rest.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral/10 text-coral">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">
                {feature.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
