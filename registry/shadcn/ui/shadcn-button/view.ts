import { cn } from "@/src/lib/utils";

export type ShadcnButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ShadcnButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg";

export type ButtonVariantConfig = Readonly<{
  variant?: ShadcnButtonVariant | undefined;
  size?: ShadcnButtonSize | undefined;
  className?: string | undefined;
}>;

export const shadcnButtonBaseClassName =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

export const shadcnButtonDefaultSizeClassName = "h-9 px-4 py-2 has-[>svg]:px-3";

export const shadcnButtonExtraSmallSizeClassName =
  "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3";

export const shadcnButtonSmallSizeClassName =
  "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5";

export const shadcnButtonLargeSizeClassName =
  "h-10 rounded-md px-6 has-[>svg]:px-4";

export const shadcnButtonIconSizeClassName = "size-9";

export const shadcnButtonVariantClassName =
  "bg-primary text-primary-foreground hover:bg-primary/90";

export const shadcnDestructiveButtonVariantClassName =
  "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40";

export const shadcnOutlineButtonVariantClassName =
  "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50";

export const shadcnSecondaryButtonVariantClassName =
  "bg-secondary text-secondary-foreground hover:bg-secondary/80";

export const shadcnGhostButtonVariantClassName =
  "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";

export const shadcnLinkButtonVariantClassName =
  "text-primary underline-offset-4 hover:underline";

const shadcnButtonVariantClassNames: Record<ShadcnButtonVariant, string> = {
  default: shadcnButtonVariantClassName,
  destructive: shadcnDestructiveButtonVariantClassName,
  outline: shadcnOutlineButtonVariantClassName,
  secondary: shadcnSecondaryButtonVariantClassName,
  ghost: shadcnGhostButtonVariantClassName,
  link: shadcnLinkButtonVariantClassName,
};

const shadcnButtonSizeClassNames: Record<ShadcnButtonSize, string> = {
  default: shadcnButtonDefaultSizeClassName,
  xs: shadcnButtonExtraSmallSizeClassName,
  sm: shadcnButtonSmallSizeClassName,
  lg: shadcnButtonLargeSizeClassName,
  icon: shadcnButtonIconSizeClassName,
  "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
  "icon-sm": "size-8",
  "icon-lg": "size-10",
};

export const buttonVariants = ({
  variant = "default",
  size = "default",
  className,
}: ButtonVariantConfig = {}): string =>
  cn(
    shadcnButtonBaseClassName,
    shadcnButtonVariantClassNames[variant],
    shadcnButtonSizeClassNames[size],
    className,
  );

export const shadcnButtonClassName = buttonVariants();

export const shadcnDestructiveButtonClassName = buttonVariants({
  variant: "destructive",
});

export const shadcnOutlineButtonClassName = buttonVariants({
  variant: "outline",
});

export const shadcnSecondaryButtonClassName = buttonVariants({
  variant: "secondary",
});

export const shadcnGhostButtonClassName = buttonVariants({ variant: "ghost" });

export const shadcnLinkButtonClassName = buttonVariants({ variant: "link" });

export const shadcnIconButtonClassName = buttonVariants({ size: "icon" });
