import { PAGE_SIZE, START_PAGE } from "@/types";
import GlobalConfig from "@config";
import { ColumnFilter, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

// declare function parseSearch(params: API.Params): API.Params;
// declare function parseSearch(state?: SearchState): API.Params;
function parseSearch(params: API.SearchParams | URLSearchParams): API.SearchParams {
  if (params instanceof URLSearchParams) {
    params = Object.fromEntries(params.entries());
  }
  return params;
}

export function decodeFromBinary(str: string): string {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c: string) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
}

export function encodeToBinary(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (_, p1: string) {
      return String.fromCharCode(parseInt(p1, 16));
    }),
  );
}

/**
 * Transfer pagination parameter by converting page size to a different key.
 *
 * @param {API.SearchParams} params - The page size for pagination.
 * @return {API.SearchParams} Updated object with page size converted to 'page_size'.
 */
export function parseParams(params: API.SearchParams): API.SearchParams {
  const {
    defaultCurrent = START_PAGE,
    defaultPageSize = PAGE_SIZE,
    backendPageStart = 1,
  } = GlobalConfig.api?.searchOptions?.pagination || {};
  const { pageSize, current, ...restParams } = params;
  // Make sure pageSize is an integer
  const intPageSize = Number(pageSize); // Use Number to convert to number
  const effectivePageSize = intPageSize > 0 ? intPageSize : defaultPageSize;

  return {
    current: current ?? defaultCurrent + backendPageStart,
    page_size: effectivePageSize,
    ...restParams,
  };
}

export function parsePagination(state?: PaginationState): API.SearchParams {
  const { key, pageSizeKey, defaultPageSize, defaultCurrent, backendPageStart } =
    GlobalConfig.api?.searchOptions?.pagination || {};
  const { pageIndex = defaultCurrent, pageSize = defaultPageSize } = state ?? {};
  return {
    [key]: pageIndex + backendPageStart,
    [pageSizeKey]: pageSize,
  };
}

export function getPagination(searchParams: URLSearchParams): PaginationState {
  const { key, pageSizeKey, defaultPageSize, defaultCurrent, backendPageStart } =
    GlobalConfig.api?.searchOptions?.pagination || {};

  const current = searchParams.has(key) ? Number(searchParams.get(key)) - backendPageStart : defaultCurrent;
  const pageSize = searchParams.has(pageSizeKey) ? Number(searchParams.get(pageSizeKey)) : defaultPageSize;
  return { pageIndex: current, pageSize: pageSize };
}

export function parseSorting(state?: SortingState): API.SearchParams {
  if (!state || state.length === 0) {
    return {};
  }
  const { key = "sort_by", delimiter = ",", contact = "." } = GlobalConfig.api?.searchOptions?.sort ?? {};
  const sort = state.map(({ id, desc }) => `${id}${contact}${desc ? "desc" : "asc"}`).join(delimiter);
  return {
    [key]: sort,
  };
}

export function getSorting(searchParams: URLSearchParams): SortingState {
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

export function fillSearchParams(searchParams: URLSearchParams, params?: API.SearchParams): URLSearchParams {
  if (!GlobalConfig.api.bindSearch || !params) {
    return searchParams;
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value.toString());
    }
  });

  return searchParams;
}

export function getColumnFilters(searchParams: URLSearchParams, filters?: string[]): ColumnFiltersState {
  if (!filters || filters.length === 0) {
    return [];
  }
  return filters
    .filter((key) => searchParams.has(key) || searchParams.get(key) !== null)
    .map((key) => ({
      id: key,
      value: searchParams.get(key),
    }));
}

export function parseColumnFilters(columnFilters: ColumnFiltersState): API.SearchParams {
  if (!columnFilters || columnFilters.length === 0) {
    return {};
  }

  const params: API.SearchParams = {};
  columnFilters.forEach(({ id, value }: ColumnFilter) => {
    params[id] = value;
  });
  return params;
}

export { parseSearch };
