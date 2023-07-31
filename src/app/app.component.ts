import { Component } from '@angular/core';
import { StorageService } from './utils/storage.service';
import { UserService } from './request/user.service';
import { Router } from '@angular/router';
import { RoleService } from './request/role.service';
import { EMPTY, catchError } from 'rxjs';
import { RequestService } from './request/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'cms-angular';
  constructor(
    private storage: StorageService,
    private requestService: RequestService,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {
    // 验证token是否过期
    const token = this.storage.getItem('token');
    if (token) {
      this.userService.getVerify().pipe(
        // 如果token过期，清除登录信息
        catchError((err) => {
            this.router.navigate(['/home']);
            this.userService.clearLoginData();
            this.roleService.clearRoleMenu();
            this.requestService._token = null;
          return EMPTY
        })
      ).subscribe();
    }
  }
}
