import type {
  ActivityRowViewConfig,
  AgentStepCardViewConfig,
  CodeLineViewConfig,
  ExecutionStepViewConfig,
  LogLineViewConfig,
  TraceStepViewConfig,
} from "./index";

export const sampleLogLines: readonly LogLineViewConfig[] = [
  {
    timestamp: "17:10:22.019",
    level: "Info",
    source: "[parse]",
    message: "parsed 12 pages · 4 tables · 18,402 tokens",
  },
  {
    timestamp: "17:10:25.209",
    level: "Warning",
    source: "[embed]",
    message: "rate-limited · retrying in 240ms",
  },
  {
    timestamp: "17:11:09.111",
    level: "Error",
    source: "[chunk]",
    message: "invalid text extraction frame · retry budget exhausted",
  },
  {
    timestamp: "17:11:12.481",
    level: "Info",
    source: "[finalize]",
    message:
      "workflow complete · 32 chunks searchable · this long line should truncate inside the console without resizing the layout",
  },
];

export const completedParseStep: TraceStepViewConfig = {
  name: "Parse",
  meta: "12 / 12 · pages",
  duration: "2200ms",
  progress: 62,
  state: "Complete",
};

export const completedTraceSteps: readonly TraceStepViewConfig[] = [
  completedParseStep,
  {
    name: "Chunk",
    meta: "32 / 32 · chunks",
    duration: "1400ms",
    progress: 39,
    state: "Complete",
  },
  {
    name: "Embed",
    meta: "32 / 32 · embeddings",
    duration: "3600ms",
    progress: 100,
    state: "Complete",
  },
  {
    name: "Index",
    meta: "32 / 32 · upserts",
    duration: "1500ms",
    progress: 42,
    state: "Complete",
  },
  {
    name: "Finalize",
    meta: "effect.log closed",
    duration: "500ms",
    progress: 14,
    state: "Complete",
  },
];

export const runningTraceSteps: readonly TraceStepViewConfig[] = [
  completedParseStep,
  {
    name: "Chunk",
    meta: "18 / 32 · chunks",
    duration: "910ms",
    progress: 56,
    state: "Running",
  },
  {
    name: "Embed",
    meta: "0 / 32 · embeddings",
    duration: "pending",
    progress: 0,
    state: "Pending",
  },
];

export const failedTraceSteps: readonly TraceStepViewConfig[] = [
  completedParseStep,
  {
    name: "Chunk",
    meta: "6 / 32 · chunks",
    duration: "860ms",
    progress: 24,
    state: "Failed",
  },
  {
    name: "Embed",
    meta: "blocked",
    duration: "0ms",
    progress: 0,
    state: "Pending",
  },
];

export const sampleActivityRows: readonly ActivityRowViewConfig[] = [
  {
    documentName: "research-notes.md",
    duration: "9350ms",
    status: "Running",
  },
  {
    documentName: "report-q3.pdf",
    duration: "4700ms",
    status: "Completed",
  },
  {
    documentName: "contract-v2.pdf",
    duration: "1110ms",
    status: "Failed",
  },
];

export const sampleCodeLines: readonly CodeLineViewConfig[] = [
  { text: 'import { Effect } from "effect";', tone: "Keyword" },
  { text: 'import { withTrace, step } from "livetrace";', tone: "Keyword" },
  { text: "" },
  {
    text: "export const processDocument = (docId: string, pdf: Pdf) =>",
    tone: "Call",
  },
  { text: "Effect.gen(function* () {", indent: 2, tone: "Call" },
  {
    text: 'yield* Effect.annotateCurrentSpan({ "doc.id": docId });',
    indent: 4,
    tone: "String",
  },
  { text: 'yield* step("Parse")(', indent: 4, active: true, tone: "Call" },
  { text: "Effect.forEach(pdf.pages, (page) =>", indent: 6, tone: "Call" },
  { text: "parsePage(page).pipe(", indent: 8, tone: "Call" },
  {
    text: 'Effect.withSpan("parse.page", { attributes: { "parse.n": page.n } })',
    indent: 10,
    tone: "String",
  },
  { text: ")", indent: 8 },
  { text: ")", indent: 6 },
  { text: ");", indent: 4 },
  { text: "});", indent: 2 },
];

export const completedExecutionSteps: readonly ExecutionStepViewConfig[] = [
  {
    number: "1",
    name: "Parse",
    tag: "parse.page",
    value: "12 / 12 · pages",
    progress: 100,
    state: "Complete",
  },
  {
    number: "2",
    name: "Chunk",
    tag: "chunk.split",
    value: "32 / 32 · chunks",
    progress: 100,
    state: "Complete",
  },
  {
    number: "3",
    name: "Embed",
    tag: "embed.one",
    value: "6 / 6 · embeddings",
    progress: 100,
    state: "Complete",
  },
  {
    number: "4",
    name: "Index",
    tag: "index.upsert",
    value: "32 / 32 · upserts",
    progress: 100,
    state: "Complete",
  },
];

export const activeExecutionSteps: readonly ExecutionStepViewConfig[] = [
  {
    number: "1",
    name: "Parse",
    tag: "parse.page",
    value: "7 / 12 · pages",
    progress: 58,
    state: "Running",
  },
  {
    number: "2",
    name: "Chunk",
    tag: "chunk.split",
    value: "0 / 32 · chunks",
    progress: 0,
    state: "Pending",
  },
  {
    number: "3",
    name: "Embed",
    tag: "embed.one",
    value: "0 / 6 · embeddings",
    progress: 0,
    state: "Pending",
  },
];

export const sampleEmbeddings: readonly string[] = [
  '"Recruiting referrals - 38% of new hires this quarter came in through warm intros..."',
  '"Risks - deal slippage at the top of the enterprise funnel. Mitigation is active..."',
  '"Engineering shipped 14 new features this quarter, including token streaming..."',
];

export const sampleAgentSteps: readonly AgentStepCardViewConfig[] = [
  {
    name: "Plan",
    duration: "420ms",
    chips: ["gpt-5-mini", "in 96", "out 52", "$0.00018"],
    rows: ['decompose · "Where does customer health stand?"'],
  },
  {
    name: "Retrieve",
    duration: "1100ms",
    chips: ["namespace=docs", "k=18"],
    rows: [
      "0.338 Customer success - NRR ticked to 118%",
      "0.309 Customer health: 92% of accounts are green",
      "+13 more · sliding window",
    ],
  },
  {
    name: "Generate",
    duration: "2400ms",
    chips: ["claude-opus-4-7", "in 378", "out 67"],
    rows: ["first two weeks of November · NRR ticked to 118%"],
  },
];
