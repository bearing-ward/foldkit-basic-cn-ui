import { clsx } from "clsx";
import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

// MODEL

const Surface = S.Union([
  S.Literal("full-page"),
  S.Literal("stage-grid"),
  S.Literal("literate"),
  S.Literal("how-step"),
  S.Literal("agent-demo"),
  S.Literal("quickstart"),
  S.Literal("stream"),
  S.Literal("logs"),
  S.Literal("activity"),
  S.Literal("code"),
  S.Literal("transports"),
]);
type Surface = typeof Surface.Type;

const Mode = S.Union([
  S.Literal("completed"),
  S.Literal("running"),
  S.Literal("failing"),
  S.Literal("concurrent"),
]);
type Mode = typeof Mode.Type;

const Transport = S.Union([
  S.Literal("sse"),
  S.Literal("websocket"),
  S.Literal("durable-streams"),
]);
type Transport = typeof Transport.Type;

const AgentDemoTab = S.Union([
  S.Literal("rag-agent"),
  S.Literal("agent-tools"),
  S.Literal("doc-pipeline"),
]);
type AgentDemoTab = typeof AgentDemoTab.Type;

export const Model = S.Struct({
  surface: Surface,
  mode: Mode,
  transport: Transport,
  agentDemoTab: AgentDemoTab,
});
export type Model = typeof Model.Type;

// MESSAGE

export const SelectedMode = m("SelectedMode", { mode: Mode });
export const SelectedTransport = m("SelectedTransport", {
  transport: Transport,
});
export const SelectedAgentDemoTab = m("SelectedAgentDemoTab", {
  tab: AgentDemoTab,
});

export const Message = S.Union([
  SelectedMode,
  SelectedTransport,
  SelectedAgentDemoTab,
]);
export type Message = typeof Message.Type;

// INIT

type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

const withUpdateReturn = M.withReturnType<UpdateReturn>();

const makeInit =
  (surface: Surface, mode: Mode = "completed", transport: Transport = "sse") =>
  (): UpdateReturn => [
    { agentDemoTab: "rag-agent", mode, surface, transport },
    [],
  ];

export const init = makeInit("full-page");
export const initStageGrid = makeInit("stage-grid");
export const initLiterate = makeInit("literate");
export const initHowStep = makeInit("how-step");
export const initAgentDemo = makeInit("agent-demo");
export const initQuickstart = makeInit("quickstart");
export const initStream = makeInit("stream", "running");
export const initLogs = makeInit("logs");
export const initActivity = makeInit("activity");
export const initCode = makeInit("code");
export const initTransports = makeInit("transports");

// UPDATE

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    withUpdateReturn,
    M.tagsExhaustive({
      SelectedMode: ({ mode }) => [evo(model, { mode: () => mode }), []],
      SelectedTransport: ({ transport }) => [
        evo(model, { transport: () => transport }),
        [],
      ],
      SelectedAgentDemoTab: ({ tab }) => [
        evo(model, { agentDemoTab: () => tab }),
        [],
      ],
    })
  );

// VIEW

type StepState = "ok" | "running" | "failed";

type TraceStep = Readonly<{
  name: string;
  meta: string;
  duration: string;
  progress: string;
  state: StepState;
}>;

type Trace = Readonly<{
  title: string;
  id: string;
  elapsed: string;
  status: Mode;
  steps: readonly TraceStep[];
}>;

type LogLine = Readonly<{
  timestamp: string;
  level: "info" | "warn" | "error";
  source: string;
  message: string;
}>;

type Point = Readonly<{
  cx: string;
  cy: string;
}>;

type ModeOption = Readonly<{
  mode: Mode;
  label: string;
}>;

type ActivityItem = Readonly<{
  name: string;
  source: string;
  meta: string;
}>;

type Annotation = Readonly<{
  number: string;
  body: string;
}>;

type TextCard = Readonly<{
  title: string;
  body: string;
}>;

type TransportCard = Readonly<{
  title: string;
  path: string;
  body: string;
}>;

type TransportOption = Readonly<{
  value: Transport;
  label: string;
  language: string;
  filename: string;
  lines: readonly string[];
}>;

type SourceLine = Readonly<{
  indent: string;
  text: string;
  tone?: "keyword" | "call" | "string" | "muted" | "plain";
  active?: boolean;
}>;

type ExecutionStep = Readonly<{
  label: string;
  tag: string;
  value: string;
  progress: string;
}>;

type EmbeddingRow = Readonly<{
  index: string;
  text: string;
}>;

type QuickstartStep = Readonly<{
  number: string;
  name: string;
  tag: string;
  value: string;
  progress: string;
  state: "active" | "pending";
}>;

type AgentMetric = Readonly<{
  label: string;
  value: string;
  running?: boolean;
}>;

type AgentStep = Readonly<{
  name: string;
  status: string;
  duration: string;
  chips: readonly string[];
  rows?: readonly Readonly<{ score: string; text: string }>[];
}>;

type AgentLogLine = Readonly<{
  timestamp: string;
  level: "info" | "warn" | "error";
  source: string;
  message: string;
}>;

type AgentDemo = Readonly<{
  tab: AgentDemoTab;
  label: string;
  pattern: string;
  query: string;
  counter: string;
  metrics: readonly AgentMetric[];
  steps: readonly AgentStep[];
  answerStatus: string;
  answer: string;
  logStatus: string;
  logs: readonly AgentLogLine[];
}>;

const shellClasses =
  "dark min-h-screen bg-background text-foreground [--background:220_12%_5%] [--foreground:220_7%_91%] [--card:216_13%_8%] [--card-foreground:220_16%_96%] [--muted:220_12%_10%] [--muted-foreground:220_5%_57%] [--primary:190_100%_50%] [--primary-foreground:220_12%_5%] [--destructive:0_100%_71%] [--destructive-foreground:0_100%_71%] [--border:216_13%_15%] [--ring:190_100%_50%] [--radius:6px] [--color-background:hsl(220_12%_5%)] [--color-foreground:hsl(220_7%_91%)] [--color-card:hsl(216_13%_8%)] [--color-card-foreground:hsl(220_16%_96%)] [--color-muted:hsl(220_12%_10%)] [--color-muted-foreground:hsl(220_5%_57%)] [--color-primary:hsl(190_100%_50%)] [--color-primary-foreground:hsl(220_12%_5%)] [--color-destructive:hsl(0_100%_71%)] [--color-destructive-foreground:hsl(0_100%_71%)] [--color-border:hsl(216_13%_15%)] [--color-ring:hsl(190_100%_50%)]";
const containerClasses = "mx-auto w-full max-w-6xl px-6";
const panelClasses =
  "rounded-[10px] border border-border bg-card text-card-foreground";
const subtlePanelClasses =
  "rounded-[6px] border border-border bg-muted/35 text-card-foreground";
const pillClasses =
  "inline-flex h-7 items-center gap-2 rounded-[4px] border border-border bg-muted px-3 font-mono text-[11px] text-muted-foreground";
const controlButtonClasses =
  "inline-flex h-[27px] items-center justify-center rounded-[4px] border border-border bg-transparent px-[10px] font-mono text-[11.5px] tracking-[0.3px] text-muted-foreground transition-colors hover:border-border/80 hover:bg-muted hover:text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40";
const primaryControlButtonClasses =
  "border-primary/25 bg-primary/10 text-primary hover:border-primary hover:bg-primary/20";

const completedTrace: Trace = {
  title: "Processing research-notes.md",
  id: "doc:research-notes.md:1781730619928-117",
  elapsed: "9350ms",
  status: "completed",
  steps: [
    {
      name: "Parse",
      meta: "12 / 12 · pages",
      duration: "2200ms",
      progress: "61%",
      state: "ok",
    },
    {
      name: "Chunk",
      meta: "32 / 32 · chunks",
      duration: "1400ms",
      progress: "39%",
      state: "ok",
    },
    {
      name: "Embed",
      meta: "32 / 32 · embeddings",
      duration: "3600ms",
      progress: "100%",
      state: "ok",
    },
    {
      name: "Index",
      meta: "32 / 32 · upserts",
      duration: "1500ms",
      progress: "42%",
      state: "ok",
    },
    {
      name: "Finalize",
      meta: "searchable",
      duration: "500ms",
      progress: "14%",
      state: "ok",
    },
  ],
};

const runningTrace: Trace = {
  title: "Processing report-q3.pdf",
  id: "doc:report-q3.pdf:1781730690582-162",
  elapsed: "943ms",
  status: "running",
  steps: [
    {
      name: "Parse",
      meta: "06 / 12 · pages · page 6/12",
      duration: "...",
      progress: "52%",
      state: "running",
    },
  ],
};

const failingTrace: Trace = {
  title: "Processing broken-upload.pdf",
  id: "doc:broken-upload.pdf:1781730702148-404",
  elapsed: "2860ms",
  status: "failing",
  steps: [
    {
      name: "Parse",
      meta: "12 / 12 · pages",
      duration: "2100ms",
      progress: "100%",
      state: "ok",
    },
    {
      name: "Chunk",
      meta: "08 / 32 · chunks",
      duration: "760ms",
      progress: "24%",
      state: "failed",
    },
  ],
};

