/* eslint-disable */
// @ts-ignore
import { parseParams } from '@/utils/pagination';
import request from '@/utils/request';

/** Query menu list GET /api/v1/sys/menus */
export async function listMenu(params: API.Params, options?: { [key: string]: any }) {
  params = parseParams(params);
  return request<API.ResponseResult<API.Menu[]>>('/api/v1/sys/menus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create menu record POST /api/v1/sys/menus */
export async function addMenu(body: API.Menu, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Menu>>('/api/v1/sys/menus', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get menu record by ID GET /api/v1/sys/menus/${id} */
export async function getMenu(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Menu>>(`/api/v1/sys/menus/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update menu record by ID PUT /api/v1/sys/menus/${id} */
export async function updateMenu(id: string, body: API.Menu, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/sys/menus/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete menu record by ID DELETE /api/v1/sys/menus/${id} */
export async function deleteMenu(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/sys/menus/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
