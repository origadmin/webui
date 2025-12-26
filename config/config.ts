import defineConfig from "@/utils/configuration";

const config = {
  // This value is now a boolean injected by rsbuild's `define` config.
  mocks: process.env.MOCK,
};

export default defineConfig(config);
