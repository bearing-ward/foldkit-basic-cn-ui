import fs from "node:fs";

const scorecardPath = "docs/product/project-invariants-scorecard.md";
const scorecard = fs.readFileSync(scorecardPath, "utf-8");

const requiredIds = [
  "P1_SOURCE_OWNERSHIP",
  "P2_FOLDKIT_ARCHITECTURE",
  "P3_ORIGIN_IDENTITY",
  "P4_SOURCE_PARITY",
  "P5_EXAMPLE_PARITY",
  "P6_VISUAL_PARITY",
  "P7_ACCESSIBILITY",
  "P8_DOC_REFERENCE",
  "P9_GENERATED_ARTIFACTS",
  "P10_ORIGIN_API_PARITY",
  "P11_PROGRESS_LEDGER",
  "P12_INVARIANT_GOVERNANCE",
  "P13_COMPONENT_LOCAL_CONFIG",
];

const catalogHeader = [
  "ID",
  "Name",
  "Lifecycle",
  "Scope",
  "Standard",
  "Requirements for new work",
  "Owner document",
  "Priority",
  "Target grade",
];

const baselineHeader = [
  "ID",
  "Status",
  "Current grade",
  "Gap to target",
  "Evidence available",
  "Evidence verified this pass",
  "Known gaps",
  "Next action",
  "Last reviewed",
];

const allowedLifecycles = new Set(["ACTIVE", "DEPRECATED", "RETIRED"]);
const allowedStatuses = new Set([
  "PASS",
  "PARTIAL",
  "PENDING",
  "BLOCKED",
  "UNKNOWN",
]);

const failures = [];

const cellText = (value) => value.trim().replace(/^`|`$/g, "");

const parseTable = (requiredHeader) => {
  const lines = scorecard.split("\n");
  const headerLine = `| ${requiredHeader.join(" | ")} |`;
  const startIndex = lines.findIndex((line) => line.trim() === headerLine);

  if (startIndex === -1) {
    failures.push(`Missing table header: ${headerLine}`);
    return [];
  }

  const separator = lines[startIndex + 1]?.trim();
  if (separator === undefined || !/^\|(?:\s*:?-{3,}:?\s*\|)+$/.test(separator)) {
    failures.push(`Missing separator after table header: ${headerLine}`);
    return [];
  }

  const rows = [];
  for (const line of lines.slice(startIndex + 2)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|")) {
      break;
    }

    const cells = trimmed.slice(1, -1).split("|").map(cellText);
    if (cells.length !== requiredHeader.length) {
      failures.push(
        `Table ${headerLine} row has ${cells.length} columns instead of ${requiredHeader.length}: ${trimmed}`
      );
      continue;
    }

    rows.push(Object.fromEntries(requiredHeader.map((key, index) => [key, cells[index]])));
  }

  return rows;
};

const gradeValue = (value, label) => {
  if (!/^[0-5]$/.test(value)) {
    failures.push(`${label} grade must be a number from 0 to 5: ${value}`);
    return undefined;
  }

  return Number.parseInt(value, 10);
};

const assertExactIds = (rows, tableName) => {
  for (const id of requiredIds) {
    const count = rows.filter((row) => row.ID === id).length;
    if (count !== 1) {
      failures.push(`${tableName} must contain ${id} exactly once; found ${count}`);
    }
  }

  for (const row of rows) {
    if (!requiredIds.includes(row.ID)) {
      failures.push(`${tableName} contains unexpected invariant ID: ${row.ID}`);
    }
  }
};

const catalogRows = parseTable(catalogHeader);
const baselineRows = parseTable(baselineHeader);

assertExactIds(catalogRows, "Invariant catalog");
assertExactIds(baselineRows, "Current baseline");

const targetGradeById = new Map();

for (const row of catalogRows) {
  if (!allowedLifecycles.has(row.Lifecycle)) {
    failures.push(`${row.ID} has invalid lifecycle: ${row.Lifecycle}`);
  }

  const targetGrade = gradeValue(row["Target grade"], `${row.ID} target`);
  if (targetGrade !== undefined) {
    targetGradeById.set(row.ID, targetGrade);
  }
}

for (const row of baselineRows) {
  if (!allowedStatuses.has(row.Status)) {
    failures.push(`${row.ID} has invalid status: ${row.Status}`);
  }

  const currentGrade = gradeValue(row["Current grade"], `${row.ID} current`);
  const targetGrade = targetGradeById.get(row.ID);

  if (currentGrade === undefined || targetGrade === undefined) {
    continue;
  }

  if (row.Status === "PASS" && currentGrade < targetGrade) {
    failures.push(`${row.ID} cannot PASS with current grade below target`);
  }

  if (row.Status === "PASS" && !row["Gap to target"].startsWith("0")) {
    failures.push(`${row.ID} cannot PASS unless Gap to target starts with 0`);
  }

  const catalogRow = catalogRows.find((catalog) => catalog.ID === row.ID);
  if (catalogRow?.Lifecycle === "RETIRED" && row.Status === "PASS") {
    failures.push(`${row.ID} cannot be RETIRED and PASS`);
  }

  if (row.Status === "UNKNOWN" && currentGrade >= 4) {
    failures.push(`${row.ID} cannot be UNKNOWN with current grade 4 or 5`);
  }

  if (row.Status === "PENDING" && row["Next action"].trim().length === 0) {
    failures.push(`${row.ID} cannot be PENDING without a next action`);
  }

  if (row["Gap to target"].startsWith("0") && currentGrade < targetGrade) {
    failures.push(`${row.ID} gap starts with 0 while current grade is below target`);
  }
}

for (const requiredReference of [
  "docs/product/component-entry-contract.md",
  "plans/README.md",
]) {
  if (!scorecard.includes(requiredReference)) {
    failures.push(`${scorecardPath} must reference ${requiredReference}`);
  }
}

if (failures.length > 0) {
  console.error("Project invariants scorecard check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Project invariants scorecard: ${requiredIds.length} invariants with valid catalog and baseline structure`
);