const concurrentTraces: readonly Trace[] = [
  {
    ...runningTrace,
    title: "Processing design-doc.pdf",
    id: "doc:design-doc.pdf:1781730689994-153",
    elapsed: "461ms",
    steps: [
      {
        name: "Parse",
        meta: "03 / 12 · pages · page 3/12",
        duration: "...",
        progress: "24%",
        state: "running",
      },
    ],
  },
  {
    ...completedTrace,
    title: "Processing contract-v2.pdf",
    elapsed: "9350ms",
  },
  failingTrace,
];

const completedLogs: readonly LogLine[] = [
  {
    timestamp: "17:10:22.019",
    level: "info",
    source: "[parse]",
    message: "parsed 12 pages · 4 tables · 18,402 tokens",
  },
  {
    timestamp: "17:10:22.228",
    level: "info",
    source: "[chunk]",
    message: "splitting · target=512 tok · overlap=64",
  },
  {
    timestamp: "17:10:23.446",
    level: "info",
    source: "[chunk]",
    message: "produced 32 chunks · avg 542 tok",
  },
  {
    timestamp: "17:10:23.768",
    level: "info",
    source: "[embed]",
    message: "POST openai · model=text-embedding-3-small · batch=32",
  },
  {
    timestamp: "17:10:25.209",
    level: "warn",
    source: "[embed]",
    message: "rate-limited · retrying in 240ms",
  },
  {
    timestamp: "17:10:27.009",
    level: "info",
    source: "[embed]",
    message: "embedded 32 chunks · 1536-dim · 248ms",
  },
  {
    timestamp: "17:10:27.368",
    level: "info",
    source: "[index]",
    message: "connecting to pgvector://primary",
  },
  {
    timestamp: "17:10:28.644",
    level: "info",
    source: "[index]",
    message: "indexed 32 vectors · committed txn 0xa8f4",
  },
  {
    timestamp: "17:10:28.900",
    level: "info",
    source: "[finalize]",
    message: "workflow complete · 32 chunks searchable",
  },
];

const failingLogs: readonly LogLine[] = [
  {
    timestamp: "17:11:04.970",
    level: "info",
    source: "[parse]",
    message: "opening contract-v2.pdf",
  },
  {
    timestamp: "17:11:07.017",
    level: "info",
    source: "[parse]",
    message: "parsed 12 pages · 4 tables · 18,402 tokens",
  },
  {
    timestamp: "17:11:09.111",
    level: "error",
    source: "[chunk]",
    message: "invalid text extraction frame · retry budget exhausted",
  },
];

const tracesForMode = (mode: Mode): readonly Trace[] =>
  M.value(mode).pipe(
    M.withReturnType<readonly Trace[]>(),
    M.when("completed", () => [completedTrace]),
    M.when("running", () => [runningTrace]),
    M.when("failing", () => [failingTrace]),
    M.when("concurrent", () => concurrentTraces),
    M.exhaustive
  );

const logsForMode = (mode: Mode): readonly LogLine[] =>
  mode === "failing" ? failingLogs : completedLogs;

const statusLabel = (status: Mode): string =>
  status === "failing" ? "failed" : status;

const statusChipClasses = (status: Mode): string =>
  clsx(
    "rounded-[3px] border px-2 py-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.8px]",
    status === "completed" &&
      "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    status === "running" && "border-primary/25 bg-primary/10 text-primary",
    status === "concurrent" && "border-primary/25 bg-primary/10 text-primary",
    status === "failing" &&
      "border-destructive/30 bg-destructive/10 text-destructive-foreground"
  );

const stepStateClasses = (state: StepState): string =>
  clsx(
    "grid grid-cols-[16px_minmax(0,1fr)_minmax(8rem,200px)_56px] items-center gap-[14px] border-b border-white/[0.04] py-2 text-[13px] last:border-b-0",
    state === "ok" && "text-emerald-300",
    state === "running" && "text-primary",
    state === "failed" && "text-destructive"
  );

const logLineClasses = (level: LogLine["level"]): string =>
  clsx(
    "grid grid-cols-[6.2rem_3rem_4.8rem_minmax(0,1fr)] gap-2 px-3 py-0.5 text-[11.5px] leading-[1.55]",
    level === "info" && "text-muted-foreground",
    level === "warn" && "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    level === "error" &&
      "bg-destructive/10 text-destructive dark:text-destructive-foreground"
  );

const constellationPoints: readonly Point[] = [
  { cx: "80", cy: "260" },
  { cx: "235", cy: "158" },
  { cx: "430", cy: "180" },
  { cx: "625", cy: "120" },
  { cx: "820", cy: "245" },
  { cx: "120", cy: "120" },
  { cx: "500", cy: "130" },
  { cx: "790", cy: "130" },
];

const modeOptions: readonly ModeOption[] = [
  { mode: "running", label: "▶ Run workflow" },
  { mode: "failing", label: "⚠ Failing run" },
  { mode: "concurrent", label: "✦ 3× concurrent" },
];

const activityItems: readonly ActivityItem[] = [
  { name: "research-notes.md", source: "active trace", meta: "9350ms" },
];

const annotations: readonly Annotation[] = [
  { number: "1", body: "Span events become visible UI state." },
  { number: "2", body: "Progress rows preserve step status and duration." },
  { number: "3", body: "Logs stay aligned with the trace timeline." },
];

const fitCards: readonly TextCard[] = [
  {
    title: "Create a transport",
    body: "SSE, WebSocket, or durable streams.",
  },
  {
    title: "Wrap an Effect workflow",
    body: "Emit spans from the same runtime context.",
  },
  {
    title: "Render the trace",
    body: "React hooks transform events into UI state.",
  },
];

const transportCards: readonly TransportCard[] = [
  {
    title: "SSE",
    path: "/transports/sse",
    body: "Simple request/response streaming.",
  },
  {
    title: "WebSocket",
    path: "/transports/ws",
    body: "Bidirectional live trace channels.",
  },
  {
    title: "Durable streams",
    path: "/transports/durable-streams",
    body: "Replayable events for long-running jobs.",
  },
];

const serializedEventsExpression = ["$", "{JSON.stringify(events)}"].join("");

const sseTransportOption: TransportOption = {
  value: "sse",
  label: "SSE",
  language: "typescript",
  filename: "src/trace-live.ts",
  lines: [
    'import { Layer, Logger } from "effect";',
    'import { LiveTraceLayer, TraceSinkLive, liveTraceLogger } from "livetrace";',
    'import { SSETransportLayer } from "livetrace/transports/sse";',
    "",
    "export const TraceLive = LiveTraceLayer.pipe(",
    "  Layer.provide(TraceSinkLive({ flushIntervalMs: 100 })),",
    "  Layer.provide(SSETransportLayer),",
    "  Layer.provideMerge(",
    "    Logger.replaceScoped(Logger.defaultLogger, liveTraceLogger),",
    "  ),",
    ");",
    "",
    "// HTTP handler",
    'app.get("/traces/:type/:id", (req, res) => {',
    '  res.setHeader("Content-Type", "text/event-stream");',
    "  const off = getSseBroker().subscribe(",
    "    { type: req.params.type, id: req.params.id },",
    `    (events) => res.write(\`data: ${serializedEventsExpression}\\n\\n\`),`,
    "  );",
    '  req.on("close", off);',
    "});",
  ],
};

const webSocketTransportOption: TransportOption = {
  value: "websocket",
  label: "WebSocket",
  language: "typescript",
  filename: "src/trace-live.ws.ts",
  lines: [
    'import { Layer, Logger } from "effect";',
    'import { LiveTraceLayer, TraceSinkLive, liveTraceLogger } from "livetrace";',
    'import { WebSocketTransportLayer } from "livetrace/transports/ws";',
    "",
    "export const TraceLive = LiveTraceLayer.pipe(",
    "  Layer.provide(TraceSinkLive({ flushIntervalMs: 50 })),",
    "  Layer.provide(WebSocketTransportLayer),",
    "  Layer.provideMerge(",
    "    Logger.replaceScoped(Logger.defaultLogger, liveTraceLogger),",
    "  ),",
    ");",
    "",
    'wsServer.on("connection", (socket, req) => {',
    "  const scope = scopeFromRequest(req);",
    "  const off = getWsBroker().subscribe(scope, (events) => {",
    '    socket.send(JSON.stringify({ type: "trace.batch", events }));',
    "  });",
    '  socket.on("close", off);',
    "});",
  ],
};

const durableStreamsTransportOption: TransportOption = {
  value: "durable-streams",
  label: "Durable Streams",
  language: "typescript",
  filename: "src/trace-live.durable.ts",
  lines: [
    'import { Layer, Logger } from "effect";',
    'import { LiveTraceLayer, TraceSinkLive, liveTraceLogger } from "livetrace";',
    'import { DurableStreamsTransportLayer } from "livetrace/transports/durable-streams";',
    "",
    "export const TraceLive = LiveTraceLayer.pipe(",
    "  Layer.provide(TraceSinkLive({ flushIntervalMs: 250 })),",
    "  Layer.provide(DurableStreamsTransportLayer),",
    "  Layer.provideMerge(",
    "    Logger.replaceScoped(Logger.defaultLogger, liveTraceLogger),",
    "  ),",
    ");",
    "",
    'app.get("/traces/:type/:id/replay", async (req, res) => {',
    "  const cursor = req.query.cursor ?? 'latest';",
    "  const stream = await getDurableTraceStream().read(",
    "    { type: req.params.type, id: req.params.id },",
    "    { cursor },",
    "  );",
    "  return stream.pipeTo(res);",
    "});",
  ],
};

