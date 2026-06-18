import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as LiveTrace from "./index";
import {
  activeExecutionSteps,
  completedExecutionSteps,
  completedTraceSteps,
  sampleActivityRows,
  sampleCodeLines,
  sampleEmbeddings,
  sampleLogLines,
} from "./sample-data";

const update = (model: undefined): readonly [undefined, []] => [model, []];

const statusView = (): Html => {
  const h = html<never>();

  return h.div(
    [],
    [
      LiveTrace.statusBadgeView({ status: "Completed" }),
      LiveTrace.statusBadgeView({ status: "Running" }),
      LiveTrace.statusBadgeView({ status: "Failed" }),
      LiveTrace.statusBadgeView({ status: "Concurrent" }),
    ]
  );
};

const progressView = (): Html => {
  const h = html<never>();

  return h.div(
    [],
    [
      LiveTrace.progressTrackView({ value: 0 }),
      LiveTrace.progressTrackView({ value: 42 }),
      LiveTrace.progressTrackView({ value: 100 }),
    ]
  );
};

const markerView = (): Html => {
  const h = html<never>();

  return h.div(
    [],
    [
      LiveTrace.stepMarkerView({ state: "Complete" }),
      LiveTrace.stepMarkerView({ state: "Running" }),
      LiveTrace.stepMarkerView({ state: "Pending", label: "pending" }),
      LiveTrace.stepMarkerView({ state: "Failed" }),
    ]
  );
};

const logView = (): Html => {
  const h = html<never>();

  return h.div([], sampleLogLines.map(LiveTrace.logLineView));
};

const composedView = (): Html => {
  const h = html<never>();

  return h.div(
    [],
    [
      LiveTrace.traceCardView({
        title: "Processing report-q3.pdf",
        traceId: "doc:report-q3.pdf:1781731499937-324",
        elapsed: "9350ms",
        status: "Completed",
        steps: completedTraceSteps,
        logLines: sampleLogLines,
      }),
      LiveTrace.activityPanelView({
        rows: sampleActivityRows,
        eventsPerSecond: "16.8",
      }),
      LiveTrace.codePanelView({
        path: "src/process.ts",
        lineLabel: "line 51",
        lines: sampleCodeLines,
      }),
      LiveTrace.executionPanelView({
        documentName: "report-q3.pdf",
        documentMeta: "12 pages · 18,402 tokens",
        badgeLabel: "complete",
        steps: completedExecutionSteps,
        embeddings: sampleEmbeddings,
      }),
      LiveTrace.executionPanelView({
        documentName: "report-q3.pdf",
        documentMeta: "12 pages · 18,402 tokens",
        badgeLabel: "parse...",
        steps: activeExecutionSteps,
      }),
    ]
  );
};

describe("Foldkit LiveTrace registry views", () => {
  test("renders status badges with stable status attributes", () => {
    Scene.scene(
      { update, view: statusView },
      Scene.with(undefined),
      Scene.expect(Scene.text("completed")).toHaveAttr(
        "data-status",
        "Completed"
      ),
      Scene.expect(Scene.text("running")).toHaveAttr("data-status", "Running"),
      Scene.expect(Scene.text("failed")).toHaveAttr("data-status", "Failed"),
      Scene.expect(Scene.text("3x concurrent")).toHaveAttr(
        "data-status",
        "Concurrent"
      )
    );
  });

  test("renders progress values as accessible progressbars", () => {
    Scene.scene(
      { update, view: progressView },
      Scene.with(undefined),
      Scene.expect(Scene.role("progressbar", { name: "0%" })).toHaveAttr(
        "data-progress",
        "0"
      ),
      Scene.expect(Scene.role("progressbar", { name: "42%" })).toHaveAttr(
        "data-progress",
        "42"
      ),
      Scene.expect(Scene.role("progressbar", { name: "100%" })).toHaveAttr(
        "data-progress",
        "100"
      )
    );
  });

  test("renders step marker states", () => {
    Scene.scene(
      { update, view: markerView },
      Scene.with(undefined),
      Scene.expect(Scene.text("✓")).toHaveAttr("data-state", "Complete"),
      Scene.expect(Scene.text("●")).toHaveAttr("data-state", "Running"),
      Scene.expect(Scene.text("pending")).toHaveAttr("data-state", "Pending"),
      Scene.expect(Scene.text("!")).toHaveAttr("data-state", "Failed")
    );
  });

  test("renders log line levels and details", () => {
    Scene.scene(
      { update, view: logView },
      Scene.with(undefined),
      Scene.expect(Scene.text("INFO")).toExist(),
      Scene.expect(Scene.text("WARNING")).toExist(),
      Scene.expect(Scene.text("ERROR")).toExist(),
      Scene.expect(Scene.text("17:10:22.019")).toExist(),
      Scene.expect(Scene.text("[parse]")).toExist(),
      Scene.expect(
        Scene.text("invalid text extraction frame · retry budget exhausted")
      ).toExist()
    );
  });

  test("composes trace, activity, code, and execution panels", () => {
    Scene.scene(
      { update, view: composedView },
      Scene.with(undefined),
      Scene.expect(Scene.text("Processing report-q3.pdf")).toExist(),
      Scene.expect(Scene.text("Effect.log -> SpanEvent stream")).toExist(),
      Scene.expect(Scene.text("events/sec")).toExist(),
      Scene.expect(Scene.text("16.8")).toExist(),
      Scene.expect(Scene.text("src/process.ts")).toExist(),
      Scene.expect(Scene.text("line 51")).toExist(),
      Scene.expect(Scene.text("report-q3.pdf")).toExist(),
      Scene.expect(Scene.text("parse...")).toExist(),
      Scene.expect(Scene.role("progressbar", { name: "58%" })).toHaveAttr(
        "data-progress",
        "58"
      )
    );
  });
});
