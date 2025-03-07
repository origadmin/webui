import { PAGE_SIZE, START_PAGE } from "@/types";
import GlobalConfig from "@config";
import { ColumnFilter, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

export function clean(search: API.SearchParams): API.SearchParams {
  console.log("clean", search);
  const {
    defaultCurrent = START_PAGE,
    defaultPageSize = PAGE_SIZE,
    backendPageStart = 1,
  } = GlobalConfig.api?.searchOptions?.pagination || {};
  const { pageSize, current, ...restParams } = search;
  // Make sure pageSize is an integer
  const intPageSize = Number(pageSize); // Use Number to convert to number
  const effectivePageSize = intPageSize > 0 ? intPageSize : defaultPageSize;
  const effectiveCurrent = typeof current === "number" ? current : defaultCurrent + backendPageStart;
  return {
    current: effectiveCurrent,
    page_size: effectivePageSize,
    ...restParams,
  };
}

export function decodeFromBinary(str: string): API.SearchParams {
  const { codec = "array" } = GlobalConfig.api?.searchOptions || {};
  if (codec === "json") {
    return JSON.parse(decodeURIComponent(atob(str))) as API.SearchParams;
  }
  return JSON.parse(str) as API.SearchParams;
}

export function encodeToBinary(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  const { codec = "array" } = GlobalConfig.api?.searchOptions || {};
  if (codec === "json") {
    const str = JSON.stringify(value);
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (_, p1: string) {
        return String.fromCharCode(parseInt(p1, 16));
      }),
    );
  }
  return JSON.stringify(value);
}

export function parse({
  pagination,
  sorting,
  columnFilters,
}: {
  pagination?: PaginationState;
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
}): API.SearchParams {
  return {
    ...parsePagination(pagination),
    ...parseSorting(sorting),
    ...parseColumnFilters(columnFilters),
  };
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

export function getPagination(searchParams: API.SearchParams): PaginationState {
  const { key, pageSizeKey, defaultPageSize, defaultCurrent, backendPageStart } =
    GlobalConfig.api?.searchOptions?.pagination || {};
  const currentUnknown = searchParams[key];
  const pageSizeUnknown = searchParams[pageSizeKey];
  const current = typeof currentUnknown === "number" ? currentUnknown - backendPageStart : defaultCurrent;
  const pageSize = typeof pageSizeUnknown === "number" ? pageSizeUnknown : defaultPageSize;
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

export function getSorting(searchParams: API.SearchParams): SortingState {
  const { key = "sort_by", delimiter = ",", contact = "." } = GlobalConfig.api?.searchOptions?.sort ?? {};
  const sort = searchParams[key];
  if (typeof sort !== "string") {
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

export function getColumnFilters(searchParams: API.SearchParams, filters?: string[]): ColumnFiltersState {
  if (!filters || filters.length === 0) {
    return Object.entries(searchParams).map(([key, value]) => ({
      id: key,
      value: Array.isArray(value) ? value : [value].flat(),
    }));
  }

  return filters
    .filter((key) => searchParams[key] !== undefined)
    .map((key) => ({
      id: key,
      value: searchParams[key],
    }));
}

export function parseColumnFilters(columnFilters?: ColumnFiltersState): API.SearchParams {
  if (!columnFilters || columnFilters.length === 0) {
    return {};
  }

  const params: API.SearchParams = {};
  columnFilters.forEach(({ id, value }: ColumnFilter) => {
    params[id] = value;
  });
  return params;
}

export function stringifySearch(searchParams: API.SearchParams) {
  const params = new URLSearchParams();
  for (const key in searchParams) {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      params.set(key, `[${value.join(",")}]`);
    } else {
      if (typeof value === "string") {
        params.set(key, value);
      } else if (typeof value === "number") {
        params.set(key, value.toString());
      } else {
        params.set(key, JSON.stringify(value));
      }
    }
  }
  return params.toString();
}

// Custom function to parse arrays from strings
export function parseSearch(searchString: string) {
  const params = new URLSearchParams(searchString);
  const searchParams = {} as API.SearchParams;
  for (const [key, value] of params.entries()) {
    if (value.startsWith("[") && value.endsWith("]")) {
      searchParams[key] = value.slice(1, -1).split(",");
    } else if (value.match(/^[0-9]+$/)) {
      searchParams[key] = Number(value);
    } else {
      try {
        searchParams[key] = JSON.parse(value);
      } catch (error) {
        console.error(`Error parsing value for key "${key}":`, error);
        searchParams[key] = value;
      }
    }
  }
  return searchParams;
}
