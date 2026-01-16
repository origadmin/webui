import { permissions } from "@/mocks/permission/permissions";
import { roles } from "@/mocks/role/roles";
import { users } from "@/mocks/user/users";
import { views } from "@/mocks/view/views";
import { mockSignInUser, mockToken } from "./mock-sign-in";
import { resources } from "./resources";

const mockData: Record<string, unknown> = {
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
  "/me/profile": {
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
  "/me/resources": resources,
  "/auth/refresh": mockToken,
  "/auth/logout": { success: true },
};

const getPaginationData = (data: unknown, params?: API.SearchParams) => {
  const { page = 1, page_size = 15, paging_mode } = params || {};

  if (data && Array.isArray(data)) {
    if (paging_mode === "none") {
      return {
        total: data.length,
        data: data,
      };
    }

    const startIndex = (page - 1) * page_size;
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

interface ItemWithParentId {
  parent_id?: string | null;
}

const mocks = <T>(path: string, params?: API.SearchParams): API.Result<T> => {
  let data = mockData[path];

  // --- NEW FILTERING LOGIC ---
  if (params && data && Array.isArray(data)) {
    // Filter by parent_id if it exists in params
    if (params.parent_id !== undefined) {
      data = data.filter((item) => {
        const typedItem = item as ItemWithParentId;
        // Handle root items where parent_id can be null, undefined or ""
        if (params.parent_id === null || params.parent_id === "" || params.parent_id === undefined) {
          return typedItem.parent_id === null || typedItem.parent_id === "" || typedItem.parent_id === undefined;
        }
        return typedItem.parent_id === params.parent_id;
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
        items: data as T[],
      };
    }
  }

  if (pageData) {
    return {
      success: true,
      items: pageData.data as T[],
      total: pageData.total,
    };
  }

  if (data) {
    return {
      success: true,
      items: data as T[],
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
