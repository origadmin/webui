import { PAGE_SIZE, START_PAGE } from "@/types";
import GlobalConfig from "@config";
import { ColumnFilter, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";


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

export function parsePagination(state?: PaginationState): API.Params {
  const { key, pageSizeKey, defaultPageSize, defaultCurrent, backendPageStart } =
    GlobalConfig.api?.searchOptions?.pagination || {};
  const { pageIndex = defaultCurrent, pageSize = defaultPageSize } = state ?? {};
  return {
    [key]: pageIndex + backendPageStart,
    [pageSizeKey]: pageSize,
  };
}

export function getPaginationState(searchParams: URLSearchParams): PaginationState {
  const { key, pageSizeKey, defaultPageSize, defaultCurrent, backendPageStart } =
    GlobalConfig.api?.searchOptions?.pagination || {};

  const current = searchParams.has(key) ? Number(searchParams.get(key)) - backendPageStart : defaultCurrent;
  const pageSize = searchParams.has(pageSizeKey) ? Number(searchParams.get(pageSizeKey)) : defaultPageSize;
  return { pageIndex: current, pageSize: pageSize };
}

export function parseSorting(state?: SortingState): API.Params {
  if (!state || state.length === 0) {
    return {};
  }
  const { key = "sort_by", delimiter = ",", contact = "." } = GlobalConfig.api?.searchOptions?.sort ?? {};
  const sort = state.map(({ id, desc }) => `${id}${contact}${desc ? "desc" : "asc"}`).join(delimiter);
  return {
    [key]: sort,
  };
}

export function getSortingState(searchParams: URLSearchParams): SortingState {
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

export function fillSearchParams(searchParams: URLSearchParams, params?: API.Params): URLSearchParams {
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
    .filter((key) => searchParams.has(key))
    .map((key) => ({
      id: key,
      value: searchParams.get(key) ?? "",
    }));
}

export function parseColumnFilters(columnFilters: ColumnFiltersState): API.Params {
  if (!columnFilters || columnFilters.length === 0) {
    return {};
  }

  const params: API.Params = {};
  columnFilters.forEach(({ id, value }: ColumnFilter) => {
    params[id] = value;
  });
  return params;
}
