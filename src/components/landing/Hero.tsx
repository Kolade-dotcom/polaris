"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Code2, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-coral/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-coral/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container flex flex-col items-center justify-center gap-4 py-20 md:py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-coral/5 px-4 py-1.5 text-sm font-medium text-coral">
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered Cloud IDE</span>
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Code smarter with{" "}
          <span className="text-coral">AI assistance</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          A browser-based IDE that understands your code. Get intelligent
          suggestions, real-time collaboration, and seamless deployment—all in
          one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button size="lg" className="bg-coral hover:bg-coral/90 gap-2" asChild>
            <Link href="/sign-up">
              Start Coding Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#demo">View Demo</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-coral mb-1">
              <Zap className="h-5 w-5" />
              <span className="text-2xl font-bold">10x</span>
            </div>
            <span className="text-sm text-muted-foreground">Faster Coding</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-coral mb-1">
              <Code2 className="h-5 w-5" />
              <span className="text-2xl font-bold">50+</span>
            </div>
            <span className="text-sm text-muted-foreground">Languages</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-coral mb-1">
              <Sparkles className="h-5 w-5" />
              <span className="text-2xl font-bold">AI</span>
            </div>
            <span className="text-sm text-muted-foreground">Powered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
