export const liveTraceThemeClassName =
  "dark bg-background text-foreground [--background:217_48%_9%] [--foreground:214_32%_91%] [--card:215_45%_14%] [--card-foreground:214_32%_91%] [--muted:215_42%_19%] [--muted-foreground:216_18%_62%] [--primary:191_100%_50%] [--primary-foreground:216_50%_8%] [--destructive:0_74%_58%] [--destructive-foreground:0_86%_92%] [--border:213_42%_24%] [--ring:191_100%_50%]";

export const panelClassName =
  "overflow-hidden rounded-[10px] border border-border bg-card text-card-foreground";

export const subtlePanelClassName =
  "rounded-[6px] border border-border bg-muted/55 text-card-foreground";

export const consoleHeaderClassName =
  "flex items-center justify-between border-b border-border bg-muted px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.6px]";

export const controlButtonClassName =
  "inline-flex h-7 items-center gap-2 rounded-[4px] border border-border bg-muted px-3 font-mono text-[11px] text-muted-foreground shadow-sm transition-colors hover:border-primary/45 hover:text-primary data-[active=true]:border-primary/35 data-[active=true]:bg-primary/10 data-[active=true]:text-primary";

export const statusBadgeBaseClassName =
  "rounded-[3px] border px-2 py-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.8px]";

export const progressTrackClassName =
  "h-[5px] overflow-hidden rounded-full border border-border bg-muted";

export const progressIndicatorClassName =
  "h-full rounded-full transition-[width] duration-300";

export const stepMarkerClassName =
  "inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border font-mono text-[11px] font-semibold";

export const logLineBaseClassName =
  "grid grid-cols-[6.2rem_3.2rem_4.8rem_minmax(0,1fr)] gap-2 px-3 py-0.5 font-mono text-[11.5px] leading-[1.55]";

export const codeLineBaseClassName =
  "whitespace-pre px-4 leading-[1.45] data-[active=true]:bg-primary/10 data-[active=true]:text-primary";

export const chipClassName =
  "rounded-[3px] border border-border bg-card px-[6px] py-1 font-mono text-[11px] text-muted-foreground";

export const classNames = (
  ...values: readonly (string | false | null | undefined)[]
): string => values.filter(Boolean).join(" ");

export const clampProgress = (value: number): number =>
  Math.max(0, Math.min(100, Math.round(value)));
