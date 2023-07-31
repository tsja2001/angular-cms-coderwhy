import { Component } from '@angular/core';
import { UserService } from 'src/app/request/user.service';
import { LogoutService } from '../../../../utils/logout.service';
import { ModalService } from '../../../../component/feedback/modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private logoutService: LogoutService,
    private modalService: ModalService

  ) {}

  get username() {
    return `${this.userService.userData?.name}`;
  }

  logoutHandler() {
    this.modalService.showModal({
      title: 'Logout',
      content: 'Are you sure to logout?',
      showCancel: true,
      cancelText: 'Cancel',
      confirmText: 'Logout',
      confirmCallback: () => {
        this.logoutService.logout();
      }
    })
  }
}
