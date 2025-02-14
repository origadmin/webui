/* eslint-disable */
// @ts-ignore
import { Search } from "@/utils";
import { post, get, put, del } from "@/utils/request";

/** Query menu list GET /api/v1/sys/menus */
export async function listMenu(params: API.SearchParams, options?: API.RequestOptions) {
  options = {
    params,
    ...options,
  };
  return get<API.System.Menu[]>("/api/v1/sys/menus", options);
}

/** Create menu record POST /api/v1/sys/menus */
export async function addMenu(body: API.System.Menu, options?: API.RequestOptions) {
  return post<API.System.Menu>("/api/v1/sys/menus", body, options);
}

/** Get menu record by ID GET /api/v1/sys/menus/${id} */
export async function getMenu(id: string, options?: API.RequestOptions) {
  const localVarPath = `/sys/menus/{id}`.replace(`{id}`, encodeURIComponent(String(id)));
  return get<API.System.Menu>(localVarPath, undefined, options);
}

/** Update menu record by ID PUT /api/v1/sys/menus/${id} */
export async function updateMenu(id: string, body: API.System.Menu, options?: API.RequestOptions) {
  const localVarPath = `/sys/menus/{id}`.replace(`{id}`, encodeURIComponent(String(id)));
  return put<never>(localVarPath, body, options);
}

/** Delete menu record by ID DELETE /api/v1/sys/menus/${id} */
export async function deleteMenu(id: string, options?: API.RequestOptions) {
  const localVarPath = `/sys/menus/{id}`.replace(`{id}`, encodeURIComponent(String(id)));
  return del<never>(localVarPath, options);
}
