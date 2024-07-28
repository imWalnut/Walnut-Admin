// 用户信息项
export type IUserItems = {
  id: number;
  userName: string;
  phoneNumber: string;
  password: string;
  invitedBy: string | null;
  avatar: string | null;
  role: number;
  status: number;
  remark: string | null;
  createdAt: string;
};
