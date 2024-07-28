import { post } from "@/utils/http";
import type { ILoginParams, ILoginItems } from "@/types/instance/login";
const AuthService = {
  // 后台登录
  loginAPI: (data: ILoginParams) => post<ILoginItems>("/api/auth/login", data),
};

export default AuthService;
