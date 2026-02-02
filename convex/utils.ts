import { QueryCtx } from "./_generated/server";

/**
 * Get the authenticated user's ID from the Convex auth context.
 * Requires CLERK_ISSUER_URL to be set in Convex environment variables.
 */
export async function getAuthUserId(ctx: QueryCtx): Promise<string | null> {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    console.log("No identity found - auth token may be missing or invalid");
    return null;
  }

  console.log("Auth identity:", { subject: identity.subject, issuer: identity.issuer });

  // The subject is the Clerk user ID
  return identity.subject;
}
