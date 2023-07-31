export interface LoginData {
  id: number;
  name: string;
  token: string;
}

export interface UserData {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  createAt: string;
  updateAt: string;
  role: Role;
  department: Department;
}

export interface Role {
  id: number;
  name: string;
  intro: string;
  createAt: string;
  updateAt: string;
}

export interface Department {
  id: number;
  name: string;
  parentId: number;
  createAt: string;
  updateAt: string;
  leader: string;
}

// 请求用户列表参数
export interface UsersListParams {
  offset?: number;
  size?: number;
  name?: string;
  cellphone?: string;
  enable?: number;
  createAt?: string;
}

// 用户列表item
export interface UsersListItem {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  departmentId: number;
  roleId: number;
  createAt: string;
  updateAt: string;
}

// 用户列表返回数据
export interface UsersListData {
  totalCount: number;
  list: UsersListItem[];
}
