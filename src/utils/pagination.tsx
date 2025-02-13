import { PAGE_SIZE, START_PAGE } from "@/types";
import GlobalConfig from "@config";
import { PaginationState, SortingState } from "@tanstack/react-table";


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

export function parseState(
  state?: PaginationState,
  defaultCurrent = START_PAGE,
  defaultPageSize = PAGE_SIZE,
): API.Params {
  const { pageIndex = defaultCurrent, pageSize = defaultPageSize } = state ?? {};
  return {
    current: pageIndex,
    page_size: pageSize,
  };
}

export function searchParamsToSortingState(searchParams: URLSearchParams): SortingState {
  const { key = "sort_by", delimiter = ",", contact = "." } = GlobalConfig.api?.searchOptions?.sort ?? {};
  const sort = searchParams.get(key);
  if (sort === null) {
    return [];
  }
  return sort.split(delimiter).map((sort) => {
    const [id, desc] = sort.split(contact);
    return { id, desc: desc === "desc" };
  });
}

export function getSortingState(searchParams: URLSearchParams): SortingState {
  const { key, delimiter, contact } = GlobalConfig.api?.searchOptions?.sort || {
    key: "sort_by",
    delimiter: ",",
    contact: ".",
  };
  if (!searchParams.has(key)) {
    return [];
  }
  const sort = searchParams.get(key);
  if (sort === null) {
    return [];
  }
  return sort.split(delimiter).map((sort) => {
    const [id, desc] = sort.split(contact);
    return { id, desc: desc === "desc" };
  });
}

export function getPaginationState(searchParams: URLSearchParams): PaginationState {
  const { key, pageSizeKey, defaultPageSize, defaultCurrent } = GlobalConfig.api?.searchOptions?.pagination || {
    key: "current",
    pageSizeKey: "page_size",
    defaultPageSize: PAGE_SIZE,
    defaultCurrent: START_PAGE,
  };

  const current = searchParams.has("current") ? Number(searchParams.get(key)) - 1 : defaultCurrent;
  const pageSize = searchParams.has(pageSizeKey) ? Number(searchParams.get(pageSizeKey)) : defaultPageSize;
  return { pageIndex: current, pageSize: pageSize };
}