const backendTransportOptions: readonly TransportOption[] = [
  sseTransportOption,
  webSocketTransportOption,
  durableStreamsTransportOption,
];

const processSourceLines: readonly SourceLine[] = [
  { indent: "", text: 'import { Effect } from "effect";', tone: "keyword" },
  {
    indent: "",
    text: 'import { withTrace, step } from "livetrace";',
    tone: "keyword",
  },
  { indent: "", text: "" },
  {
    indent: "",
    text: "export const processDocument = (docId: string, pdf: Pdf) =>",
    tone: "keyword",
  },
  { indent: "  ", text: "Effect.gen(function* () {", tone: "call" },
  {
    indent: "    ",
    text: "yield* Effect.annotateCurrentSpan({",
    tone: "call",
    active: true,
  },
  { indent: "      ", text: '"doc.id": docId,', tone: "string" },
  { indent: "      ", text: '"doc.pages": pdf.pages.length,', tone: "string" },
  { indent: "    ", text: "});" },
  { indent: "", text: "" },
  { indent: "    ", text: 'yield* step("Parse")(', tone: "call" },
  {
    indent: "      ",
    text: "Effect.forEach(pdf.pages, (page) =>",
    tone: "call",
  },
  { indent: "        ", text: "parsePage(page).pipe(", tone: "call" },
  {
    indent: "          ",
    text: 'Effect.withSpan("parse.page", {',
    tone: "call",
  },
  {
    indent: "            ",
    text: 'attributes: { "parse.n": page.n, "parse.total": pdf.pages.length },',
    tone: "string",
  },
  { indent: "          ", text: "})" },
  { indent: "        ", text: ")" },
  { indent: "      ", text: ")" },
  { indent: "    ", text: ");" },
  { indent: "", text: "" },
  {
    indent: "    ",
    text: 'const pieces = yield* step("Chunk")(',
    tone: "call",
  },
  {
    indent: "      ",
    text: "Effect.forEach(pdf.text, (slice, i) =>",
    tone: "call",
  },
  { indent: "        ", text: "splitOne(slice).pipe(", tone: "call" },
  {
    indent: "          ",
    text: 'Effect.withSpan("chunk.split", {',
    tone: "call",
  },
  {
    indent: "            ",
    text: 'attributes: { "chunk.i": i + 1, "chunk.total": pdf.text.length },',
    tone: "string",
  },
  { indent: "          ", text: "})" },
  { indent: "        ", text: ")" },
  { indent: "      ", text: ")" },
  { indent: "    ", text: ");" },
  { indent: "", text: "" },
  {
    indent: "    ",
    text: 'const vectors = yield* step("Embed")(',
    tone: "call",
  },
  { indent: "      ", text: "Effect.forEach(pieces, (c, i) =>", tone: "call" },
  { indent: "        ", text: "embedOne(c).pipe(", tone: "call" },
  {
    indent: "          ",
    text: 'Effect.withSpan("embed.one", {',
    tone: "call",
  },
  {
    indent: "            ",
    text: 'attributes: { "embed.i": i + 1, "embed.total": pieces.length },',
    tone: "string",
  },
  { indent: "          ", text: "})" },
  { indent: "        ", text: ")," },
  { indent: "        ", text: "{ concurrency: 4 }," },
  { indent: "      ", text: ")" },
  { indent: "    ", text: ");" },
  { indent: "", text: "" },
  { indent: "    ", text: 'yield* step("Index")(', tone: "call" },
  { indent: "      ", text: "Effect.forEach(vectors, (v, i) =>", tone: "call" },
  { indent: "        ", text: "upsert(v).pipe(", tone: "call" },
];

const executionSteps: readonly ExecutionStep[] = [
  {
    label: "Parse",
    tag: "parse.page",
    value: "12 / 12 · pages",
    progress: "100%",
  },
  {
    label: "Chunk",
    tag: "chunk.split",
    value: "32 / 32 · chunks",
    progress: "100%",
  },
  {
    label: "Embed",
    tag: "embed.one",
    value: "6 / 6 · embeddings",
    progress: "100%",
  },
  {
    label: "Index",
    tag: "index.upsert",
    value: "32 / 32 · upserts",
    progress: "100%",
  },
];

const embeddingRows: readonly EmbeddingRow[] = [
  {
    index: "02/6",
    text: '"Recruiting referrals - 38% of new hires this quarter came in through warm intros..."',
  },
  {
    index: "03/6",
    text: '"Risks - deal slippage at the top of the enterprise funnel. Mitigation is active..."',
  },
  {
    index: "04/6",
    text: '"Executive summary - Q3 revenue reached $4.2M, up 28% year over year..."',
  },
  {
    index: "05/6",
    text: '"The mid-market segment outperformed plan by 14%, while expansion softened..."',
  },
  {
    index: "06/6",
    text: '"Engineering shipped 14 new features this quarter, including trace streaming..."',
  },
];

const quickstartSteps: readonly QuickstartStep[] = [
  {
    number: "1",
    name: "Parse",
    tag: "parse.page",
    value: "7 / 12 · pages",
    progress: "55%",
    state: "active",
  },
  {
    number: "2",
    name: "Chunk",
    tag: "chunk.split",
    value: "0 / 32 · chunks",
    progress: "0%",
    state: "pending",
  },
  {
    number: "3",
    name: "Embed",
    tag: "embed.one",
    value: "0 / 6 · embeddings",
    progress: "0%",
    state: "pending",
  },
  {
    number: "4",
    name: "Index",
    tag: "index.upsert",
    value: "0 / 32 · upserts",
    progress: "0%",
    state: "pending",
  },
];

const ragAgentDemo: AgentDemo = {
  tab: "rag-agent",
  label: "RAG agent",
  pattern:
    "Plan → Retrieve → Rerank → Generate. The common chat-with-retrieval shape. Generate streams tokens.",
  query: "Where does customer health stand?",
  counter: "4/4",
  metrics: [
    { label: "status", value: "complete", running: true },
    { label: "tokens · in", value: "888" },
    { label: "tokens · out", value: "125" },
    { label: "cost", value: "$0.011…" },
    { label: "ttft", value: "3700ms" },
    { label: "p95 step", value: "2400ms" },
    { label: "total", value: "4700ms" },
    { label: "events/s", value: "16.8" },
  ],
  steps: [
    {
      name: "Plan",
      status: "420ms",
      duration: "420ms",
      chips: ["gpt-5-mini", "in 96", "out 52", "$0.00018"],
    },
    {
      name: "Retrieve",
      status: "1100ms",
      duration: "1100ms",
      chips: [],
      rows: [
        {
          score: "0.338",
          text: "Customer success - NRR ticked to 118%, the highest reading since Q4 last year...",
        },
        {
          score: "0.309",
          text: "Customer health: 92% of accounts are in the green band with gross retention holding...",
        },
        {
          score: "0.241",
          text: "Customer success - NRR ticked to 118%, the highest reading since Q4 last year...",
        },
        {
          score: "0.206",
          text: "Customer health: 92% of accounts are in the green band with gross retention holding...",
        },
        {
          score: "0.180",
          text: "Customer success - NRR ticked to 118%, the highest reading since Q4 last year...",
        },
      ],
    },
    {
      name: "Rerank",
      status: "780ms",
      duration: "780ms",
      chips: ["cohere/rerank-3", "in 414", "out 6", "$0.00027"],
      rows: [
        {
          score: "0.884",
          text: "Customer success - NRR ticked to 118%, the highest reading since Q4 last year...",
        },
        {
          score: "0.837",
          text: "Customer health: 92% of accounts are in the green band...",
        },
        {
          score: "0.775",
          text: "Customer success - NRR ticked to 118%, the highest reading since Q4 last year...",
        },
        {
          score: "0.732",
          text: "Customer health: 92% of accounts are in the green band...",
        },
        {
          score: "0.681",
          text: "Customer success - NRR ticked to 118%, the highest reading since Q4 last year...",
        },
      ],
    },
    {
      name: "Generate",
      status: "2400ms",
      duration: "2400ms",
      chips: ["claude-opus-4-7", "in 378", "out 67", "$0.01070"],
    },
  ],
  answerStatus: "complete",
  answer:
    "Customer health improved through the first two weeks of November. NRR ticked to 118% - the highest reading since Q4 last year - with gross retention holding at 94%.",
  logStatus: "closed · 8 events",
  logs: [
    {
      timestamp: "17:44:07.255",
      level: "info",
      source: "[plan]",
      message: 'decompose · "Where does customer health stand?"',
    },
    {
      timestamp: "17:44:07.550",
      level: "info",
      source: "[plan]",
      message: "plan ready · 3 sub-queries · routing to retriever",
    },
    {
      timestamp: "17:44:07.709",
      level: "info",
      source: "[retrieve]",
      message: "pgvector.search · k=18 · namespace=docs",
    },
    {
      timestamp: "17:44:08.248",
      level: "info",
      source: "[retrieve]",
      message: "embed query · text-embedding-3-small · 8ms",
    },
    {
      timestamp: "17:44:08.654",
      level: "info",
      source: "[retrieve]",
      message: "returned 18 candidates · max score 0.939",
    },
  ],
};

