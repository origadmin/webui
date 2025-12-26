import { roles } from "@/mocks/role/roles";
import { users } from "@/mocks/user/users";
import { permissions } from "@/mocks/permission/permissions";
import { views } from "@/mocks/view/views"; // Import views mock data
import { mockSignInUser } from "./mock-sign-in";
import { resources } from "./resources";

const mockData: Record<string, any> = {
  "/sys/users": users,
  "/sys/roles": roles,
  "/sys/permissions": permissions,
  "/sys/views": views, // Add views to mockData
  "/sys/resources": resources, // Also ensure resources are mocked for consistency
  // Add mock data for the profile endpoint
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
  const { current = 1, page_size = 15 } = params || {};
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
  return mockData;
};

const mocks = <T>(path: string, params?: API.SearchParams) => {
  console.log(`[Mock] Requesting path: ${path}`, { mockData });
  const data = sortData(mockData[path], params);
  console.log(`[Mock] Data for path ${path}:`, data);

  if (path === "/sys/personal/profile") {
    if (data) {
      return {
        success: true,
        data: data as T,
      };
    }
  }

  const pageData = getPaginationData(data, params);

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
