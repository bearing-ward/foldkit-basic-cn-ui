import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  chipClassName,
  clampProgress,
  classNames,
  codeLineBaseClassName,
  consoleHeaderClassName,
  controlButtonClassName,
  liveTraceThemeClassName,
  logLineBaseClassName,
  panelClassName,
  progressIndicatorClassName,
  progressTrackClassName,
  statusBadgeBaseClassName,
  stepMarkerClassName,
  subtlePanelClassName,
} from "./view";

export {
  chipClassName,
  classNames,
  consoleHeaderClassName,
  controlButtonClassName,
  liveTraceThemeClassName,
  panelClassName,
  subtlePanelClassName,
};

export type LogLevel = "Info" | "Warning" | "Error";
export type TraceStepState = "Complete" | "Running" | "Pending" | "Failed";
export type TraceStatus = "Completed" | "Running" | "Failed" | "Concurrent";
export type ActivityStatus = "Running" | "Completed" | "Failed";
export type MetricTone = "Default" | "Accent" | "Ok" | "Warning" | "Error";

export type ThemeViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
}>;

export type ControlButtonViewConfig<ParentMessage> = Readonly<{
  label: string;
  active?: boolean;
  onClick?: ParentMessage;
  className?: string;
}>;

export type StatusBadgeViewConfig = Readonly<{
  status: TraceStatus;
  label?: string;
  className?: string;
}>;

export type ProgressTrackViewConfig = Readonly<{
  value: number;
  tone?: MetricTone;
  className?: string;
}>;

export type StepMarkerViewConfig = Readonly<{
  state: TraceStepState;
  label?: string;
  className?: string;
}>;

export type TraceStepViewConfig = Readonly<{
  name: string;
  meta: string;
  duration: string;
  progress: number;
  state: TraceStepState;
}>;

export type LogLineViewConfig = Readonly<{
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
}>;

export type LogConsoleViewConfig = Readonly<{
  title: string;
  status: string;
  lines: readonly LogLineViewConfig[];
}>;

export type TraceCardViewConfig = Readonly<{
  title: string;
  traceId: string;
  elapsed: string;
  status: TraceStatus;
  steps: readonly TraceStepViewConfig[];
  logLines: readonly LogLineViewConfig[];
}>;

export type ActivityRowViewConfig = Readonly<{
  documentName: string;
  duration: string;
  status: ActivityStatus;
}>;

export type ActivityPanelViewConfig = Readonly<{
  rows: readonly ActivityRowViewConfig[];
  eventsPerSecond: string;
}>;

export type MetricViewConfig = Readonly<{
  label: string;
  value: string;
  tone?: MetricTone;
}>;

export type AgentStepCardViewConfig = Readonly<{
  name: string;
  duration: string;
  chips: readonly string[];
  rows: readonly string[];
  state?: TraceStepState;
}>;

export type CodeLineTone = "Plain" | "Keyword" | "Call" | "String" | "Muted";

export type CodeLineViewConfig = Readonly<{
  text: string;
  active?: boolean;
  tone?: CodeLineTone;
  indent?: number;
}>;

export type CodePanelViewConfig = Readonly<{
  path: string;
  lineLabel: string;
  lines: readonly CodeLineViewConfig[];
}>;

export type ExecutionStepViewConfig = Readonly<{
  number: string;
  name: string;
  tag: string;
  value: string;
  progress: number;
  state: TraceStepState;
}>;

export type ExecutionPanelViewConfig = Readonly<{
  documentName: string;
  documentMeta: string;
  badgeLabel: string;
  steps: readonly ExecutionStepViewConfig[];
  embeddings?: readonly string[];
}>;

const statusClassName = (status: TraceStatus): string =>
  classNames(
    statusBadgeBaseClassName,
    status === "Completed" &&
      "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    status === "Running" && "border-primary/25 bg-primary/10 text-primary",
    status === "Concurrent" && "border-primary/25 bg-primary/10 text-primary",
    status === "Failed" &&
      "border-destructive/30 bg-destructive/10 text-destructive-foreground"
  );

const toneClassName = (tone: MetricTone): string =>
  classNames(
    tone === "Default" && "text-card-foreground",
    tone === "Accent" && "text-primary",
    tone === "Ok" && "text-emerald-300",
    tone === "Warning" && "text-amber-300",
    tone === "Error" && "text-destructive-foreground"
  );

