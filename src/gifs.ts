// =====================================================================
// 🎯 GIF CONFIG — Using local GIFs for reliability!
//
// These GIFs are stored in the public/gifs folder.
// =====================================================================

// --- Proposal Page (Step 1) ---
// Array of GIFs that cycle as the user clicks "No" (changes every 2 clicks)
// First one is the default, rest show progressively sadder/cuter reactions
export const PROPOSAL_GIFS: string[] = [
  "/gifs/proposal_0.gif", // Default cat — happy/asking
  "/gifs/proposal_1.gif", // After 2 No clicks — confused/sad
  "/gifs/proposal_2.gif", // After 4 No clicks — crying
  "/gifs/proposal_3.gif", // After 6 No clicks — begging
];

// --- YAY Page (Step 2) — panda/bear couple kissing ---
export const YAY_GIF = "/gifs/yay.gif";

// --- Date & Dress Page (Step 3) ---
export const DATE_DRESS_GIF = "/gifs/date_dress.gif";

// --- Activity Page (Step 4) ---
export const ACTIVITY_GIF = "/gifs/activity.gif";

// --- Place & Vehicle Page (Step 5) ---
export const PLACE_VEHICLE_GIF = "/gifs/place_vehicle.gif";

// --- To-Do Page (Step 6) ---
export const TODO_GIF = "/gifs/todo.gif";

// --- Final Summary Page (Step 7) ---
export const CELEBRATION_GIF = "/gifs/celebration.gif";

// --- Fallback emojis (shown when GIF URL is empty or fails to load) ---
export const FALLBACK_EMOJIS: Record<string, string> = {
  proposal: "🐱",
  yay: "🐼💕",
  dateDress: "🥰",
  activity: "🤔💭",
  placeVehicle: "✈️",
  todo: "📝",
  celebration: "🎉💖",
};
