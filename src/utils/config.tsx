import { PAGE_SIZE, START_PAGE, PAGE_SIZE_OPTIONS } from "@/types";

const defaultConfig = {
  request: {
    baseURL: "",
    // baseURL: process.env.NODE_ENV === "development" ? "http://localhost:25100" : HOST,
    timeout: 30000,
  },
  api: {
    urlPrefix: "/api/v1",
    bindSearch: true,
    searchOptions: {
      pagination: {
        key: "current",
        pageSizeKey: "page_size",
        defaultPageSize: PAGE_SIZE,
        defaultCurrent: START_PAGE,
      },
      sizeOptions: PAGE_SIZE_OPTIONS,
      sort: {
        key: "sort_by",
        delimiter: ",",
        contact: ".",
      },
    },
  },
  mocks: {},
  auth: {
    verifyEmail: {
      url: "/api/v1/personal/verify-email",
      method: "POST",
    },
    getCaptcha: {
      url: "/api/v1/captcha/id",
      method: "GET",
      params: {
        reload: 1, // 是否重新生成验证码
        ts: new Date().getTime(), // 时间戳,防止缓存
      },
    },
    resetPassword: {
      url: "/api/v1/personal/reset-password",
      method: "POST",
    },
    refreshToken: {
      url: "/api/v1/personal/refresh",
      method: "POST",
    },
  },
};

type RuntimeConfigType = Partial<typeof defaultConfig>;

const defineConfig = (config?: RuntimeConfigType) => {
  return {
    defaultConfig,
    ...config,
  };
};

export type { RuntimeConfigType };
export default defineConfig;
