import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { map } from 'rxjs';
import { StorageService } from '../utils/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private request: RequestService, private storage: StorageService) {}

  // 角色菜单
  roleMenu: RoleMenu[] = [];

  // 根据角色id获取菜单
  getRoleMenu(roleId: string | number, ifStore = false) {
    return this.request.get<RoleMenu>(`/role/${roleId}/menu`).pipe(
      map((response: any) => {
        if (ifStore) {
          this.roleMenu = response;
          this.storage.setItem('roleMenu', response);
        }

        return response;
      })
    );
  }

  // 清除角色菜单
  clearRoleMenu() {
    this.roleMenu = [];
    this.storage.removeItem('roleMenu');
  }
}

export interface RoleMenu {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  children: Children[];
}

export interface Children {
  id: number;
  url: string;
  name: string;
  sort: number;
  type: number;
  children: any;
  parentId: number;
}
