import type { ReactNode } from "react";

type SafeDataRendererProps<T> = {
  data: T[];
  fallbackData: T[];
  children: (rows: T[]) => ReactNode;
};

export function SafeDataRenderer<T>({ data, fallbackData, children }: SafeDataRendererProps<T>) {
  const rows = data.length > 0 ? data : fallbackData;
  return <>{children(rows)}</>;
}