const progressToneClassName = (tone: MetricTone): string =>
  classNames(
    tone === "Default" && "bg-muted-foreground/40",
    tone === "Accent" && "bg-primary",
    tone === "Ok" && "bg-emerald-400",
    tone === "Warning" && "bg-amber-300",
    tone === "Error" && "bg-destructive"
  );

const markerClassName = (state: TraceStepState): string =>
  classNames(
    stepMarkerClassName,
    state === "Complete" &&
      "border-emerald-400/30 bg-emerald-400 text-background",
    state === "Running" &&
      "border-primary bg-primary/10 text-primary ring-2 ring-ring/25",
    state === "Pending" && "border-border bg-muted text-muted-foreground",
    state === "Failed" &&
      "border-destructive/40 bg-destructive/10 text-destructive-foreground"
  );

const logLevelClassName = (level: LogLevel): string =>
  classNames(
    logLineBaseClassName,
    level === "Info" && "text-muted-foreground",
    level === "Warning" && "bg-amber-500/10 text-amber-300",
    level === "Error" && "bg-destructive/10 text-destructive-foreground"
  );

const codeToneClassName = (tone: CodeLineTone): string =>
  classNames(
    tone === "Plain" && "text-card-foreground/80",
    tone === "Keyword" && "text-purple-300",
    tone === "Call" && "text-primary",
    tone === "String" && "text-amber-200",
    tone === "Muted" && "text-muted-foreground"
  );

const shortStatusLabel = (status: TraceStatus): string =>
  status === "Concurrent" ? "3x concurrent" : status.toLowerCase();

const markerLabel = (state: TraceStepState): string =>
  state === "Complete"
    ? "✓"
    : state === "Running"
      ? "●"
      : state === "Failed"
        ? "!"
        : "";

export const themeView = <ParentMessage>({
  children,
  className,
}: ThemeViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(
        classNames(liveTraceThemeClassName, "min-h-screen p-6", className)
      ),
    ],
    children
  );
};

export const windowDotsView = <ParentMessage>(): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class("flex items-center gap-[7px]")],
    [
      h.span([h.Class("h-2.5 w-2.5 rounded-full bg-muted-foreground/55")], []),
      h.span([h.Class("h-2.5 w-2.5 rounded-full bg-muted-foreground/55")], []),
      h.span([h.Class("h-2.5 w-2.5 rounded-full bg-muted-foreground/55")], []),
    ]
  );
};

export const controlButtonView = <ParentMessage>({
  label,
  active = false,
  onClick,
  className,
}: ControlButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const clickAttrs = onClick === undefined ? [] : [h.OnClick(onClick)];

  return h.button(
    [
      h.Type("button"),
      h.DataAttribute("active", active ? "true" : "false"),
      ...clickAttrs,
      h.Class(classNames(controlButtonClassName, className)),
    ],
    [label]
  );
};

export const statusBadgeView = <ParentMessage>({
  status,
  label = shortStatusLabel(status),
  className,
}: StatusBadgeViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.DataAttribute("status", status),
      h.Class(classNames(statusClassName(status), className)),
    ],
    [label]
  );
};

export const progressTrackView = <ParentMessage>({
  value,
  tone = "Ok",
  className,
}: ProgressTrackViewConfig): Html => {
  const h = html<ParentMessage>();
  const progress = clampProgress(value);

  return h.div(
    [
      h.Role("progressbar"),
      h.AriaValuemin(0),
      h.AriaValuemax(100),
      h.AriaValuenow(progress),
      h.AriaValuetext(`${progress}%`),
      h.AriaLabel(`${progress}%`),
      h.DataAttribute("progress", String(progress)),
      h.Class(classNames(progressTrackClassName, className)),
    ],
    [
      h.div(
        [
          h.Style({ width: `${progress}%` }),
          h.Class(
            classNames(progressIndicatorClassName, progressToneClassName(tone))
          ),
        ],
        []
      ),
    ]
  );
};

export const stepMarkerView = <ParentMessage>({
  state,
  label = markerLabel(state),
  className,
}: StepMarkerViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.DataAttribute("state", state),
      h.Class(classNames(markerClassName(state), className)),
    ],
    [label]
  );
};

