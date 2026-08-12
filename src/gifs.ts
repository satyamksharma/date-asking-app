// =====================================================================
// 🎯 GIF CONFIG — Edit this file to add your GIF links!
//
// Find sticker GIFs at https://giphy.com/stickers or https://tenor.com
// Right-click a GIF → Copy Image Address → Paste the URL below
// =====================================================================

// --- Proposal Page (Step 1) ---
// Array of GIFs that cycle as the user clicks "No" (changes every 2 clicks)
// First one is the default, rest show progressively sadder/cuter reactions
export const PROPOSAL_GIFS: string[] = [
  // "", // Default cat — happy/asking
  // "", // After 2 No clicks — confused/sad
  // "", // After 4 No clicks — crying
  // "", // After 6 No clicks — begging
];

// --- YAY Page (Step 2) — panda/bear couple kissing ---
export const YAY_GIF = "";

// --- Date & Dress Page (Step 3) ---
export const DATE_DRESS_GIF = "";

// --- Activity Page (Step 4) ---
export const ACTIVITY_GIF = "";

// --- Place & Vehicle Page (Step 5) ---
export const PLACE_VEHICLE_GIF = "";

// --- To-Do Page (Step 6) ---
export const TODO_GIF = "";

// --- Final Summary Page (Step 7) ---
export const CELEBRATION_GIF = "";

// --- Fallback emojis (shown when GIF URL is empty) ---
export const FALLBACK_EMOJIS: Record<string, string> = {
  proposal: "🐱",
  yay: "🐼💕",
  dateDress: "🥰",
  activity: "🤔💭",
  placeVehicle: "✈️",
  todo: "📝",
  celebration: "🎉💖",
};
