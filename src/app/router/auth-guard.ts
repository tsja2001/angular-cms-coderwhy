import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../request/user.service';
import { RoleService } from '../request/role.service';
import { RequestService } from '../request/request.service';
import { StorageService } from '../utils/storage.service';

/**
 * 路由守卫，检查用户是否登录
 * 如果storage中没有token，跳转到登录页面
 * 如果storage中有token，但是service中没有token，说明刷新了页面，需要重新获取用户信息
 */

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private requestService: RequestService,
    private storage: StorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.requestService._token;
    if (!token) {
      this.router.navigate(['/home/login']);
      return false;
    }

    if (!this.userService.userData || !this.roleService.roleMenu) {
      const userData = this.storage.getItem('userData');
      const roleMenu = this.storage.getItem('roleMenu');
      if (userData && roleMenu) {
        this.userService.userData = userData;
        this.roleService.roleMenu = roleMenu;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }

    return true;
  }
}