const agentToolsDemo: AgentDemo = {
  ...ragAgentDemo,
  tab: "agent-tools",
  label: "Agent + tools",
  pattern:
    "Think → Call tools → Observe → Respond. Tool spans show arguments, latency, and emitted user-facing events.",
  query: "Can we draft the renewal follow-up?",
  counter: "3/3",
  metrics: [
    { label: "status", value: "complete", running: true },
    { label: "tokens · in", value: "1320" },
    { label: "tokens · out", value: "214" },
    { label: "cost", value: "$0.018…" },
    { label: "ttft", value: "2100ms" },
    { label: "p95 step", value: "1800ms" },
    { label: "total", value: "6100ms" },
    { label: "events/s", value: "12.4" },
  ],
  steps: [
    {
      name: "Plan",
      status: "510ms",
      duration: "510ms",
      chips: ["gpt-5-mini", "intent", "tool route"],
    },
    {
      name: "Load account",
      status: "980ms",
      duration: "980ms",
      chips: ["crm.lookup", "acct_42", "ok"],
      rows: [
        {
          score: "crm",
          text: "Acme renewal owner: Morgan Lee · stage: negotiation",
        },
        { score: "mail", text: "Last outbound: pricing recap sent 2 days ago" },
      ],
    },
    {
      name: "Draft",
      status: "2400ms",
      duration: "2400ms",
      chips: ["claude-opus-4-7", "email.draft", "$0.01210"],
    },
  ],
  answerStatus: "complete",
  answer:
    "Drafted a renewal follow-up that references the pricing recap, confirms the negotiation owner, and asks for a Thursday review slot.",
  logStatus: "closed · 7 events",
  logs: [
    {
      timestamp: "17:45:02.018",
      level: "info",
      source: "[tool]",
      message: "crm.lookup account=acct_42",
    },
    {
      timestamp: "17:45:02.904",
      level: "info",
      source: "[tool]",
      message: "mail.search renewal thread · 8 matches",
    },
    {
      timestamp: "17:45:05.411",
      level: "info",
      source: "[draft]",
      message: "generated renewal follow-up · 214 tokens",
    },
  ],
};

const docPipelineDemo: AgentDemo = {
  ...ragAgentDemo,
  tab: "doc-pipeline",
  label: "Doc pipeline",
  pattern:
    "Parse → Chunk → Embed → Index. Batch document processing exposes each stage and the generated vector artifacts.",
  query: "Index the Q3 board packet.",
  counter: "4/4",
  metrics: [
    { label: "status", value: "complete", running: true },
    { label: "tokens · in", value: "18402" },
    { label: "tokens · out", value: "0" },
    { label: "cost", value: "$0.006…" },
    { label: "ttft", value: "-" },
    { label: "p95 step", value: "3600ms" },
    { label: "total", value: "9350ms" },
    { label: "events/s", value: "10.0" },
  ],
  steps: [
    {
      name: "Parse",
      status: "2200ms",
      duration: "2200ms",
      chips: ["12 / 12", "pages", "4 tables"],
    },
    {
      name: "Chunk",
      status: "1400ms",
      duration: "1400ms",
      chips: ["32 / 32", "chunks", "avg 542 tok"],
    },
    {
      name: "Embed",
      status: "3600ms",
      duration: "3600ms",
      chips: ["32 / 32", "embeddings", "1536-dim"],
    },
    {
      name: "Index",
      status: "1500ms",
      duration: "1500ms",
      chips: ["32 / 32", "upserts", "pgvector"],
    },
  ],
  answerStatus: "indexed",
  answer:
    "report-q3.pdf is searchable. 32 chunks were embedded and committed to the primary pgvector index.",
  logStatus: "closed · 10 events",
  logs: completedLogs.slice(0, 5),
};

const agentDemos: readonly AgentDemo[] = [
  ragAgentDemo,
  agentToolsDemo,
  docPipelineDemo,
];

const brandDots = (h: ReturnType<typeof html<Message>>): Html =>
  h.div(
    [h.Class("flex items-end gap-1")],
    [
      h.span([h.Class("h-2 w-2 rounded-full bg-primary")], []),
      h.span([h.Class("h-3 w-2 rounded-full bg-primary/70")], []),
      h.span([h.Class("h-4 w-2 rounded-full bg-primary/40")], []),
    ]
  );

const navView = (h: ReturnType<typeof html<Message>>): Html =>
  h.nav(
    [h.Class("border-b border-border bg-background/85 backdrop-blur")],
    [
      h.div(
        [
          h.Class(
            `${containerClasses} flex h-16 items-center justify-between`
          ),
        ],
        [
          h.div(
            [h.Class("flex items-center gap-3 font-semibold tracking-tight")],
            [
              brandDots(h),
              h.span([h.Class("text-lg")], ["livetrace"]),
              h.span([h.Class("text-xs text-muted-foreground")], ["v0.1.0"]),
            ]
          ),
          h.div(
            [h.Class("flex items-center gap-4 text-sm text-muted-foreground")],
            [
              h.a(
                [h.Href("#docs"), h.Class("hover:text-foreground")],
                ["docs"]
              ),
              h.a(
                [h.Href("#github"), h.Class("hover:text-foreground")],
                ["github"]
              ),
              h.a([h.Href("#npm"), h.Class("hover:text-foreground")], ["npm"]),
            ]
          ),
        ]
      ),
    ]
  );

const constellationView = (h: ReturnType<typeof html<Message>>): Html =>
  h.svg(
    [
      h.AriaHidden(true),
      h.Class(
        "pointer-events-none absolute inset-x-0 top-0 h-[520px] w-full opacity-45"
      ),
      h.Xmlns("http://www.w3.org/2000/svg"),
      h.ViewBox("0 0 900 420"),
      h.Fill("none"),
    ],
    [
      h.path(
        [
          h.D("M80 260 C180 110 300 340 430 180 S700 80 820 245"),
          h.Stroke("currentColor"),
          h.StrokeWidth("1"),
          h.Class("text-border"),
        ],
        []
      ),
      h.path(
        [
          h.D("M120 120 C260 160 320 80 500 130 S720 230 790 130"),
          h.Stroke("currentColor"),
          h.StrokeWidth("1"),
          h.Class("text-border"),
        ],
        []
      ),
      ...constellationPoints.map(({ cx, cy }) =>
        h.circle([h.Cx(cx), h.Cy(cy), h.R("4"), h.Class("fill-primary/60")], [])
      ),
    ]
  );

const modeControlsView = (
  h: ReturnType<typeof html<Message>>,
  activeMode: Mode
): Html =>
  h.div(
    [h.Class("flex flex-wrap items-center justify-end gap-1")],
    modeOptions.map(({ mode, label }) =>
      h.button(
        [
          h.Type("button"),
          h.OnClick(SelectedMode({ mode })),
          h.DataAttribute("active", activeMode === mode ? "true" : "false"),
          h.Class(
            clsx(
              controlButtonClasses,
              mode === "running" && primaryControlButtonClasses,
              "data-[active=true]:border-primary/25 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
            )
          ),
        ],
        [label]
      )
    )
  );

