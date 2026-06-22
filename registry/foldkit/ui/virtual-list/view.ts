import { Array, Match as M, Option, pipe } from "effect";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export type Activity = Readonly<{
  id: number;
  actor: string;
  initial: string;
  colorClass: string;
  verb: string;
  target: string;
  timeAgo: string;
  hasSummary: boolean;
}>;

export type ActivitySummary = Readonly<{
  title: string;
  body: string;
  artifact: string;
}>;

const actorNames = [
  "Sarah Chen",
  "Marcus Davies",
  "Priya Patel",
  "Alex Kim",
  "Jordan Lee",
  "Sam Rivera",
  "Ben Carter",
  "Mira Patel",
  "Lucy Hong",
  "Casey Park",
  "Robin Adams",
  "Tomas Reyes",
];

const actionVerbs = [
  "merged",
  "opened",
  "commented on",
  "approved",
  "closed",
  "reopened",
  "requested review on",
  "pushed to",
];

const colorClasses = [
  "bg-rose-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-teal-500",
  "bg-orange-500",
];

const branchNames = [
  "main",
  "feat/scroll-handlers",
  "fix/dialog-focus",
  "refactor/auth",
  "chore/deps",
];

const summaries: readonly ActivitySummary[] = [
  {
    title: "CI passing across all browsers",
    body: "Resolved the flake in the snapshot suite and confirmed the migration step runs idempotently against staging.",
    artifact: "ci/run-4892",
  },
  {
    title: "Tracking upstream change",
    body: "Linked the upstream regression and added reproduction context for the next reviewer.",
    artifact: "tracker/issue-218",
  },
  {
    title: "Release notes ready",
    body: "Bumped the patch version, regenerated the changelog, and queued the notes for editorial pass.",
    artifact: "release/v0.42.1",
  },
  {
    title: "Rollback plan coordinated",
    body: "Walked through the unwind steps with on-call and staged the revert PR.",
    artifact: "runbook/rollback",
  },
];

const cycle = (xs: readonly string[], index: number): string =>
  pipe(xs, Array.get(index % xs.length), Option.getOrThrow);

const formatTimeAgo = (hours: number): string => {
  if (hours < 1) {
    return `${Math.max(1, Math.round(hours * 60))}m ago`;
  }

  if (hours < 24) {
    return `${Math.round(hours)}h ago`;
  }

  const days = hours / 24;

  if (days < 30) {
    return `${Math.round(days)}d ago`;
  }

  const months = days / 30;

  if (months < 12) {
    return `${Math.round(months)}mo ago`;
  }

  return `${Math.round(months / 12)}y ago`;
};

const targetForVerb = (verb: string, index: number): string => {
  const number = ((index * 13) % 9999) + 1;

  return M.value(verb).pipe(
    M.withReturnType<string>(),
    M.when("pushed to", () => cycle(branchNames, index)),
    M.whenOr("opened", "closed", "reopened", () => `issue #${number}`),
    M.orElse(() => `PR #${number}`)
  );
};

export const activityRows = (count: number): readonly Activity[] =>
  Array.makeBy(count, (index) => {
    const actor = cycle(actorNames, index);
    const verb = cycle(actionVerbs, index);

    return {
      id: index,
      actor,
      initial: actor.charAt(0),
      colorClass: cycle(colorClasses, index),
      verb,
      target: targetForVerb(verb, index),
      timeAgo: formatTimeAgo(index * 2.3),
      hasSummary: index % 4 === 0,
    };
  });

export const activitySummaryFor = (index: number): ActivitySummary =>
  pipe(summaries, Array.get(index % summaries.length), Option.getOrThrow);

export const activityVariableRowHeightPx = (activity: Activity): number =>
  activity.hasSummary ? 112 : 56;

export const activityListContainerClasses =
  "h-80 w-full rounded-lg bg-white ring-1 ring-gray-200 overscroll-none";

export const activityListHeaderClasses =
  "flex items-end justify-between gap-4 text-sm text-gray-600";

export const virtualListActionClasses =
  "rounded bg-accent-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2";

const rowClasses =
  "grid grid-cols-[2rem_1fr_5rem] items-center gap-3 border-b border-gray-100 px-4";

const tallRowClasses =
  "grid grid-cols-[2rem_1fr_5rem] items-center gap-3 border-b border-gray-100 px-4 py-3";

const avatarClasses = (colorClass: string): string =>
  `${colorClass} flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white`;

const activityTextClasses = "truncate text-sm text-gray-700";
const actorClasses = "font-semibold text-gray-900";
const targetClasses = "font-mono text-gray-900";
const timeAgoClasses = "text-right text-xs text-gray-500 tabular-nums";
const summaryTitleClasses = "mt-0.5 text-xs font-semibold text-gray-700";
const summaryBodyClasses =
  "mt-0.5 truncate text-xs leading-tight text-gray-500";
const artifactClasses =
  "mt-1 inline-flex w-fit rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-600";

export const activityRow = (row: Activity): Html => {
  const h = html();

  return h.div(
    [h.Class(rowClasses)],
    [
      h.div([h.Class(avatarClasses(row.colorClass))], [row.initial]),
      h.div(
        [h.Class(activityTextClasses)],
        [
          h.span([h.Class(actorClasses)], [row.actor]),
          " ",
          row.verb,
          " ",
          h.span([h.Class(targetClasses)], [row.target]),
        ]
      ),
      h.div([h.Class(timeAgoClasses)], [row.timeAgo]),
    ]
  );
};

export const activityVariableRow = (
  row: Activity,
  summary: ActivitySummary
): Html => {
  const h = html();

  if (!row.hasSummary) {
    return activityRow(row);
  }

  return h.div(
    [h.Class(tallRowClasses)],
    [
      h.div([h.Class(avatarClasses(row.colorClass))], [row.initial]),
      h.div(
        [h.Class("min-w-0")],
        [
          h.div(
            [h.Class(activityTextClasses)],
            [
              h.span([h.Class(actorClasses)], [row.actor]),
              " ",
              row.verb,
              " ",
              h.span([h.Class(targetClasses)], [row.target]),
            ]
          ),
          h.div([h.Class(summaryTitleClasses)], [summary.title]),
          h.div([h.Class(summaryBodyClasses)], [summary.body]),
          h.div([h.Class(artifactClasses)], [summary.artifact]),
        ]
      ),
      h.div([h.Class(timeAgoClasses)], [row.timeAgo]),
    ]
  );
};
