import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/request/user.service';
import { UsersListData } from 'src/app/request/user.service.type';
import { UserStatusPipe } from 'src/app/utils/user-status.pipe';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  providers: [UserStatusPipe],
})
export class TableComponent implements OnInit {
  constructor(private userService: UserService) {}

  usersListData: UsersListData | undefined;

  sub: Subscription | undefined;

  ngOnInit(): void {
    this.sub = this.userService.usersListData$.subscribe((response) => {
      console.log('监听到数据请求变化', response);
      this.usersListData = response;
    });
  }

  // 组件销毁时候，取消订阅
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