const stepView = (h: ReturnType<typeof html<Message>>, step: TraceStep): Html =>
  h.div(
    [h.Class(stepStateClasses(step.state))],
    [
      h.span(
        [
          h.Class(
            clsx(
              "relative inline-flex h-4 w-4 items-center justify-center",
              step.state === "running" &&
                "before:absolute before:inset-0 before:rounded-full before:border before:border-primary/40"
            )
          ),
        ],
        [
          h.span(
            [
              h.Class(
                clsx(
                  "h-2 w-2 rounded-full border",
                  step.state === "ok" && "border-emerald-400 bg-emerald-400",
                  step.state === "running" && "border-primary bg-primary",
                  step.state === "failed" && "border-destructive bg-destructive"
                )
              ),
            ],
            []
          ),
        ]
      ),
      h.div(
        [h.Class("min-w-0")],
        [
          h.div(
            [h.Class("flex items-baseline gap-2")],
            [
              h.span(
                [h.Class("text-[13.5px] font-medium text-foreground")],
                [step.name]
              ),
              h.span(
                [
                  h.Class(
                    "truncate font-mono text-[11px] text-muted-foreground"
                  ),
                ],
                [step.meta]
              ),
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("h-[6px] overflow-hidden rounded-[3px] bg-white/[0.04]")],
        [
          h.div(
            [
              h.Style({ width: step.progress }),
              h.Class(
                clsx(
                  "h-full rounded-[3px]",
                  step.state === "failed" ? "bg-destructive" : "bg-emerald-400"
                )
              ),
            ],
            []
          ),
        ]
      ),
      h.span(
        [h.Class("text-right font-mono text-[11.5px] text-muted-foreground")],
        [step.duration]
      ),
    ]
  );

const logRowsView = (
  h: ReturnType<typeof html<Message>>,
  mode: Mode
): readonly Html[] =>
  logsForMode(mode).map((log) =>
    h.div(
      [h.Class(logLineClasses(log.level))],
      [
        h.span([], [log.timestamp]),
        h.span([h.Class("font-semibold uppercase text-primary")], [log.level]),
        h.span([], [log.source]),
        h.span([h.Class("truncate")], [log.message]),
      ]
    )
  );

const embeddedLogConsoleView = (
  h: ReturnType<typeof html<Message>>,
  mode: Mode
): Html =>
  h.div(
    [
      h.Class(
        "flex h-[220px] flex-col overflow-hidden rounded-[6px] border border-border bg-background"
      ),
    ],
    [
      h.div(
        [
          h.Class(
            "flex items-center justify-between border-b border-border bg-muted px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.6px]"
          ),
        ],
        [
          h.span([h.Class("text-primary")], ["Effect.log → SpanEvent stream"]),
          h.span(
            [h.Class("text-muted-foreground")],
            [
              `● ${mode === "failing" ? "closed · 3 events" : "closed · 10 events"}`,
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("min-h-0 flex-1 overflow-hidden py-1 font-mono")],
        logRowsView(h, mode)
      ),
    ]
  );

const traceCardView = (
  h: ReturnType<typeof html<Message>>,
  trace: Trace,
  mode: Mode
): Html =>
  h.article(
    [
      h.Class(
        "flex min-h-[720px] flex-col overflow-hidden rounded-[6px] border border-border bg-muted text-card-foreground"
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
                [h.Class("truncate text-[14px] font-medium tracking-[-0.2px]")],
                [trace.title]
              ),
              h.div(
                [
                  h.Class(
                    "truncate font-mono text-[10.5px] text-muted-foreground/60"
                  ),
                ],
                [trace.id]
              ),
            ]
          ),
          h.div(
            [h.Class("flex shrink-0 items-center gap-2")],
            [
              h.span(
                [h.Class("font-mono text-[11px] text-muted-foreground")],
                [trace.elapsed]
              ),
              h.span(
                [h.Class(statusChipClasses(trace.status))],
                [statusLabel(trace.status)]
              ),
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("px-[18px] py-2")],
        trace.steps.map((step) => stepView(h, step))
      ),
      h.div(
        [h.Class("mt-auto px-[18px] pb-4 pt-1")],
        [embeddedLogConsoleView(h, mode)]
      ),
    ]
  );

const logConsoleView = (
  h: ReturnType<typeof html<Message>>,
  mode: Mode
): Html =>
  h.div(
    [h.Class(clsx(panelClasses, "overflow-hidden"))],
    [
      h.div(
        [
          h.Class(
            "flex items-center justify-between border-b border-border px-4 py-3"
          ),
        ],
        [
          h.span(
            [h.Class("text-sm font-semibold")],
            ["Effect.log → SpanEvent stream"]
          ),
          h.span(
            [
              h.Class(
                "inline-flex items-center gap-2 text-xs text-muted-foreground"
              ),
            ],
            [
              h.span([h.Class("h-2 w-2 rounded-full bg-primary")], []),
              `${mode === "failing" ? 3 : 10} events`,
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("max-h-72 overflow-hidden py-2 font-mono")],
        logRowsView(h, mode)
      ),
    ]
  );

const streamView = (h: ReturnType<typeof html<Message>>, model: Model): Html =>
  h.div(
    [h.Class("overflow-hidden rounded-[10px] bg-card")],
    [
      h.div(
        [
          h.Class(
            "flex flex-col gap-2 rounded-t-[10px] border border-border border-b-0 bg-card px-3 py-2 md:flex-row md:items-center md:justify-between"
          ),
        ],
        [
          h.div(
            [
              h.Class(
                "flex items-center gap-[10px] font-mono text-[12px] text-muted-foreground"
              ),
            ],
            [
              h.span(
                [
                  h.Class(
                    "h-[10px] w-[10px] rounded-full bg-muted-foreground/45"
                  ),
                ],
                []
              ),
              h.span(
                [
                  h.Class(
                    "h-[10px] w-[10px] rounded-full bg-muted-foreground/40"
                  ),
                ],
                []
              ),
              h.span(
                [
                  h.Class(
                    "h-[10px] w-[10px] rounded-full bg-muted-foreground/35"
                  ),
                ],
                []
              ),
              "traces/user/demo",
            ]
          ),
          modeControlsView(h, model.mode),
        ]
      ),
      h.div(
        [
          h.Class(
            "grid h-[720px] gap-[14px] overflow-hidden rounded-b-[10px] border border-border bg-card bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.04),transparent_60%)] p-5"
          ),
        ],
        tracesForMode(model.mode).map((trace) =>
          traceCardView(h, trace, model.mode)
        )
      ),
    ]
  );

const activityPanelView = (h: ReturnType<typeof html<Message>>): Html =>
  h.aside(
    [
      h.Class(
        "overflow-hidden rounded-[10px] border border-border bg-card p-0 text-card-foreground"
      ),
    ],
    [
      h.div(
        [
          h.Class(
            "flex items-center justify-between border-b border-border bg-muted px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.6px]"
          ),
        ],
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
        activityItems.map(({ name, source, meta }) =>
          h.div(
            [
              h.Class(
                "grid grid-cols-[10px_minmax(0,1fr)_auto] items-center gap-[10px] border-l-2 border-primary px-3 py-[7px] text-[12px] transition-colors hover:bg-white/[0.02]"
              ),
            ],
            [
              h.div([h.Class("h-1.5 w-1.5 rounded-full bg-emerald-400")], []),
              h.div(
                [h.Class("min-w-0")],
                [
                  h.div(
                    [
                      h.Class(
                        "truncate font-mono text-xs text-card-foreground"
                      ),
                    ],
                    [name]
                  ),
                  h.div([h.Class("sr-only")], [source]),
                ]
              ),
              h.span(
                [h.Class("font-mono text-xs text-muted-foreground")],
                [meta]
              ),
            ]
          )
        )
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
              h.span([h.Class("text-primary")], ["0.0"]),
            ]
          ),
          h.div([h.Class("h-0.5 rounded-full bg-primary")], []),
        ]
      ),
    ]
  );

const stageGridView = (
  h: ReturnType<typeof html<Message>>,
  model: Model
): Html =>
  h.div(
    [h.Class("grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start")],
    [streamView(h, model), activityPanelView(h)]
  );

const activeTransportOption = (transport: Transport): TransportOption =>
  M.value(transport).pipe(
    M.withReturnType<TransportOption>(),
    M.when("sse", () => sseTransportOption),
    M.when("websocket", () => webSocketTransportOption),
    M.when("durable-streams", () => durableStreamsTransportOption),
    M.exhaustive
  );

const backendTransportTabsView = (
  h: ReturnType<typeof html<Message>>,
  activeTransport: Transport
): Html =>
  h.div(
    [
      h.Class(
        "flex flex-wrap gap-1 border-b border-border bg-muted px-[14px] py-[10px]"
      ),
    ],
    backendTransportOptions.map((option) =>
      h.button(
        [
          h.Type("button"),
          h.OnClick(SelectedTransport({ transport: option.value })),
          h.DataAttribute(
            "active",
            option.value === activeTransport ? "true" : "false"
          ),
          h.Class(
            "inline-flex items-center rounded-[4px] border border-border bg-card px-[10px] py-[5px] font-mono text-[12px] text-muted-foreground transition-colors hover:bg-muted hover:text-card-foreground data-[active=true]:border-primary/25 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
          ),
        ],
        [option.label]
      )
    )
  );

const backendCodeLineView = (
  h: ReturnType<typeof html<Message>>,
  line: string,
  index: number
): Html =>
  h.div(
    [
      h.DataAttribute("empty", line === "" ? "true" : "false"),
      h.Class(
        "grid min-h-6 grid-cols-[2.5rem_minmax(0,1fr)] gap-4 whitespace-pre pr-4 text-sm leading-6 data-[empty=true]:h-3 data-[empty=true]:min-h-3"
      ),
    ],
    [
      h.span(
        [h.Class("select-none text-right text-muted-foreground/55")],
        [line === "" ? "" : String(index + 1).padStart(2, "0")]
      ),
      h.span([h.Class("text-slate-300")], [line]),
    ]
  );

const backendCodePanelView = (
  h: ReturnType<typeof html<Message>>,
  activeTransport: Transport
): Html => {
  const option = activeTransportOption(activeTransport);

  return h.div(
    [
      h.Class(
        "overflow-hidden rounded-lg border border-border bg-card/85 text-card-foreground"
      ),
    ],
    [
      backendTransportTabsView(h, activeTransport),
      h.div(
        [
          h.Class(
            "flex items-center justify-between border-b border-border bg-background/35 px-4 py-2 font-mono text-xs"
          ),
        ],
        [
          h.span([h.Class("text-muted-foreground")], [option.filename]),
          h.span([h.Class("text-primary")], [option.language]),
        ]
      ),
      h.div(
        [h.Class("max-h-[34rem] overflow-hidden py-4 font-mono")],
        option.lines.map((line, index) => backendCodeLineView(h, line, index))
      ),
    ]
  );
};

const howStepCaptureView = (
  h: ReturnType<typeof html<Message>>,
  model: Model
): Html =>
  h.div(
    [
      h.Class(
        "grid gap-9 border-y border-border py-7 lg:grid-cols-[240px_minmax(0,1fr)]"
      ),
    ],
    [
      h.div(
        [h.Class("space-y-2")],
        [
          h.div(
            [
              h.Class(
                "font-mono text-[11px] uppercase tracking-[1px] text-primary"
              ),
            ],
            ["01 · backend"]
          ),
          h.div(
            [h.Class("space-y-2")],
            [
              h.h3(
                [
                  h.Class(
                    "text-[18px] font-medium leading-[1.2] tracking-[-0.3px]"
                  ),
                ],
                ["Compose the trace layer"]
              ),
              h.p(
                [h.Class("text-[13.5px] leading-[1.6] text-muted-foreground")],
                [
                  "LiveTraceLayer wraps your current tracer (native or OpenTelemetry) and pushes events into a buffered sink. The sink flushes batches to a pluggable transport.",
                ]
              ),
            ]
          ),
        ]
      ),
      backendCodePanelView(h, model.transport),
    ]
  );

const activeAgentDemo = (tab: AgentDemoTab): AgentDemo =>
  M.value(tab).pipe(
    M.withReturnType<AgentDemo>(),
    M.when("rag-agent", () => ragAgentDemo),
    M.when("agent-tools", () => agentToolsDemo),
    M.when("doc-pipeline", () => docPipelineDemo),
    M.exhaustive
  );

const agentDemoTabsView = (
  h: ReturnType<typeof html<Message>>,
  activeTab: AgentDemoTab
): Html =>
  h.div(
    [h.Class("flex flex-wrap items-center gap-1")],
    agentDemos.map((demo) =>
      h.button(
        [
          h.Type("button"),
          h.OnClick(SelectedAgentDemoTab({ tab: demo.tab })),
          h.DataAttribute("active", demo.tab === activeTab ? "true" : "false"),
          h.Class(
            "inline-flex items-center rounded-[4px] border border-border bg-card px-[10px] py-[5px] text-[12px] text-muted-foreground transition-colors hover:bg-muted hover:text-card-foreground data-[active=true]:border-primary/25 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
          ),
        ],
        [demo.label]
      )
    )
  );

const agentMetricView = (
  h: ReturnType<typeof html<Message>>,
  metric: AgentMetric
): Html =>
  h.div(
    [
      h.DataAttribute("running", metric.running === true ? "true" : "false"),
      h.Class(
        "min-w-0 bg-card px-3 py-[10px] data-[running=true]:text-emerald-300"
      ),
    ],
    [
      h.div(
        [
          h.Class(
            "mb-1 font-mono text-[10.5px] uppercase tracking-[0.5px] text-muted-foreground/70"
          ),
        ],
        [metric.label]
      ),
      h.div(
        [
          h.Class(
            "truncate font-mono text-[15px] font-medium text-card-foreground"
          ),
        ],
        [metric.value]
      ),
    ]
  );

const agentStepRowsView = (
  h: ReturnType<typeof html<Message>>,
  step: AgentStep
): readonly Html[] =>
  (step.rows ?? []).map((row) =>
    h.div(
      [h.Class("grid grid-cols-[3rem_minmax(0,1fr)] gap-3 font-mono text-xs")],
      [
        h.span([h.Class("text-primary")], [row.score]),
        h.span([h.Class("truncate text-muted-foreground")], [row.text]),
      ]
    )
  );

const agentStepCardView = (
  h: ReturnType<typeof html<Message>>,
  step: AgentStep
): Html =>
  h.div(
    [h.Class("rounded-[6px] border border-border bg-muted p-[10px_12px]")],
    [
      h.div(
        [h.Class("mb-1.5 flex items-center justify-between gap-3")],
        [
          h.div(
            [h.Class("flex min-w-0 items-center gap-2")],
            [
              h.span(
                [h.Class("h-[7px] w-[7px] rounded-full bg-emerald-400")],
                []
              ),
              h.span([h.Class("truncate text-sm font-medium")], [step.name]),
            ]
          ),
          h.span(
            [h.Class("font-mono text-xs text-muted-foreground")],
            [step.duration]
          ),
        ]
      ),
      h.div(
        [h.Class("mb-3 flex flex-wrap gap-1.5")],
        step.chips.map((chip) =>
          h.span(
            [
              h.Class(
                "rounded-[3px] border border-border bg-card px-[6px] py-1 font-mono text-[11px] text-muted-foreground"
              ),
            ],
            [chip]
          )
        )
      ),
      h.div([h.Class("space-y-1")], agentStepRowsView(h, step)),
    ]
  );

const agentAnswerPanelView = (
  h: ReturnType<typeof html<Message>>,
  demo: AgentDemo
): Html =>
  h.div(
    [h.Class("border-l border-border bg-card p-[14px]")],
    [
      h.div(
        [h.Class("mb-4 flex items-center justify-between gap-3")],
        [
          h.span(
            [
              h.Class(
                "rounded-[4px] border border-primary/25 bg-primary/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.5px] text-primary"
              ),
            ],
            ["assistant"]
          ),
          h.span(
            [
              h.Class(
                "inline-flex items-center gap-2 text-xs text-muted-foreground"
              ),
            ],
            [
              h.span([h.Class("h-2 w-2 rounded-full bg-muted-foreground")], []),
              demo.answerStatus,
            ]
          ),
        ]
      ),
      h.p([h.Class("text-sm leading-6 text-foreground")], [demo.answer]),
    ]
  );

const agentLogView = (
  h: ReturnType<typeof html<Message>>,
  demo: AgentDemo
): Html =>
  h.div(
    [h.Class("border-t border-border bg-muted")],
    [
      h.div(
        [
          h.Class(
            "flex items-center justify-between border-b border-border px-[14px] py-2 font-mono text-[11.5px]"
          ),
        ],
        [
          h.span([h.Class("text-card-foreground")], ["Effect.log → SpanEvent"]),
          h.span([h.Class("text-muted-foreground")], [demo.logStatus]),
        ]
      ),
      h.div(
        [h.Class("max-h-40 overflow-hidden py-2 font-mono")],
        demo.logs.map((log) =>
          h.div(
            [
              h.Class(
                "grid grid-cols-[6.5rem_3rem_5.5rem_minmax(0,1fr)] gap-2 px-[14px] py-0.5 text-[11.5px] leading-[1.65]"
              ),
            ],
            [
              h.span([h.Class("text-muted-foreground/70")], [log.timestamp]),
              h.span([h.Class("text-primary")], [log.level]),
              h.span([h.Class("text-muted-foreground")], [log.source]),
              h.span([h.Class("truncate text-card-foreground")], [log.message]),
            ]
          )
        )
      ),
    ]
  );

const agentDemoCaptureView = (
  h: ReturnType<typeof html<Message>>,
  model: Model
): Html => {
  const demo = activeAgentDemo(model.agentDemoTab);

  return h.div(
    [
      h.Class(
        "mb-8 overflow-hidden rounded-[10px] border border-border bg-card"
      ),
    ],
    [
      h.div(
        [
          h.Class(
            "flex flex-col gap-3 border-b border-border bg-muted px-[14px] py-[10px] lg:flex-row lg:items-center lg:justify-between"
          ),
        ],
        [
          h.div(
            [h.Class("flex items-center gap-3")],
            [
              h.span(
                [h.Class("flex gap-1")],
                [
                  h.span(
                    [h.Class("h-[7px] w-[7px] rounded-full bg-rose-400")],
                    []
                  ),
                  h.span(
                    [h.Class("h-[7px] w-[7px] rounded-full bg-amber-300")],
                    []
                  ),
                  h.span(
                    [h.Class("h-[7px] w-[7px] rounded-full bg-emerald-400")],
                    []
                  ),
                ]
              ),
              h.span(
                [h.Class("font-mono text-[12.5px] text-muted-foreground")],
                ["traces/user/demo"]
              ),
              h.span([h.Class("h-4 w-px bg-border")], []),
              h.span(
                [h.Class("text-[11.5px] text-muted-foreground/70")],
                [demo.label]
              ),
            ]
          ),
          agentDemoTabsView(h, model.agentDemoTab),
        ]
      ),
      h.div(
        [
          h.Class(
            "grid gap-[10px] border-b border-border bg-muted px-[14px] py-[10px] text-[12.5px] lg:grid-cols-[auto_minmax(0,1fr)_auto]"
          ),
        ],
        [
          h.span(
            [
              h.Class(
                "font-mono text-[10.5px] uppercase tracking-[0.5px] text-muted-foreground/70"
              ),
            ],
            ["pattern"]
          ),
          h.span([h.Class("text-[12.5px] text-foreground")], [demo.pattern]),
          h.div(
            [h.Class("flex flex-wrap gap-2")],
            [
              h.button(
                [
                  h.Type("button"),
                  h.Class(
                    "h-7 rounded-[4px] border border-primary/35 px-2 font-mono text-xs text-primary"
                  ),
                ],
                ["see the code"]
              ),
              h.a(
                [
                  h.Href("#stackblitz"),
                  h.Class(
                    "inline-flex h-7 items-center rounded-[4px] border border-primary/35 px-2 font-mono text-xs text-primary"
                  ),
                ],
                ["Run in StackBlitz ↗"]
              ),
            ]
          ),
        ]
      ),
      h.div(
        [
          h.Class(
            "flex items-center gap-3 border-b border-border px-[18px] py-4"
          ),
        ],
        [
          h.span(
            [
              h.Class(
                "rounded-[4px] bg-primary/10 px-[6px] py-0.5 font-mono text-[11px] uppercase tracking-[0.5px] text-primary"
              ),
            ],
            ["user"]
          ),
          h.span(
            [
              h.Class(
                "min-w-0 flex-1 truncate text-base font-medium text-card-foreground"
              ),
            ],
            [demo.query]
          ),
          h.span(
            [h.Class("font-mono text-xs text-muted-foreground")],
            [demo.counter]
          ),
        ]
      ),
      h.div(
        [
          h.Class(
            "grid gap-px border-b border-border bg-border md:grid-cols-4 lg:grid-cols-8"
          ),
        ],
        demo.metrics.map((metric) => agentMetricView(h, metric))
      ),
      h.div(
        [
          h.Class(
            "grid min-h-[34rem] lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-[10px] border-r border-border bg-card p-[14px]")],
            demo.steps.map((step) => agentStepCardView(h, step))
          ),
          agentAnswerPanelView(h, demo),
        ]
      ),
      agentLogView(h, demo),
    ]
  );
};

