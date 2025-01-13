/* eslint-disable */
// @ts-ignore

/**
 * Transfer pagination parameter by converting page size to a different key.
 *
 * @param {API.Params} params - The page size for pagination.
 * @return {API.Params} Updated object with page size converted to 'page_size'.
 */
export function parseParams(params: API.Params): API.Params {
  const { pageSize, ...restParams } = params;
  // Make sure pageSize is an integer
  const intPageSize = Number(pageSize); // Use Number to convert to number
  const effectivePageSize = intPageSize === 0 ? 15 : intPageSize;

  return {
    current: params.current ?? 1,
    page_size: effectivePageSize,
    ...restParams,
  };
}
