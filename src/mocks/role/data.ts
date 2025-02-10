export const statuses = ["default", "active", "frozen", "invited", "suspended"];
export const callTypes = new Map<number, string>([
  [0, "bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10"],
  [1, "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  [2, "bg-neutral-300/40 border-neutral-300"],
  // ["invited", "bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300"],
]);