const sourceToneClasses = (tone: SourceLine["tone"]): string =>
  clsx(
    tone === "keyword" && "text-violet-300",
    tone === "call" && "text-primary",
    tone === "string" && "text-slate-300",
    tone === "muted" && "text-muted-foreground",
    tone === "plain" && "text-card-foreground"
  );

const sourceLineView = (
  h: ReturnType<typeof html<Message>>,
  line: SourceLine
): Html =>
  h.div(
    [
      h.DataAttribute("active", line.active === true ? "true" : "false"),
      h.Class(
        clsx(
          "whitespace-pre pr-4 leading-[1.45] data-[active=true]:bg-primary/10 data-[active=true]:text-primary",
          sourceToneClasses(line.tone ?? "plain")
        )
      ),
    ],
    [`${line.indent}${line.text}`]
  );

const codePanelView = (
  h: ReturnType<typeof html<Message>>,
  lineLabel = "line 51"
): Html =>
  h.div(
    [
      h.Class(
        "min-h-[760px] overflow-hidden border-r border-border bg-card text-card-foreground"
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
          h.span([h.Class("text-muted-foreground")], ["src/process.ts"]),
          h.span(
            [h.Class("inline-flex items-center gap-2 text-primary")],
            [h.span([], ["▸"]), lineLabel]
          ),
        ]
      ),
      h.div(
        [
          h.Class(
            "h-[722px] overflow-hidden py-[26px] font-mono text-[12.5px] leading-[1.45] text-slate-300"
          ),
        ],
        processSourceLines.map((line) => sourceLineView(h, line))
      ),
    ]
  );

