export type SkeletonShape = "Text" | "Avatar" | "Button" | "Block";

export const skeletonBaseClassName = "animate-pulse rounded-md bg-gray-200";

export const skeletonClassNameByShape = (
  shape: SkeletonShape = "Block"
): string => {
  if (shape === "Text") {
    return `${skeletonBaseClassName} h-4 w-40`;
  }

  if (shape === "Avatar") {
    return `${skeletonBaseClassName} h-10 w-10 rounded-full`;
  }

  if (shape === "Button") {
    return `${skeletonBaseClassName} h-9 w-24`;
  }

  return `${skeletonBaseClassName} h-28 w-full`;
};
