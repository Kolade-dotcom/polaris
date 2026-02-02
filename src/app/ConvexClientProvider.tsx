"use client";

import type { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";

// Create client lazily to avoid errors during SSR if env var is missing
function getConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    console.warn("NEXT_PUBLIC_CONVEX_URL is not set. Convex features will be disabled.");
    return null;
  }
  return new ConvexReactClient(url);
}

const convex = getConvexClient();


export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // If Convex is not configured, render children without the provider
  // This allows the app to work in demo mode without Convex
  if (!convex) {
    return (
      <div data-convex-missing="true">
        {children}
      </div>
    );
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
