import { Match as M, Number } from "effect";

export const dropZoneClassName =
  "flex min-h-44 w-full cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition-colors hover:border-accent-400 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[drag-over]:border-accent-600 data-[drag-over]:bg-accent-50";

export const primaryTextClassName = "text-sm font-semibold text-gray-950";

export const secondaryTextClassName = "text-sm text-gray-600";

export const fileInputClassName = "max-w-full text-sm";

export const fileListClassName = "space-y-2";

export const fileRowClassName =
  "flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-white px-3 py-2";

export const fileNameClassName = "truncate text-sm font-medium text-gray-900";

export const fileSizeClassName = "text-xs text-gray-500";

const BYTES_PER_KB = 1024;
const BYTES_PER_MB = BYTES_PER_KB * BYTES_PER_KB;

export const formatFileSize = (bytes: number): string =>
  M.value(bytes).pipe(
    M.when(Number.isLessThan(BYTES_PER_KB), () => `${bytes} B`),
    M.when(
      Number.isLessThan(BYTES_PER_MB),
      () => `${(bytes / BYTES_PER_KB).toFixed(1)} KB`
    ),
    M.orElse(() => `${(bytes / BYTES_PER_MB).toFixed(1)} MB`)
  );
