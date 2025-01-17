/* eslint-disable */
// @ts-ignore
import {Pagination} from "@/utils";
import {request} from "@/utils/service";

/** Query menu list GET /api/v1/sys/menus */
export async function listMenu(params: API.Params, options?: { [key: string]: any }) {
  params = Pagination.parseParams(params);
  return request<API.Result<API.Menu[]>>("/api/v1/sys/menus", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create menu record POST /api/v1/sys/menus */
export async function addMenu(body: API.Menu, options?: { [key: string]: any }) {
  return request<API.Result<API.Menu>>("/api/v1/sys/menus", {
    method: "POST",
    data: body,
    ...(options || {}),
  });
}

/** Get menu record by ID GET /api/v1/sys/menus/${id} */
export async function getMenu(id: string, options?: { [key: string]: any }) {
  return request<API.Result<API.Menu>>(`/api/v1/sys/menus/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}

/** Update menu record by ID PUT /api/v1/sys/menus/${id} */
export async function updateMenu(id: string, body: API.Menu, options?: { [key: string]: any }) {
  return request<API.Result<any>>(`/api/v1/sys/menus/${id}`, {
    method: "PUT",
    data: body,
    ...(options || {}),
  });
}

/** Delete menu record by ID DELETE /api/v1/sys/menus/${id} */
export async function deleteMenu(id: string, options?: { [key: string]: any }) {
  return request<API.Result<any>>(`/api/v1/sys/menus/${id}`, {
    method: "DELETE",
    ...(options || {}),
  });
}
