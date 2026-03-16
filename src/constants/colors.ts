export type CollectionColor =
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "indigo"
  | "teal"
  | "orange"
  | "gray";

interface ColorClasses {
  bg: string;
  text: string;
  ring: string;
  dot: string;
}

export const COLLECTION_COLORS: Record<CollectionColor, ColorClasses> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-200",
    dot: "bg-blue-500",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-200",
    dot: "bg-red-500",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-700",
    ring: "ring-green-200",
    dot: "bg-green-500",
  },
  yellow: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    ring: "ring-yellow-200",
    dot: "bg-yellow-500",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    ring: "ring-purple-200",
    dot: "bg-purple-500",
  },
  pink: {
    bg: "bg-pink-50",
    text: "text-pink-700",
    ring: "ring-pink-200",
    dot: "bg-pink-500",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    ring: "ring-indigo-200",
    dot: "bg-indigo-500",
  },
  teal: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    ring: "ring-teal-200",
    dot: "bg-teal-500",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    ring: "ring-orange-200",
    dot: "bg-orange-500",
  },
  gray: {
    bg: "bg-gray-50",
    text: "text-gray-700",
    ring: "ring-gray-200",
    dot: "bg-gray-500",
  },
};

export function getColorClasses(color: CollectionColor): ColorClasses {
  return COLLECTION_COLORS[color] ?? COLLECTION_COLORS.blue;
}