const speedButtonView = (
  h: ReturnType<typeof html<Message>>,
  label: string,
  active = false
): Html =>
  h.button(
    [
      h.Type("button"),
      h.DataAttribute("active", active ? "true" : "false"),
      h.Class(
        "inline-flex h-[22px] min-w-8 items-center justify-center border-r border-border bg-transparent px-2 font-mono text-[10.5px] leading-[14px] text-muted-foreground/70 last:border-r-0 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
      ),
    ],
    [label]
  );

const transportControlView = (h: ReturnType<typeof html<Message>>): Html =>
  h.div(
    [
      h.Class(
        "flex h-[38px] items-center gap-1 border-b border-border bg-muted px-[14px]"
      ),
    ],
    [
      h.button(
        [
          h.Type("button"),
          h.Class(
            "inline-flex h-6 w-7 items-center justify-center rounded-[3px] border border-border bg-card text-[10.5px] text-muted-foreground"
          ),
        ],
        ["Ⅱ"]
      ),
      h.button(
        [
          h.Type("button"),
          h.Class(
            "inline-flex h-6 w-7 items-center justify-center rounded-[3px] border border-border bg-card text-[10.5px] text-muted-foreground"
          ),
        ],
        ["↠"]
      ),
      h.button(
        [
          h.Type("button"),
          h.Class(
            "inline-flex h-6 w-7 items-center justify-center rounded-[3px] border border-border bg-card text-[10.5px] text-muted-foreground"
          ),
        ],
        ["↻"]
      ),
      h.div(
        [h.Class("ml-3 flex items-center")],
        [
          speedButtonView(h, "0.5×"),
          speedButtonView(h, "1×", true),
          speedButtonView(h, "2×"),
        ]
      ),
    ]
  );

const executionStepView = (
  h: ReturnType<typeof html<Message>>,
  step: ExecutionStep
): Html =>
  h.div(
    [h.Class("grid gap-2 px-[18px] py-[7px]")],
    [
      h.div(
        [
          h.Class(
            "grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3"
          ),
        ],
        [
          h.span(
            [
              h.Class(
                "inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-background"
              ),
            ],
            ["✓"]
          ),
          h.div(
            [h.Class("flex min-w-0 items-center gap-2")],
            [
              h.span(
                [h.Class("text-sm font-medium text-card-foreground")],
                [step.label]
              ),
              h.code(
                [
                  h.Class(
                    "rounded-[3px] border border-border bg-muted px-[6px] py-0.5 font-mono text-[10.5px] text-muted-foreground"
                  ),
                ],
                [step.tag]
              ),
            ]
          ),
          h.span([h.Class("font-mono text-xs text-emerald-300")], [step.value]),
        ]
      ),
      h.div(
        [
          h.Class(
            "ml-8 h-[5px] overflow-hidden rounded-full border border-white/[0.04] bg-muted"
          ),
        ],
        [
          h.div(
            [
              h.Style({ width: step.progress }),
              h.Class("h-full rounded-full bg-emerald-400"),
            ],
            []
          ),
        ]
      ),
    ]
  );

const embeddingRowView = (
  h: ReturnType<typeof html<Message>>,
  row: EmbeddingRow
): Html =>
  h.div(
    [
      h.Class(
        "grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-4 rounded-[4px] border border-border bg-muted px-3 py-3"
      ),
    ],
    [
      h.span([h.Class("font-mono text-xs text-primary")], [row.index]),
      h.span(
        [h.Class("truncate text-sm italic text-card-foreground/85")],
        [row.text]
      ),
    ]
  );

const executionPanelView = (h: ReturnType<typeof html<Message>>): Html =>
  h.div(
    [h.Class("min-h-[760px] bg-background")],
    [
      transportControlView(h),
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
                ["report-q3.pdf"]
              ),
              h.div(
                [h.Class("mt-1 font-mono text-xs text-muted-foreground")],
                ["12 pages · 18,402 tokens"]
              ),
            ]
          ),
          h.span(
            [
              h.Class(
                "rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.6px] text-emerald-300"
              ),
            ],
            ["complete"]
          ),
        ]
      ),
      h.div(
        [],
        executionSteps.map((step) => executionStepView(h, step))
      ),
      h.div(
        [h.Class("px-5 py-4")],
        [
          h.div(
            [
              h.Class(
                "mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-wider"
              ),
            ],
            [
              h.span([h.Class("text-muted-foreground")], ["recent embeddings"]),
              h.span([h.Class("text-primary")], ["5 of 6"]),
            ]
          ),
          h.div(
            [h.Class("space-y-2")],
            embeddingRows.map((row) => embeddingRowView(h, row))
          ),
        ]
      ),
    ]
  );

const quickstartStepView = (
  h: ReturnType<typeof html<Message>>,
  step: QuickstartStep
): Html =>
  h.div(
    [
      h.DataAttribute("state", step.state),
      h.Class(
        "grid gap-2 px-[18px] py-[7px] opacity-55 data-[state=active]:opacity-100"
      ),
    ],
    [
      h.div(
        [
          h.Class(
            "grid grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-[10px]"
          ),
        ],
        [
          h.span(
            [
              h.Class(
                "inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border border-border bg-muted font-mono text-xs text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              ),
              h.DataAttribute("state", step.state),
            ],
            [step.state === "active" ? "●" : step.number]
          ),
          h.div(
            [h.Class("flex min-w-0 items-center gap-2")],
            [
              h.span(
                [h.Class("text-sm font-medium text-card-foreground")],
                [step.name]
              ),
              h.code(
                [
                  h.Class(
                    "rounded-[3px] border border-border bg-muted px-[6px] py-0.5 font-mono text-[10.5px] text-muted-foreground data-[state=active]:border-primary/25 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  ),
                  h.DataAttribute("state", step.state),
                ],
                [step.tag]
              ),
            ]
          ),
          h.span(
            [
              h.Class(
                "font-mono text-xs text-muted-foreground data-[state=active]:text-primary"
              ),
              h.DataAttribute("state", step.state),
            ],
            [step.value]
          ),
        ]
      ),
      h.div(
        [
          h.Class(
            "ml-8 h-[5px] overflow-hidden rounded-full border border-white/[0.04] bg-muted"
          ),
        ],
        [
          h.div(
            [
              h.Style({ width: step.progress }),
              h.Class(
                "h-full rounded-full bg-muted-foreground/30 data-[state=active]:bg-primary"
              ),
              h.DataAttribute("state", step.state),
            ],
            []
          ),
        ]
      ),
    ]
  );

const quickstartExecutionPanelView = (
  h: ReturnType<typeof html<Message>>
): Html =>
  h.div(
    [h.Class("min-h-[760px] bg-background")],
    [
      transportControlView(h),
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
                ["report-q3.pdf"]
              ),
              h.div(
                [h.Class("mt-1 font-mono text-xs text-muted-foreground")],
                ["12 pages · 18,402 tokens"]
              ),
            ]
          ),
          h.span(
            [
              h.Class(
                "rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.6px] text-primary"
              ),
            ],
            ["parse..."]
          ),
        ]
      ),
      h.div(
        [],
        quickstartSteps.map((step) => quickstartStepView(h, step))
      ),
      h.div(
        [h.Class("border-t border-border px-[18px] py-5")],
        [
          h.div(
            [
              h.Class(
                "mb-12 flex items-center justify-between font-mono text-xs uppercase tracking-wider"
              ),
            ],
            [
              h.span([h.Class("text-muted-foreground")], ["recent embeddings"]),
              h.span([h.Class("text-muted-foreground")], ["-"]),
            ]
          ),
          h.div(
            [h.Class("text-center text-sm text-muted-foreground/70")],
            ["awaiting embed step..."]
          ),
        ]
      ),
    ]
  );

