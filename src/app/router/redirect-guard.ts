import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RequestService } from '../request/request.service';
import { UserService } from '../request/user.service';
import { RoleService } from '../request/role.service';
import { StorageService } from '../utils/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private requestService: RequestService,
    private storage: StorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.requestService._token;
    if (token) {
      this.router.navigate(['/main']);
      return false;
    }

    if (!this.userService.userData || !this.roleService.roleMenu) {
      const userData = this.storage.getItem('userData');
      const roleMenu = this.storage.getItem('roleMenu');
      if (userData && roleMenu) {
        this.userService.userData = userData;
        this.roleService.roleMenu = roleMenu;
      }
    }

    return true;
  }
}