export const traceStepView = <ParentMessage>({
  name,
  meta,
  duration,
  progress,
  state,
}: TraceStepViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("state", state),
      h.Class(
        "grid grid-cols-[18px_minmax(0,1fr)_minmax(8rem,200px)_64px] items-center gap-[14px] border-b border-white/[0.04] py-2 text-[13px] last:border-b-0"
      ),
    ],
    [
      stepMarkerView<ParentMessage>({ state }),
      h.div(
        [h.Class("min-w-0")],
        [
          h.div([h.Class("truncate text-card-foreground")], [name]),
          h.div(
            [h.Class("truncate font-mono text-[11px] text-muted-foreground")],
            [meta]
          ),
        ]
      ),
      progressTrackView<ParentMessage>({
        value: progress,
        tone: state === "Failed" ? "Error" : "Ok",
      }),
      h.span(
        [h.Class("text-right font-mono text-[11px] text-muted-foreground")],
        [duration]
      ),
    ]
  );
};

export const logLineView = <ParentMessage>({
  timestamp,
  level,
  source,
  message,
}: LogLineViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.DataAttribute("level", level), h.Class(logLevelClassName(level))],
    [
      h.span([h.Class("text-muted-foreground/55")], [timestamp]),
      h.span(
        [
          h.Class(
            toneClassName(
              level === "Info"
                ? "Accent"
                : level === "Warning"
                  ? "Warning"
                  : "Error"
            )
          ),
        ],
        [level.toUpperCase()]
      ),
      h.span([h.Class("text-muted-foreground/70")], [source]),
      h.span([h.Class("min-w-0 truncate text-card-foreground/85")], [message]),
    ]
  );
};

export const logConsoleView = <ParentMessage>({
  title,
  status,
  lines,
}: LogConsoleViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class(classNames(panelClassName, "flex h-[220px] flex-col"))],
    [
      h.div(
        [h.Class(consoleHeaderClassName)],
        [
          h.span([h.Class("text-primary")], [title]),
          h.span([h.Class("text-muted-foreground")], [status]),
        ]
      ),
      h.div(
        [h.Class("min-h-0 flex-1 overflow-hidden py-1")],
        lines.map(logLineView)
      ),
    ]
  );
};

export const traceCardView = <ParentMessage>({
  title,
  traceId,
  elapsed,
  status,
  steps,
  logLines,
}: TraceCardViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.article(
    [
      h.Class(
        classNames(
          subtlePanelClassName,
          "flex min-h-[640px] flex-col overflow-hidden"
        )
      ),
    ],
    [
      h.div(
        [
          h.Class(
            "flex items-start justify-between gap-4 border-b border-border px-[18px] py-[14px]"
          ),
        ],
        [
          h.div(
            [h.Class("min-w-0")],
            [
              h.h3(
                [h.Class("truncate text-[14px] font-medium tracking-normal")],
                [title]
              ),
              h.div(
                [
                  h.Class(
                    "truncate font-mono text-[10.5px] text-muted-foreground/70"
                  ),
                ],
                [traceId]
              ),
            ]
          ),
          h.div(
            [h.Class("flex shrink-0 items-center gap-2")],
            [
              h.span(
                [h.Class("font-mono text-[11px] text-muted-foreground")],
                [elapsed]
              ),
              statusBadgeView<ParentMessage>({ status }),
            ]
          ),
        ]
      ),
      h.div([h.Class("px-[18px] py-2")], steps.map(traceStepView)),
      h.div(
        [h.Class("mt-auto px-[18px] pb-4 pt-1")],
        [
          logConsoleView<ParentMessage>({
            title: "Effect.log -> SpanEvent stream",
            status: "closed",
            lines: logLines,
          }),
        ]
      ),
    ]
  );
};

export const activityRowView = <ParentMessage>({
  documentName,
  duration,
  status,
}: ActivityRowViewConfig): Html => {
  const h = html<ParentMessage>();
  const tone =
    status === "Running" ? "Accent" : status === "Failed" ? "Error" : "Ok";

  return h.div(
    [
      h.DataAttribute("status", status),
      h.Class(
        "grid grid-cols-[10px_minmax(0,1fr)_auto] items-center gap-[10px] border-l-2 border-primary px-3 py-[7px] text-[12px]"
      ),
    ],
    [
      h.div(
        [
          h.Class(
            classNames("h-1.5 w-1.5 rounded-full", progressToneClassName(tone))
          ),
        ],
        []
      ),
      h.div(
        [h.Class("min-w-0")],
        [
          h.div(
            [h.Class("truncate font-mono text-xs text-card-foreground")],
            [documentName]
          ),
          h.div([h.Class("sr-only")], [status]),
        ]
      ),
      h.span([h.Class("font-mono text-xs text-muted-foreground")], [duration]),
    ]
  );
};

