export type SkeletonShape = "Text" | "Avatar" | "Button" | "Block";

export const skeletonBaseClasses = "animate-pulse rounded-md bg-gray-200";

export const skeletonClassesByShape = (
  shape: SkeletonShape = "Block"
): string => {
  if (shape === "Text") {
    return `${skeletonBaseClasses} h-4 w-40`;
  }

  if (shape === "Avatar") {
    return `${skeletonBaseClasses} h-10 w-10 rounded-full`;
  }

  if (shape === "Button") {
    return `${skeletonBaseClasses} h-9 w-24`;
  }

  return `${skeletonBaseClasses} h-28 w-full`;
};
