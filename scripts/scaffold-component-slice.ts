import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { NodeServices } from "@effect/platform-node";
import { Effect, Option } from "effect";
import { Argument, Command, Flag } from "effect/unstable/cli";

import {
  createScaffoldPlan,
  type ScaffoldFile,
  type ScaffoldPlan,
  type SliceOrigin,
  sliceOrigins,
} from "../src/componentSliceManifest";

type ParsedArgs = Readonly<{
  origin: SliceOrigin;
  name: string;
  primitiveName: string;
  writeMode: boolean;
  rootDir: string;
}>;

const defaultRootDir = path.resolve(import.meta.dirname, "..");

const optionalValue = <A>(maybeValue: Option.Option<A>): A | undefined =>
  Option.match(maybeValue, {
    onNone: () => undefined,
    onSome: (value) => value,
  });

const formatFileLine = (file: ScaffoldFile): string =>
  `- ${file.mode}: ${file.path} (${file.purpose})`;

const printPlan = (plan: ScaffoldPlan, writeMode: boolean): void => {
  console.log(
    writeMode
      ? "Component slice scaffold write plan"
      : "Component slice scaffold dry run"
  );
  console.log(`Origin: ${plan.manifest.origin}`);
  console.log(`Name: ${plan.manifest.name}`);
  console.log(`Artifact: ${plan.manifest.artifactType}`);

  if (plan.manifest.primitiveName !== "") {
    console.log(`Primitive: ${plan.manifest.primitiveName}`);
  }

  console.log("");
  console.log("Planned files:");
  console.log(plan.files.map(formatFileLine).join("\n"));
  console.log("");
  console.log("Checklist:");
  console.log(
    plan.manifest.checklistItems.map((item) => `- ${item}`).join("\n")
  );
  console.log("");
  console.log("Validation commands:");
  console.log(
    plan.validationCommands.map((command) => `- ${command}`).join("\n")
  );
  console.log("");
  console.log(plan.sceneTestGuidance);

  if (!writeMode) {
    console.log("");
    console.log(
      "Dry run only. Re-run with --write to create TODO skeleton files."
    );
  }
};

const pascalCase = (value: string): string =>
  value
    .split("-")
    .filter((part) => part !== "")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join("");

const flatName = (value: string): string => value.replace(/-/gu, "");

const writeFileIfMissing = async (
  rootDir: string,
  relativePath: string,
  content: string
) => {
  const absolutePath = path.join(rootDir, relativePath);

  await mkdir(path.dirname(absolutePath), { recursive: true });

  const current = await readFile(absolutePath, "utf-8").catch(() => undefined);

  if (current !== undefined) {
    throw new Error(`${relativePath} already exists.`);
  }

  await writeFile(absolutePath, content);
};

const skeletonFiles = (
  plan: ScaffoldPlan
): readonly Readonly<{
  path: string;
  content: string;
}>[] => {
  const name = plan.manifest.name;
  const componentName = pascalCase(name);
  const helperName = flatName(name);
  const basicExample = plan.manifest.examples[0] ?? `${name}-basic`;

  return [
    {
      path: `registry/default/ui/${name}/index.ts`,
      content: `export * from "./view";\n`,
    },
    {
      path: `registry/default/ui/${name}/view.ts`,
      content: `import type { Html } from "foldkit/html";\nimport { html } from "foldkit/html";\n\nexport const ${helperName}RootClassName = "rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-700";\n\nexport const view = <Message>(): Html => {\n  const h = html<Message>();\n\n  return h.div([h.Class(${helperName}RootClassName)], ["TODO: Replace ${componentName} scaffold content."]);\n};\n`,
    },
    {
      path: `registry/default/ui/${name}/${name}.scene.test.ts`,
      content: `import { Scene } from "foldkit";\nimport { describe, test } from "vitest";\n\nimport { view } from "./view";\n\ndescribe("${componentName}", () => {\n  test("renders the TODO scaffold", () => {\n    Scene.scene(view(), Scene.expect(Scene.text("TODO: Replace ${componentName} scaffold content.")).toExist());\n  });\n});\n`,
    },
    {
      path: `registry/default/examples/${basicExample}/main.ts`,
      content: `import { Match as M, Schema as S } from "effect";\nimport type { Command } from "foldkit";\nimport { Submodel } from "foldkit";\nimport type { Html } from "foldkit/html";\nimport { html } from "foldkit/html";\n\nimport * as ${componentName} from "../../ui/${name}";\n\nexport const Model = S.Struct({});\nexport type Model = typeof Model.Type;\n\nexport const Message = S.Never;\nexport type Message = typeof Message.Type;\n\nexport const init = (): readonly [Model, readonly Command.Command<Message>[]] => [{}, []];\n\nexport const update = (model: Model, message: Message): readonly [Model, readonly Command.Command<Message>[]] =>\n  M.value(message).pipe(M.exhaustive);\n\nexport const view = Submodel.defineView<Model, Message>((_model): Html => {\n  const h = html<Message>();\n\n  return h.div([h.Class("p-6")], [${componentName}.view<Message>()]);\n});\n`,
    },
    {
      path: `registry/default/examples/${basicExample}/entry.ts`,
      content: `import { Effect } from "effect";\nimport { Runtime } from "foldkit";\n\nimport * as Main from "./main";\n\nconst program = Runtime.makeProgram({ init: Main.init, update: Main.update, view: Main.view });\n\nRuntime.run(program, {\n  flags: Effect.succeed({}),\n  rootId: "app",\n});\n`,
    },
    {
      path: `registry/default/examples/${basicExample}/index.html`,
      content: `<div id="app"></div>\n<script type="module" src="./entry.ts"></script>\n`,
    },
    {
      path: `registry/default/examples/${basicExample}/${basicExample}.scene.test.ts`,
      content: `import { Scene } from "foldkit";\nimport { describe, test } from "vitest";\n\nimport * as Main from "./main";\n\ndescribe("${componentName} basic example", () => {\n  test("renders the TODO scaffold", () => {\n    Scene.scene(Main.view({}), Scene.expect(Scene.text("TODO: Replace ${componentName} scaffold content.")).toExist());\n  });\n});\n`,
    },
  ];
};