export const activityPanelView = <ParentMessage>({
  rows,
  eventsPerSecond,
}: ActivityPanelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.aside(
    [h.Class(panelClassName)],
    [
      h.div(
        [h.Class(consoleHeaderClassName)],
        [
          h.span([h.Class("text-muted-foreground")], ["active · traces"]),
          h.span(
            [h.Class("inline-flex items-center gap-1.5 text-primary")],
            ["● 0 live"]
          ),
        ]
      ),
      h.div(
        [h.Class("border-b border-border py-1.5")],
        rows.map(activityRowView)
      ),
      h.div(
        [h.Class("p-3")],
        [
          h.div(
            [
              h.Class(
                "mb-2 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.6px]"
              ),
            ],
            [
              h.span([h.Class("text-muted-foreground")], ["events/sec"]),
              h.span([h.Class("text-primary")], [eventsPerSecond]),
            ]
          ),
          h.div([h.Class("h-0.5 rounded-full bg-primary")], []),
        ]
      ),
    ]
  );
};

export const metricView = <ParentMessage>({
  label,
  value,
  tone = "Default",
}: MetricViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class("border-r border-border px-3 py-3 last:border-r-0")],
    [
      h.div(
        [
          h.Class(
            "font-mono text-[10.5px] uppercase tracking-[0.6px] text-muted-foreground"
          ),
        ],
        [label]
      ),
      h.div(
        [h.Class(classNames("mt-2 font-mono text-sm", toneClassName(tone)))],
        [value]
      ),
    ]
  );
};

export const agentStepCardView = <ParentMessage>({
  name,
  duration,
  chips,
  rows,
  state = "Complete",
}: AgentStepCardViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("state", state),
      h.Class("rounded-[6px] border border-border bg-muted p-[10px_12px]"),
    ],
    [
      h.div(
        [h.Class("mb-1.5 flex items-center justify-between gap-3")],
        [
          h.div(
            [h.Class("flex min-w-0 items-center gap-2")],
            [
              stepMarkerView<ParentMessage>({
                state,
                className: "h-[7px] w-[7px] border-0 p-0 text-[0px]",
              }),
              h.span([h.Class("truncate text-sm font-medium")], [name]),
            ]
          ),
          h.span(
            [h.Class("font-mono text-xs text-muted-foreground")],
            [duration]
          ),
        ]
      ),
      h.div(
        [h.Class("mb-3 flex flex-wrap gap-1.5")],
        chips.map((chip) => h.span([h.Class(chipClassName)], [chip]))
      ),
      h.div(
        [h.Class("space-y-1")],
        rows.map((row) =>
          h.div(
            [h.Class("truncate font-mono text-[11px] text-muted-foreground")],
            [row]
          )
        )
      ),
    ]
  );
};

export const codeLineView = <ParentMessage>({
  text,
  active = false,
  tone = "Plain",
  indent = 0,
}: CodeLineViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("active", active ? "true" : "false"),
      h.Class(classNames(codeLineBaseClassName, codeToneClassName(tone))),
    ],
    [`${" ".repeat(indent)}${text}`]
  );
};

export const codePanelView = <ParentMessage>({
  path,
  lineLabel,
  lines,
}: CodePanelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(
        "min-h-[520px] overflow-hidden border border-border bg-card text-card-foreground"
      ),
    ],
    [
      h.div(
        [
          h.Class(
            "flex h-[38px] items-center justify-between border-b border-border bg-muted px-[14px] font-mono text-[11.5px]"
          ),
        ],
        [
          h.span([h.Class("text-muted-foreground")], [path]),
          h.span(
            [h.Class("inline-flex items-center gap-2 text-primary")],
            ["▸ ", lineLabel]
          ),
        ]
      ),
      h.div(
        [
          h.Class(
            "h-[482px] overflow-hidden py-[26px] font-mono text-[12.5px] leading-[1.45]"
          ),
        ],
        lines.map(codeLineView)
      ),
    ]
  );
};

