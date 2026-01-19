import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

/**
 * NOTE: This is an internal type definition file for the template's components.
 * As a user of the template, you should not need to interact with this file.
 */

export interface PageConfig {
  title: string;
  description: string;
}

/**
 * Defines the contract for API hooks, strictly following the project's conventions.
 */
export interface ApiHooks<TData, TFormValues> {
  /**
   * The query hook for fetching paginated data.
   */
  useQuery: (
    params: API.DataTableParams,
    options: { enabled: boolean },
  ) => UseQueryResult<{ items: TData[]; total: number }>;

  /**
   * (Optional) The query hook for fetching a single item.
   */
  useItemQuery?: (id: string) => UseQueryResult<TData | undefined>;

  /** The hook for creating a new item. */
  useCreate: () => UseMutationResult<unknown, Error, TFormValues, unknown>;

  /** The hook for updating an existing item. */
  useUpdate: () => UseMutationResult<unknown, Error, TFormValues & { id: string }, unknown>;

  /** The hook for deleting an item. */
  useDelete: () => UseMutationResult<unknown, Error, string, unknown>;
}
