import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AvatarBasicExample from "../registry/base-ui/examples/avatar-basic/main";
import * as BaseUiAvatarBasicExample from "../registry/base-ui/examples/base-ui-avatar-basic/main";
import * as ShadcnAvatarBadgeIconExample from "../registry/shadcn/examples/shadcn-avatar-badge-icon/main";
import * as ShadcnAvatarBadgeExample from "../registry/shadcn/examples/shadcn-avatar-badge/main";
import * as ShadcnAvatarBasicExample from "../registry/shadcn/examples/shadcn-avatar-basic/main";
import * as ShadcnAvatarDropdownExample from "../registry/shadcn/examples/shadcn-avatar-dropdown/main";
import * as ShadcnAvatarGroupCountExample from "../registry/shadcn/examples/shadcn-avatar-group-count/main";
import * as ShadcnAvatarGroupIconExample from "../registry/shadcn/examples/shadcn-avatar-group-icon/main";
import * as ShadcnAvatarGroupExample from "../registry/shadcn/examples/shadcn-avatar-group/main";
import * as ShadcnAvatarSizesExample from "../registry/shadcn/examples/shadcn-avatar-sizes/main";
import * as Main from "./main";

type Message = Main.Message;

export const avatarBasicExamplePreview = (
  model: AvatarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AvatarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotAvatarBasicExampleMessage({ message }),
  });
};

export const baseUiAvatarBasicExamplePreview = (
  model: BaseUiAvatarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiAvatarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiAvatarBasicExampleMessage({ message }),
  });
};

export const shadcnAvatarBasicExamplePreview = (
  model: ShadcnAvatarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAvatarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAvatarBasicExampleMessage({ message }),
  });
};

export const shadcnAvatarBadgeExamplePreview = (): Html =>
  ShadcnAvatarBadgeExample.view(ShadcnAvatarBadgeExample.init()[0]);

export const shadcnAvatarBadgeIconExamplePreview = (): Html =>
  ShadcnAvatarBadgeIconExample.view(ShadcnAvatarBadgeIconExample.init()[0]);

export const shadcnAvatarGroupExamplePreview = (): Html =>
  ShadcnAvatarGroupExample.view(ShadcnAvatarGroupExample.init()[0]);

export const shadcnAvatarGroupCountExamplePreview = (): Html =>
  ShadcnAvatarGroupCountExample.view(ShadcnAvatarGroupCountExample.init()[0]);

export const shadcnAvatarGroupIconExamplePreview = (): Html =>
  ShadcnAvatarGroupIconExample.view(ShadcnAvatarGroupIconExample.init()[0]);

export const shadcnAvatarSizesExamplePreview = (): Html =>
  ShadcnAvatarSizesExample.view(ShadcnAvatarSizesExample.init()[0]);

export const shadcnAvatarDropdownExamplePreview = (
  model: ShadcnAvatarDropdownExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAvatarDropdownExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAvatarDropdownExampleMessage({ message }),
  });
};
