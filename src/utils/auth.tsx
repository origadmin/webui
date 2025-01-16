/* eslint-disable */
// @ts-ignore

const userAuthenticated = () => {
  // 这里可以添加你的权限检查逻辑
  // 例如，检查 localStorage 中是否有 token
  const token = localStorage.getItem("token");
  return !!token;
};

const getToken = () => {
  // 这里可以添加你的权限检查逻辑
  // 例如，检查 localStorage 中是否有 token
  const token = localStorage.getItem("token");
  return token || "";
};

const setToken = (token: string) => {
  // 这里可以添加你的权限检查逻辑
  // 例如，检查 localStorage 中是否有 token
  localStorage.setItem("token", token);
};

export { userAuthenticated, getToken, setToken };
