/**
 * Transforms frontend data table parameters into backend-compatible search parameters.
 * This function implements mutually exclusive logic for different pagination modes.
 *
 * - Converts `page` (0-indexed) to `page` (1-indexed).
 * - Converts `pageSize` to `page_size`.
 * - Converts `pagingMode` to `paging_mode`.
 * - Converts `pageToken` to `page_token`.
 *
 * @param params The frontend data table parameters.
 * @returns The backend-compatible search parameters with appropriate fields for the selected paging mode.
 */
export function transformListParams(params: API.DataTableParams): API.SearchParams {
  const { pageSize, pagingMode, pageToken, ...rest } = params;

  const backendParams: API.SearchParams = {
    ...rest,
    page: (params.page || 0) + 1,
    page_size: pageSize,
    paging_mode: pagingMode,
    page_token: pageToken === null ? undefined : pageToken,
  };

  // Apply mutually exclusive logic based on the paging mode.
  switch (backendParams.paging_mode) {
    case "cursor":
      // For cursor pagination, only page_token and page_size are needed.
      delete backendParams.page;
      break;
    case "none":
      // For no pagination, remove all pagination-related fields.
      delete backendParams.page;
      delete backendParams.page_size;
      delete backendParams.page_token;
      break;
    case "offset":
    default:
      // For offset pagination (or default case), only page and page_size are needed.
      delete backendParams.page_token;
      break;
  }

  return backendParams;
}
