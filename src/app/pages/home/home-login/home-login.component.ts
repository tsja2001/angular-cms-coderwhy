import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { AlertService } from 'src/app/component/feedback/alert/alert.service';
import { RoleService } from 'src/app/request/role.service';
import { UserService } from 'src/app/request/user.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.sass'],
})
export class HomeLoginComponent {
  constructor(
    private userService: UserService,
    private alretService: AlertService,
    private roleService: RoleService,
    private router: Router
  ) {}

  userName: string | undefined;
  password: string | undefined;

  token: string | undefined;

  onSubmit() {
    if (this.userName == undefined || this.password == undefined) {
      alert('请输入用户名和密码');
      return;
    }

    // 用户登录
    this.userService.postLogin(this.userName, this.password).pipe(
      tap((res) => {
        this.token = res.token;
      }),
      // 获取用户信息, 并存储
      switchMap((res) => this.userService.getUserById(res.id, true)),
      // 获取角色菜单， 并存储
      switchMap((res) => this.roleService.getRoleMenu(res.role.id, true)),
    ).subscribe((res) => {
      this.alretService.alert('登录成功');
      this.router.navigate(['/main']);
    })
  }
}
