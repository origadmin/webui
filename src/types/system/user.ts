/* eslint-disable */
// @ts-ignore
declare namespace API {
  type User = {
    /** ID */
    id: string;
    /** 用户名 */
    username: string;
    /** 邮箱 */
    email: string;
    /** 手机号 */
    phoneNumber: string;
    /** 状态 */
    status: string;
    /** 创建时间 */
    createdAt: Date;
    /** 更新时间 */
    updatedAt: Date;
    /** 角色 */
    role?: string;
    /** 权限 */
    permissions?: string[];
    /** 头像 */
    avatar: string;
    /** 昵称 */
    nickname: string;
    /** 备注 */
    remark?: string;
  };
}
