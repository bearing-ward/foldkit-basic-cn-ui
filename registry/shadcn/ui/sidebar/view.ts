export const sidebarProviderClasses =
  "group/sidebar-wrapper flex min-h-80 w-full overflow-hidden rounded-lg border border-sidebar-border bg-white text-sidebar-foreground [--sidebar-width:16rem] [--sidebar-width-icon:3rem] has-data-[variant=inset]:bg-sidebar";

export const sidebarClasses =
  "group peer hidden shrink-0 text-sidebar-foreground md:block data-[collapsible=icon]:data-[state=collapsed]:w-[--sidebar-width-icon] data-[collapsible=none]:block data-[state=expanded]:w-[--sidebar-width] data-[variant=floating]:m-2 data-[variant=floating]:rounded-lg data-[variant=floating]:border data-[variant=floating]:border-sidebar-border data-[variant=floating]:shadow-sm data-[variant=inset]:rounded-r-xl";

export const sidebarGapClasses =
  "relative hidden w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear md:block data-[collapsible=icon]:w-[--sidebar-width-icon] data-[collapsible=offcanvas]:w-0 data-[variant=floating]:data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)] data-[variant=inset]:data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]";

export const sidebarContainerClasses =
  "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear data-[collapsible=icon]:w-[--sidebar-width-icon] data-[collapsible=offcanvas]:w-0 data-[side=left]:border-r data-[side=right]:border-l data-[side=left]:border-sidebar-border data-[side=right]:border-sidebar-border data-[variant=floating]:rounded-lg data-[variant=floating]:border data-[variant=floating]:border-sidebar-border data-[variant=floating]:shadow-sm data-[variant=inset]:rounded-xl";

export const sidebarInnerClasses = "flex size-full min-w-0 flex-col";

export const sidebarTriggerClasses =
  "inline-flex size-8 items-center justify-center rounded-md text-sm font-medium text-sidebar-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring";

export const sidebarHeaderClasses =
  "flex flex-col gap-2 p-2";

export const sidebarInputClasses =
  "h-8 w-full rounded-md border border-sidebar-border bg-white px-2 text-sm text-sidebar-foreground outline-none transition placeholder:text-muted-foreground focus:border-sidebar-ring focus:ring-2 focus:ring-sidebar-ring/20";

export const sidebarContentClasses =
  "flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2 data-[collapsible=icon]:overflow-hidden";

export const sidebarSeparatorClasses = "mx-2 h-px bg-sidebar-border";

export const sidebarFooterClasses =
  "flex flex-col gap-2 p-2 text-xs text-muted-foreground";

export const sidebarGroupClasses =
  "relative flex w-full min-w-0 flex-col gap-1 p-2";

export const sidebarGroupLabelClasses =
  "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground outline-none data-[state=collapsed]:sr-only";

export const sidebarGroupActionClasses =
  "absolute right-3 top-3 inline-flex size-5 items-center justify-center rounded-md text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[state=collapsed]:hidden";

export const sidebarGroupContentClasses = "w-full";

export const sidebarMenuClasses = "flex w-full min-w-0 flex-col gap-1";

export const sidebarMenuItemClasses = "group/menu-item relative list-none";

export const sidebarMenuButtonClasses =
  "peer/menu-button flex h-8 w-full min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-left text-sm text-sidebar-foreground outline-none transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[size=lg]:h-12 data-[size=lg]:px-2.5 data-[size=sm]:h-7 data-[variant=outline]:border data-[variant=outline]:border-sidebar-border data-[variant=outline]:bg-white data-[state=collapsed]:justify-center";

export const sidebarIconClasses =
  "flex size-4 shrink-0 items-center justify-center text-sidebar-foreground/80 data-[brand=true]:size-8 data-[brand=true]:rounded-lg data-[brand=true]:bg-sidebar-primary data-[brand=true]:text-sidebar-primary-foreground";

export const sidebarLabelClasses =
  "min-w-0 truncate data-[state=collapsed]:sr-only";

export const sidebarMenuActionClasses =
  "absolute right-1 top-1.5 ml-auto inline-flex size-5 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[show-on-hover=true]:opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=collapsed]:hidden";

export const sidebarMenuBadgeClasses =
  "pointer-events-none ml-auto flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs tabular-nums text-muted-foreground data-[state=collapsed]:hidden";

export const sidebarMenuSubClasses =
  "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 data-[state=collapsed]:hidden";

export const sidebarMenuSubItemClasses = "list-none";

export const sidebarMenuSubButtonClasses =
  "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sm text-sidebar-foreground/80 outline-none transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground";

export const sidebarMenuSkeletonClasses =
  "flex h-9 items-center gap-3 rounded-md px-2";

export const sidebarMenuSkeletonIconClasses =
  "size-6 shrink-0 rounded-md bg-gray-200";

export const sidebarMenuSkeletonTextClasses =
  "h-4 flex-1 rounded bg-gray-200 data-[state=collapsed]:hidden";

export const sidebarInsetClasses =
  "relative flex min-w-0 flex-1 flex-col overflow-auto bg-white";

export const sidebarRailClasses =
  "absolute inset-y-0 z-20 hidden w-4 cursor-w-resize transition-all after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-sidebar-border hover:after:bg-sidebar-ring data-[side=left]:-right-4 data-[side=right]:left-0 sm:flex";