export const executionStepView = <ParentMessage>({
  number,
  name,
  tag,
  value,
  progress,
  state,
}: ExecutionStepViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("state", state),
      h.Class(
        "grid gap-2 px-[18px] py-[7px] opacity-60 data-[state=Complete]:opacity-100 data-[state=Running]:opacity-100"
      ),
    ],
    [
      h.div(
        [
          h.Class(
            "grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3"
          ),
        ],
        [
          stepMarkerView<ParentMessage>({
            state,
            label: state === "Running" ? "●" : number,
          }),
          h.div(
            [h.Class("flex min-w-0 items-center gap-2")],
            [
              h.span(
                [h.Class("text-sm font-medium text-card-foreground")],
                [name]
              ),
              h.code([h.Class(chipClassName)], [tag]),
            ]
          ),
          h.span(
            [
              h.Class(
                classNames(
                  "font-mono text-xs",
                  toneClassName(
                    state === "Failed"
                      ? "Error"
                      : state === "Running"
                        ? "Accent"
                        : "Ok"
                  )
                )
              ),
            ],
            [value]
          ),
        ]
      ),
      h.div(
        [h.Class("ml-8")],
        [
          progressTrackView<ParentMessage>({
            value: progress,
            tone:
              state === "Failed"
                ? "Error"
                : state === "Running"
                  ? "Accent"
                  : "Ok",
          }),
        ]
      ),
    ]
  );
};

export const executionPanelView = <ParentMessage>({
  documentName,
  documentMeta,
  badgeLabel,
  steps,
  embeddings = [],
}: ExecutionPanelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(
        "min-h-[520px] border border-border bg-background text-card-foreground"
      ),
    ],
    [
      h.div(
        [
          h.Class(
            "flex h-[38px] items-center gap-1 border-b border-border bg-muted px-[14px]"
          ),
        ],
        [
          controlButtonView<ParentMessage>({
            label: "Ⅱ",
            className: "h-6 w-7 justify-center px-0",
          }),
          controlButtonView<ParentMessage>({
            label: "↠",
            className: "h-6 w-7 justify-center px-0",
          }),
          controlButtonView<ParentMessage>({
            label: "↻",
            className: "h-6 w-7 justify-center px-0",
          }),
          h.div(
            [h.Class("ml-3 flex items-center")],
            [
              controlButtonView<ParentMessage>({
                label: "0.5x",
                className: "h-[22px] rounded-r-none border-r-0 px-2",
              }),
              controlButtonView<ParentMessage>({
                label: "1x",
                active: true,
                className: "h-[22px] rounded-none px-2",
              }),
              controlButtonView<ParentMessage>({
                label: "2x",
                className: "h-[22px] rounded-l-none px-2",
              }),
            ]
          ),
        ]
      ),
      h.div(
        [
          h.Class(
            "grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-5 py-5"
          ),
        ],
        [
          h.div(
            [
              h.Class(
                "flex h-[42px] w-[42px] items-center justify-center rounded-[6px] border border-primary/30 bg-primary/10 font-mono text-xs font-semibold text-primary"
              ),
            ],
            ["PDF"]
          ),
          h.div(
            [h.Class("min-w-0")],
            [
              h.div(
                [h.Class("truncate text-base font-medium")],
                [documentName]
              ),
              h.div(
                [h.Class("mt-1 font-mono text-xs text-muted-foreground")],
                [documentMeta]
              ),
            ]
          ),
          statusBadgeView<ParentMessage>({
            status: "Completed",
            label: badgeLabel,
          }),
        ]
      ),
      h.div([], steps.map(executionStepView)),
      h.div(
        [h.Class("border-t border-border px-5 py-4")],
        [
          h.div(
            [
              h.Class(
                "mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-wider"
              ),
            ],
            [
              h.span([h.Class("text-muted-foreground")], ["recent embeddings"]),
              h.span(
                [h.Class("text-primary")],
                [
                  embeddings.length === 0
                    ? "-"
                    : `${embeddings.length} of ${embeddings.length}`,
                ]
              ),
            ]
          ),
          h.div(
            [h.Class("space-y-2")],
            embeddings.length === 0
              ? [
                  h.div(
                    [h.Class("py-6 text-center text-sm text-muted-foreground")],
                    ["awaiting embed step..."]
                  ),
                ]
              : embeddings.map((embedding, index) =>
                  h.div(
                    [
                      h.Class(
                        "grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-4 rounded-[4px] border border-border bg-muted px-3 py-3"
                      ),
                    ],
                    [
                      h.span(
                        [h.Class("font-mono text-xs text-primary")],
                        [`0${index + 1}/${embeddings.length}`]
                      ),
                      h.span(
                        [
                          h.Class(
                            "truncate text-sm italic text-card-foreground/85"
                          ),
                        ],
                        [embedding]
                      ),
                    ]
                  )
                )
          ),
        ]
      ),
    ]
  );
};