const quickstartCaptureView = (h: ReturnType<typeof html<Message>>): Html =>
  h.div(
    [
      h.Class(
        "grid overflow-hidden rounded-[10px] border border-border bg-card lg:grid-cols-[minmax(0,1.08fr)_minmax(27rem,0.92fr)]"
      ),
    ],
    [codePanelView(h, "lines 13–17"), quickstartExecutionPanelView(h)]
  );

const literateCaptureView = (h: ReturnType<typeof html<Message>>): Html =>
  h.div(
    [
      h.Class(
        "grid overflow-hidden rounded-[10px] border border-border bg-card lg:grid-cols-[minmax(0,1.08fr)_minmax(27rem,0.92fr)]"
      ),
    ],
    [codePanelView(h), executionPanelView(h)]
  );

const literateSectionView = (h: ReturnType<typeof html<Message>>): Html =>
  h.section(
    [h.Class(`${containerClasses} py-16`)],
    [
      h.div(
        [h.Class("mb-6 max-w-2xl")],
        [
          h.h2(
            [h.Class("text-2xl font-semibold tracking-tight")],
            ["Watch the code execute"]
          ),
          h.p(
            [h.Class("mt-2 text-sm text-muted-foreground")],
            [
              "Source on the left, what your user sees on the right. The highlighted line is the line that just emitted the event you see appearing.",
            ]
          ),
        ]
      ),
      literateCaptureView(h),
    ]
  );

const annotationView = (h: ReturnType<typeof html<Message>>): Html =>
  h.div(
    [h.Class("grid gap-3 md:grid-cols-3")],
    annotations.map(({ number, body }) =>
      h.div(
        [
          h.Class(
            "rounded-lg border border-border bg-card/75 p-3 text-sm shadow-xs"
          ),
        ],
        [
          h.div(
            [h.Class("mb-2 text-xs font-semibold text-primary")],
            [`note ${number}`]
          ),
          h.p([h.Class("text-muted-foreground")], [body]),
        ]
      )
    )
  );

const stageView = (h: ReturnType<typeof html<Message>>, model: Model): Html =>
  h.main(
    [h.Class("relative overflow-hidden border-b border-border")],
    [
      constellationView(h),
      h.div(
        [h.Class(`${containerClasses} relative py-16 md:py-20`)],
        [
          h.div(
            [h.Class("mb-4")],
            [
              h.span(
                [h.Class(pillClasses)],
                [
                  h.span([h.Class("h-2 w-2 rounded-full bg-primary")], []),
                  "live · effect spans → react · zero-overhead",
                ]
              ),
            ]
          ),
          h.h1(
            [
              h.Class(
                "max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl"
              ),
            ],
            ["Show your users what your backend is actually doing."]
          ),
          h.p(
            [
              h.Class(
                "mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg"
              ),
            ],
            [
              "Wrap any Effect workflow. Every span - parse a page, embed a chunk, hit a vector store - streams to the browser as it happens. Same data your observability stack collects, rendered for users.",
            ]
          ),
          h.div([h.Class("mt-10")], [stageGridView(h, model)]),
          h.div([h.Class("mt-6")], [annotationView(h)]),
        ]
      ),
    ]
  );

const howItFitsView = (h: ReturnType<typeof html<Message>>): Html =>
  h.section(
    [h.Class(`${containerClasses} py-16`)],
    [
      h.div(
        [
          h.Class(
            "mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          ),
        ],
        [
          h.h2(
            [h.Class("text-2xl font-semibold tracking-tight")],
            ["How it fits together"]
          ),
          h.code(
            [
              h.Class(
                "rounded-md border border-border bg-muted px-3 py-2 text-xs"
              ),
            ],
            ["bun add livetrace effect"]
          ),
        ]
      ),
      h.div(
        [h.Class("grid gap-4 md:grid-cols-3")],
        fitCards.map(({ title, body }) =>
          h.article(
            [h.Class(clsx(subtlePanelClasses, "p-5"))],
            [
              h.h3([h.Class("font-semibold")], [title]),
              h.p([h.Class("mt-2 text-sm text-muted-foreground")], [body]),
            ]
          )
        )
      ),
    ]
  );

const transportCardsView = (h: ReturnType<typeof html<Message>>): Html =>
  h.section(
    [h.Class(`${containerClasses} py-16`)],
    [
      h.div(
        [h.Class("mb-8")],
        [
          h.h2(
            [h.Class("text-2xl font-semibold tracking-tight")],
            ["Pick your transport"]
          ),
          h.p(
            [h.Class("mt-2 text-sm text-muted-foreground")],
            [
              "Same interface. Same upstream. Swap one Layer to change how events leave your process.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("grid gap-4 md:grid-cols-3")],
        transportCards.map(({ title, path, body }) =>
          h.article(
            [h.Class(clsx(panelClasses, "p-5"))],
            [
              h.div([h.Class("text-sm font-semibold")], [title]),
              h.code(
                [h.Class("mt-3 block rounded-md bg-muted px-3 py-2 text-xs")],
                [path]
              ),
              h.p([h.Class("mt-4 text-sm text-muted-foreground")], [body]),
            ]
          )
        )
      ),
    ]
  );

const ctaView = (h: ReturnType<typeof html<Message>>): Html =>
  h.section(
    [h.Class(`${containerClasses} py-16`)],
    [
      h.div(
        [
          h.Class(
            "rounded-2xl border border-border bg-primary p-8 text-primary-foreground"
          ),
        ],
        [
          h.div(
            [
              h.Class(
                "text-xs font-semibold uppercase tracking-wider opacity-80"
              ),
            ],
            ["ready to stream"]
          ),
          h.h2(
            [h.Class("mt-3 text-3xl font-semibold tracking-tight")],
            ["Ship a live trace panel today."]
          ),
          h.p(
            [h.Class("mt-3 max-w-2xl text-sm opacity-80")],
            [
              "Drop the layer into your Effect runtime. Wire the React hooks. Your users see exactly what your backend is doing - without the OpenTelemetry collector, without polling.",
            ]
          ),
          h.div(
            [h.Class("mt-6 flex flex-wrap gap-3")],
            [
              h.a(
                [
                  h.Href("#docs"),
                  h.Class(
                    "inline-flex h-9 items-center rounded-md bg-background px-4 text-sm font-medium text-foreground"
                  ),
                ],
                ["Read the docs"]
              ),
              h.a(
                [
                  h.Href("#npm"),
                  h.Class(
                    "inline-flex h-9 items-center rounded-md border border-primary-foreground/30 px-4 text-sm font-medium"
                  ),
                ],
                ["Install from npm"]
              ),
            ]
          ),
        ]
      ),
    ]
  );

const footerView = (h: ReturnType<typeof html<Message>>): Html =>
  h.footer(
    [h.Class("border-t border-border")],
    [
      h.div(
        [
          h.Class(
            `${containerClasses} flex flex-col gap-3 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between`
          ),
        ],
        [
          h.div([], ["livetrace · Effect spans for user-facing workflows"]),
          h.div(
            [h.Class("flex gap-4")],
            [
              h.a(
                [h.Href("#docs"), h.Class("hover:text-foreground")],
                ["docs"]
              ),
              h.a(
                [h.Href("#github"), h.Class("hover:text-foreground")],
                ["github"]
              ),
              h.a([h.Href("#npm"), h.Class("hover:text-foreground")], ["npm"]),
            ]
          ),
        ]
      ),
    ]
  );

const surfaceView = (h: ReturnType<typeof html<Message>>, model: Model): Html =>
  M.value(model.surface).pipe(
    M.withReturnType<Html>(),
    M.when("full-page", () =>
      h.div(
        [h.Class(shellClasses)],
        [
          navView(h),
          stageView(h, model),
          literateSectionView(h),
          howItFitsView(h),
          transportCardsView(h),
          ctaView(h),
          footerView(h),
        ]
      )
    ),
    M.when("stage-grid", () =>
      h.div([h.Class(`${shellClasses} p-6`)], [stageGridView(h, model)])
    ),
    M.when("literate", () =>
      h.div([h.Class(`${shellClasses} p-6`)], [literateCaptureView(h)])
    ),
    M.when("how-step", () =>
      h.div([h.Class(`${shellClasses} p-6`)], [howStepCaptureView(h, model)])
    ),
    M.when("agent-demo", () =>
      h.div(
        [h.Class(`${shellClasses} p-6`)],
        [agentDemoCaptureView(h, model)]
      )
    ),
    M.when("quickstart", () =>
      h.div([h.Class(`${shellClasses} p-6`)], [quickstartCaptureView(h)])
    ),
    M.when("stream", () =>
      h.div([h.Class(`${shellClasses} p-6`)], [streamView(h, model)])
    ),
    M.when("logs", () =>
      h.div([h.Class(`${shellClasses} p-6`)], [logConsoleView(h, model.mode)])
    ),
    M.when("activity", () =>
      h.div([h.Class(`${shellClasses} max-w-md p-6`)], [activityPanelView(h)])
    ),
    M.when("code", () =>
      h.div([h.Class(`${shellClasses} max-w-2xl p-6`)], [codePanelView(h)])
    ),
    M.when("transports", () =>
      h.div([h.Class(shellClasses)], [transportCardsView(h)])
    ),
    M.exhaustive
  );

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return surfaceView(h, model);
});
