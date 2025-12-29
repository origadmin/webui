import { roles } from "@/mocks/role/roles";
import { users } from "@/mocks/user/users";
import { permissions } from "@/mocks/permission/permissions";
import { views } from "@/mocks/view/views";
import { mockSignInUser } from "./mock-sign-in";
import { resources } from "./resources";

const mockData: Record<string, any> = {
  "/sys/users": users,
  "/sys/roles": roles,
  "/sys/permissions": permissions,
  "/sys/views": views,
  "/sys/resources": resources,
  "/sys/personal/profile": {
    user: mockSignInUser,
    resources: resources,
    watermark: {
      content: [`${mockSignInUser.username}`],
      fullscreen: true,
      zIndex: 1000,
      width: 120,
      height: 64,
      gap: [30, 30],
      fontSize: 20,
    },
  },
};

const getPaginationData = (data: unknown, params?: API.SearchParams) => {
  const { current = 1, page_size = 15, no_paging } = params || {};
  if (no_paging) {
    return {
      total: Array.isArray(data) ? data.length : 0,
      data: data,
    };
  }
  if (data && Array.isArray(data)) {
    const startIndex = (current - 1) * page_size;
    const endIndex = startIndex + page_size;
    const paginatedData = data.slice(startIndex, endIndex);
    return {
      total: data.length,
      data: paginatedData,
    };
  }
  return null;
};

const sortData = (mockData: unknown, params?: API.SearchParams) => {
  if (!params) {
    return mockData;
  }
  // Sorting logic can be added here if needed in the future
  return mockData;
};

const mocks = <T>(path: string, params?: API.SearchParams): API.Result<T> => {
  let data = mockData[path];

  // --- NEW FILTERING LOGIC ---
  if (params && data && Array.isArray(data)) {
    // Filter by parent_id if it exists in params
    if (params.parent_id !== undefined) {
      data = data.filter(item => {
        // Handle root items where parent_id can be null, undefined or ""
        if (params.parent_id === null || params.parent_id === "" || params.parent_id === undefined) {
          return item.parent_id === null || item.parent_id === "" || item.parent_id === undefined;
        }
        return item.parent_id === params.parent_id;
      });
    }
  }
  // --- END OF NEW LOGIC ---

  const sortedData = sortData(data, params);
  const pageData = getPaginationData(sortedData, params);

  if (path === "/sys/personal/profile") {
    if (data) {
      return {
        success: true,
        data: data as T,
      };
    }
  }

  if (pageData) {
    return {
      success: true,
      data: pageData.data as T,
      total: pageData.total,
    };
  }

  if (data) {
    return {
      success: true,
      data: data as T,
    };
  }

  return {
    success: false,
    error: {
      code: 404,
      message: "Not Found",
    },
  };
};

export default mocks;
