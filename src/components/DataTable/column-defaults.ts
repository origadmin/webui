import { cn } from "@/lib/utils";

/**
 * The base class names for a default table header.
 */
const defaultHeaderClassName = cn(
  "p-2 drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
  "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
  "whitespace-nowrap sticky md:table-cell",
);

/**
 * A helper function to generate the `meta` object for a column definition.
 * It merges the default header styles with any custom class names.
 *
 * @param customClassName - Optional custom class names to merge with the default styles.
 * @returns The `meta` object for a column definition.
 */
export const headerMeta = (customClassName?: string) => {
  return {
    meta: {
      className: cn(defaultHeaderClassName, customClassName),
    },
  };
};
