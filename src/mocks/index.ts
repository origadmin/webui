import { roles } from "@/mocks/role/roles";
import { users } from "@/mocks/user/users";
import { mockSignInUser } from "./mock-sign-in"; // Correctly import mockSignInUser
import { resources } from "./resources";

const mockData: Record<string, any> = {
  "/sys/users": users,
  "/sys/roles": roles,
  // Add mock data for the profile endpoint
  "/sys/personal/profile": {
    user: mockSignInUser, // Use the correct variable name
    resources: resources,
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
  // If data is not an array, it might be a single object (like our profile)
  // or pagination is not applicable.
  return null;
};

const sortData = (mockData: unknown, params?: API.SearchParams) => {
  if (!params) {
    return mockData;
  }
  return mockData;
};

const mocks = <T>(path: string, params?: API.SearchParams) => {
  const data = sortData(mockData[path], params);

  // Handle non-paginated data like the profile endpoint
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
    console.log("mock data pagination:", params);
    return {
      success: true,
      data: pageData.data as T,
      total: pageData.total,
    };
  }

  // Fallback for data that is not paginated and not the profile
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
