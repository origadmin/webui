const config = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
    // eslint-disable-next-line no-undef
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};

export default config;
