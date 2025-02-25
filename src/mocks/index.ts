import { roles } from "@/mocks/role/roles";
import { users } from "@/mocks/user/users";

const mockData: Record<string, unknown> = {
  "/sys/users": users,
  "/sys/roles": roles,
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
  return {
    total: 0,
    data: [],
  };
};

const sortData = (mockData: unknown, params?: API.SearchParams) => {
  if (!params) {
    return mockData;
  }
  return mockData;
};
const mocks = <T>(path: string, params?: API.SearchParams) => {
  const data = sortData(mockData[path], params);

  const pageData = getPaginationData(data, params);

  if (pageData) {
    console.log("mock data pagination:", params);
    return {
      success: true,
      data: pageData.data as T,
      total: pageData.total,
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
