/* eslint-disable */
// @ts-ignore
import { parseParams } from '@/utils/pagination';
import request from '@/utils/request';

/** Query user list GET /api/v1/sys/users */
export async function listUser(params: API.Params, options?: { [key: string]: any }) {
  params = parseParams(params);
  return request<API.ResponseResult<API.User[]>>('/api/v1/sys/users', {
    method: 'GET',
    params: {
      current: '1',
      page_size: '15',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create user record POST /api/v1/sys/users */
export async function addUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.User>>('/api/v1/sys/users', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get user record by ID GET /api/v1/sys/users/${id} */
export async function getUser(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.User>>(`/api/v1/sys/users/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update user record by ID PUT /api/v1/sys/users/${id} */
export async function updateUser(id: string, body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/sys/users/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete user record by ID DELETE /api/v1/sys/users/${id} */
export async function deleteUser(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/sys/users/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** Reset user password by ID PATCH /api/v1/sys/users/${id}/reset */
export async function resetUserPassword(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/sys/users/${id}/reset`, {
    method: 'PATCH',
    ...(options || {}),
  });
}