const writeSkeleton = async (
  rootDir: string,
  plan: ScaffoldPlan
): Promise<void> => {
  await Promise.all(
    skeletonFiles(plan).map((file) =>
      writeFileIfMissing(rootDir, file.path, file.content)
    )
  );
};

const cliConfig = {
  originFlag: Flag.choice("origin", sliceOrigins).pipe(
    Flag.optional,
    Flag.withDescription("Source design system for the component slice.")
  ),
  nameFlag: Flag.string("name").pipe(
    Flag.optional,
    Flag.withDescription("Component slice name.")
  ),
  primitiveName: Flag.string("primitive").pipe(
    Flag.withDefault(""),
    Flag.withDescription("Upstream primitive or component name.")
  ),
  writeMode: Flag.boolean("write").pipe(
    Flag.withDescription("Create TODO skeleton files instead of dry-running.")
  ),
  rootDir: Flag.directory("root", { mustExist: true }).pipe(
    Flag.withDefault(defaultRootDir),
    Flag.withDescription("Project root where write mode creates files.")
  ),
  originArgument: Argument.choice("origin", sliceOrigins).pipe(
    Argument.optional,
    Argument.withDescription("Optional positional source design system.")
  ),
  nameArgument: Argument.string("name").pipe(
    Argument.optional,
    Argument.withDescription("Optional positional component slice name.")
  ),
};

type CliConfig = Command.Command.Config.Infer<typeof cliConfig>;

const resolveCliConfig = (config: CliConfig): ParsedArgs => ({
  origin:
    optionalValue(config.originFlag) ??
    optionalValue(config.originArgument) ??
    "foldkit",
  name:
    optionalValue(config.nameFlag) ?? optionalValue(config.nameArgument) ?? "",
  primitiveName: config.primitiveName,
  writeMode: config.writeMode,
  rootDir: config.rootDir,
});

export const scaffoldCommand = Command.make(
  "scaffold-component-slice",
  cliConfig,
  (config) =>
    Effect.gen(function* () {
      const args = resolveCliConfig(config);
      const plan = createScaffoldPlan({
        origin: args.origin,
        name: args.name,
        primitiveName: args.primitiveName,
      });

      yield* Effect.sync(() => printPlan(plan, args.writeMode));

      if (args.writeMode) {
        yield* Effect.promise(() => writeSkeleton(args.rootDir, plan));
      }
    })
).pipe(
  Command.withDescription(
    "Plan or create TODO skeleton files for a new Foldkit CN component slice."
  ),
  Command.withExamples([
    {
      command: "scaffold-component-slice --origin shadcn --name command-menu",
      description: "Print the default dry-run plan.",
    },
    {
      command:
        "scaffold-component-slice --origin base-ui --name dialog --primitive Dialog --write",
      description: "Create TODO skeleton files for review.",
    },
  ])
);

export const runScaffoldCli = (args: ReadonlyArray<string>) =>
  Command.runWith(scaffoldCommand, { version: "0.1.0" })(args);

if (import.meta.main) {
  Effect.runPromise(
    runScaffoldCli(process.argv.slice(2)).pipe(
      Effect.provide(NodeServices.layer)
    )
  ).catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  });
}
