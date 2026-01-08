/**
 * Transforms frontend data table parameters into backend-compatible search parameters.
 * - Converts `page` (0-indexed) to `page` (1-indexed).
 * - Converts `pageSize` to `page_size`.
 * - Removes pagination fields if `no_paging` is true.
 * @param params The frontend data table parameters.
 * @returns The backend-compatible search parameters.
 */
export function transformListParams(params: API.DataTableParams): API.SearchParams {
  const { pageSize, ...rest } = params;
  const backendParams: API.SearchParams = {
    ...rest,
    page: (params.page || 0) + 1,
    page_size: pageSize,
  };

  if (backendParams.no_paging) {
    delete backendParams.page;
    delete backendParams.page_size;
  }

  return backendParams;
}
