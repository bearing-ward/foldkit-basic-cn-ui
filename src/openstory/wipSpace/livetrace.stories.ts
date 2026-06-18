import type { Meta, StoryObj } from "openstory/foldkit";

import * as LiveTraceCapture from "./livetrace/main";

const meta = {
  title: "wipSpace/LiveTrace",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullPage: Story = {
  name: "Full Page",
  render: () => LiveTraceCapture,
};

export const FirstComponents: Story = {
  name: "First Components",
  render: () => ({
    ...LiveTraceCapture,
    init: LiveTraceCapture.initStageGrid,
  }),
};

export const NextComponent: Story = {
  name: "Next Component",
  render: () => ({
    ...LiveTraceCapture,
    init: LiveTraceCapture.initLiterate,
  }),
};

export const Another: Story = {
  name: "Another",
  render: () => ({
    ...LiveTraceCapture,
    init: LiveTraceCapture.initHowStep,
  }),
};

export const DocsFeatureBreak: Story = {
  name: "Docs Feature Break",
  render: () => ({
    ...LiveTraceCapture,
    init: LiveTraceCapture.initAgentDemo,
  }),
};

export const Quickstart: Story = {
  name: "Quickstart",
  render: () => ({
    ...LiveTraceCapture,
    init: LiveTraceCapture.initQuickstart,
  }),
};

export const TraceStreamModes: Story = {
  name: "Trace Stream Modes",
  render: () => ({
    ...LiveTraceCapture,
    init: LiveTraceCapture.initStream,
  }),
};

export const LogConsole: Story = {
  name: "Log Console",
  render: () => ({
    ...LiveTraceCapture,
    init: LiveTraceCapture.initLogs,
  }),
};

export const ActivityPanel: Story = {
  name: "Activity Panel",
  render: () => ({
    ...LiveTraceCapture,
    init: LiveTraceCapture.initActivity,
  }),
};

export const CodePanel: Story = {
  name: "Code Panel",
  render: () => ({
    ...LiveTraceCapture,
    init: LiveTraceCapture.initCode,
  }),
};

export const TransportCards: Story = {
  name: "Transport Cards",
  render: () => ({
    ...LiveTraceCapture,
    init: LiveTraceCapture.initTransports,
  }),
};
