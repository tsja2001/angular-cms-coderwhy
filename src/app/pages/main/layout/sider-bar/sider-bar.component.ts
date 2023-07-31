import { Component } from '@angular/core';
import { RoleService } from 'src/app/request/role.service';

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.sass']
})
export class SiderBarComponent {
  constructor(
    private roleServer: RoleService,
  ) { }

  get roleMenu() {
    return this.roleServer.roleMenu;
  }
}
