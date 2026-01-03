import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getTracks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tracks").collect();
  },
});

export const addTrack = mutation({
  args: {
    title: v.string(),
    artist: v.string(),
    audioUrl: v.string(),
    type: v.union(v.literal("music"), v.literal("podcast")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tracks", args);
  },
});
