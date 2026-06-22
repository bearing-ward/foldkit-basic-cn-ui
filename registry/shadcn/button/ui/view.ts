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

export const shadcnButtonBaseClasses =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

export const shadcnButtonDefaultSizeClasses = "h-9 px-4 py-2 has-[>svg]:px-3";

export const shadcnButtonExtraSmallSizeClasses =
  "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3";

export const shadcnButtonSmallSizeClasses =
  "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5";

export const shadcnButtonLargeSizeClasses =
  "h-10 rounded-md px-6 has-[>svg]:px-4";

export const shadcnButtonIconSizeClasses = "size-9";

export const shadcnButtonVariantClasses =
  "bg-primary text-primary-foreground hover:bg-primary/90";

export const shadcnDestructiveButtonVariantClasses =
  "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40";

export const shadcnOutlineButtonVariantClasses =
  "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50";

export const shadcnSecondaryButtonVariantClasses =
  "bg-secondary text-secondary-foreground hover:bg-secondary/80";

export const shadcnGhostButtonVariantClasses =
  "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";

export const shadcnLinkButtonVariantClasses =
  "text-primary underline-offset-4 hover:underline";

const shadcnButtonClassesByVariant: Record<ShadcnButtonVariant, string> = {
  default: shadcnButtonVariantClasses,
  destructive: shadcnDestructiveButtonVariantClasses,
  outline: shadcnOutlineButtonVariantClasses,
  secondary: shadcnSecondaryButtonVariantClasses,
  ghost: shadcnGhostButtonVariantClasses,
  link: shadcnLinkButtonVariantClasses,
};

const shadcnButtonClassesBySize: Record<ShadcnButtonSize, string> = {
  default: shadcnButtonDefaultSizeClasses,
  xs: shadcnButtonExtraSmallSizeClasses,
  sm: shadcnButtonSmallSizeClasses,
  lg: shadcnButtonLargeSizeClasses,
  icon: shadcnButtonIconSizeClasses,
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
    shadcnButtonBaseClasses,
    shadcnButtonClassesByVariant[variant],
    shadcnButtonClassesBySize[size],
    className,
  );

export const shadcnButtonClasses = buttonVariants();

export const shadcnDestructiveButtonClasses = buttonVariants({
  variant: "destructive",
});

export const shadcnOutlineButtonClasses = buttonVariants({
  variant: "outline",
});

export const shadcnSecondaryButtonClasses = buttonVariants({
  variant: "secondary",
});

export const shadcnGhostButtonClasses = buttonVariants({ variant: "ghost" });

export const shadcnLinkButtonClasses = buttonVariants({ variant: "link" });

export const shadcnIconButtonClasses = buttonVariants({ size: "icon" });
