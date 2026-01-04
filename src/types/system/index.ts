import { Circle, CircleCheck, CircleX } from "lucide-react";


/**
 * =================================================================================
 * Universal Badge Color Palette
 * =================================================================================
 * A predefined, numbered palette of color styles. This is the single source of
 * truth for all badge appearances.
 */
export const badgeColorPalette = new Map<number, string>([
  [0, "text-red-700 border-red-200 bg-red-50 dark:text-red-400 dark:border-red-500/30 dark:bg-red-500/10"], // Red
  [1, "text-green-700 border-green-200 bg-green-50 dark:text-green-400 dark:border-green-500/30 dark:bg-green-500/10"], // Green
  [2, "text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-400 dark:border-blue-500/30 dark:bg-blue-500/10"], // Blue
  [3, "text-gray-600 border-gray-200 bg-gray-50 dark:text-gray-400 dark:border-gray-500/30 dark:bg-gray-500/10"], // Gray
  [
    4,
    "text-yellow-700 border-yellow-200 bg-yellow-50 dark:text-yellow-400 dark:border-yellow-500/30 dark:bg-yellow-500/10",
  ], // Yellow
  [
    5,
    "text-purple-700 border-purple-200 bg-purple-50 dark:text-purple-400 dark:border-purple-500/30 dark:bg-purple-500/10",
  ], // Purple
  [6, "text-pink-700 border-pink-200 bg-pink-50 dark:text-pink-400 dark:border-pink-500/30 dark:bg-pink-500/10"], // Pink
  [7, "text-cyan-700 border-cyan-200 bg-cyan-50 dark:text-cyan-400 dark:border-cyan-500/30 dark:bg-cyan-500/10"], // Cyan
]);

/**
 * =================================================================================
 * Semantic String to Color ID Mapping
 * =================================================================================
 * Maps business logic strings (like "PROJECT", "MENU") to a specific color ID
 * from the `badgeColorPalette`.
 */
export const semanticColorKeyMap = new Map<string, number>([
  ["PROJECT", 2], // Blue
  ["GLOBAL", 5], // Purple
  ["MENU", 1], // Green
  ["BUTTON", 4], // Yellow
  ["API", 6], // Pink
]);

/**
 * =================================================================================
 * Status Field Configuration
 * =================================================================================
 * Describes the 'status' field, mapping semantic values to color IDs.
 */
export const statusValue = ["Default", "Active", "Frozen"];
export const statusDescriptors = [
  {
    label: "Active",
    value: "1",
    icon: CircleCheck,
    colorKey: 1, // References Green in the palette
  },
  {
    label: "Frozen",
    value: "2",
    icon: Circle,
    colorKey: 2, // References Blue in the palette
  },
  {
    label: "Default",
    value: "0",
    icon: CircleX,
    colorKey: 0, // References Red in the palette
  },
];
