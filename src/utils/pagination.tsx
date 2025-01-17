import { PAGE_SIZE, START_PAGE } from "@/types";

/**
 * Transfer pagination parameter by converting page size to a different key.
 *
 * @param {API.Params} params - The page size for pagination.
 * @param defaultCurrent - The defaultCurrent page number.
 * @param defaultPageSize - The default page size if pageSize is not provided.
 * @return {API.Params} Updated object with page size converted to 'page_size'.
 */
export function parseParams(params: API.Params, defaultCurrent = START_PAGE, defaultPageSize = PAGE_SIZE): API.Params {
  const { pageSize, ...restParams } = params;
  // Make sure pageSize is an integer
  const intPageSize = Number(pageSize); // Use Number to convert to number
  const effectivePageSize = intPageSize > 0 ? intPageSize : defaultPageSize;

  return {
    current: params.current ?? defaultCurrent,
    page_size: effectivePageSize,
    ...restParams,
  };
}
