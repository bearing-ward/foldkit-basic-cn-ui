import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as CheckboxGroup from "../../ui/base-ui-checkbox-group";

// MODEL

export const PermissionValue = S.Union([
  S.Literal("view-dashboard"),
  S.Literal("access-reports"),
  S.Literal("create-user"),
  S.Literal("edit-user"),
  S.Literal("delete-user"),
  S.Literal("assign-roles"),
]);
export type PermissionValue = typeof PermissionValue.Type;

const viewPermissionValues: readonly PermissionValue[] = [
  "view-dashboard",
  "access-reports",
];

const userPermissionValues: readonly PermissionValue[] = [
  "create-user",
  "edit-user",
  "delete-user",
  "assign-roles",
];

const allPermissionValues: readonly PermissionValue[] = [
  ...viewPermissionValues,
  ...userPermissionValues,
];

export const Model = S.Struct({
  selectedPermissions: S.Array(PermissionValue),
});

export type Model = typeof Model.Type;

// MESSAGE

export const ToggledPermission = m("ToggledPermission", {
  value: PermissionValue,
});
export const ToggledPermissionGroup = m("ToggledPermissionGroup", {
  values: S.Array(PermissionValue),
});

export const Message = S.Union([ToggledPermission, ToggledPermissionGroup]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ selectedPermissions: ["view-dashboard"] }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledPermission: ({ value }) => [
        evo(model, {
          selectedPermissions: (selectedPermissions) =>
            CheckboxGroup.toggleValue(selectedPermissions, value),
        }),
        [],
      ],
      ToggledPermissionGroup: ({ values }) => [
        evo(model, {
          selectedPermissions: (selectedPermissions) => {
            const state = CheckboxGroup.parentState(
              selectedPermissions,
              values
            );
            const withoutGroup = selectedPermissions.filter(
              (value) => !values.includes(value)
            );

            return state === "checked"
              ? withoutGroup
              : [...withoutGroup, ...values];
          },
        }),
        [],
      ],
    })
  );

const permissionItem = (
  label: string,
  value: PermissionValue,
  selectedPermissions: readonly PermissionValue[]
): Html =>
  CheckboxGroup.itemView<Message>({
    value,
    selectedValues: selectedPermissions,
    label,
    onValueChange: ToggledPermission({ value }),
  });

const permissionGroup = (
  label: string,
  values: readonly PermissionValue[],
  selectedPermissions: readonly PermissionValue[],
  children: readonly Html[]
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-2")],
    [
      CheckboxGroup.parentItemView<Message>({
        selectedValues: selectedPermissions,
        allValues: values,
        label,
        onValueChange: ToggledPermissionGroup({ values: [...values] }),
      }),
      h.div([h.Class("ml-6 space-y-2")], children),
    ]
  );
};

// VIEW

export const view = Submodel.defineView<Model, Message>(
  (model): Html =>
    CheckboxGroup.groupView<Message>({
      label: "User Permissions",
      labelId: "user-permissions-label",
      name: "permissions",
      children: [
        CheckboxGroup.parentItemView<Message>({
          selectedValues: model.selectedPermissions,
          allValues: allPermissionValues,
          label: "User Permissions",
          onValueChange: ToggledPermissionGroup({
            values: [...allPermissionValues],
          }),
        }),
        permissionItem(
          "View Dashboard",
          "view-dashboard",
          model.selectedPermissions
        ),
        permissionItem(
          "Access Reports",
          "access-reports",
          model.selectedPermissions
        ),
        permissionGroup(
          "Manage Users",
          userPermissionValues,
          model.selectedPermissions,
          [
            permissionItem(
              "Create User",
              "create-user",
              model.selectedPermissions
            ),
            permissionItem("Edit User", "edit-user", model.selectedPermissions),
            permissionItem(
              "Delete User",
              "delete-user",
              model.selectedPermissions
            ),
            permissionItem(
              "Assign Roles",
              "assign-roles",
              model.selectedPermissions
            ),
          ]
        ),
      ],
    })
);
