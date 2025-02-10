/* eslint-disable */
// @ts-ignore
import { Pagination } from "@/utils";
import { post, get, put, del } from "@/utils/request";

/** Query menu list GET /api/v1/sys/menus */
export async function listMenu(params: API.Params, options?: API.RequestOptions) {
  params = Pagination.parseParams(params);
  return get<API.Result<API.Menu[]>>("/api/v1/sys/menus", params, options);
}

/** Create menu record POST /api/v1/sys/menus */
export async function addMenu(body: API.Menu, options?: API.RequestOptions) {
  return post<API.Result<API.Menu>>("/api/v1/sys/menus", body, options);
}

/** Get menu record by ID GET /api/v1/sys/menus/${id} */
export async function getMenu(id: string, options?: API.RequestOptions) {
  const localVarPath = `/sys/menus/{id}`.replace(`{id}`, encodeURIComponent(String(id)));
  return get<API.Result<API.Menu>>(localVarPath, undefined, options);
}

/** Update menu record by ID PUT /api/v1/sys/menus/${id} */
export async function updateMenu(id: string, body: API.Menu, options?: API.RequestOptions) {
  const localVarPath = `/sys/menus/{id}`.replace(`{id}`, encodeURIComponent(String(id)));
  return put<API.Result<any>>(localVarPath, body, options);
}

/** Delete menu record by ID DELETE /api/v1/sys/menus/${id} */
export async function deleteMenu(id: string, options?: API.RequestOptions) {
  const localVarPath = `/sys/menus/{id}`.replace(`{id}`, encodeURIComponent(String(id)));
  return del<API.Result<any>>(localVarPath, options);
}
