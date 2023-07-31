import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Subject, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { StorageService } from '../utils/storage.service';
import { HttpParams } from '@angular/common/http';
import {
  LoginData,
  UserData,
  UsersListData,
  UsersListItem,
  UsersListParams,
} from './user.service.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private request: RequestService,
    private storage: StorageService
  ) {}

  // 用户信息
  userData: UserData | undefined;
  // 查询到的用户列表数据
  usersListData$ = new Subject<UsersListData | undefined>();

  // 根据用户名和密码登录
  postLogin(name: string, password: string) {
    return this.request
      .post<LoginData>('/login', {
        name,
        password,
      })
      .pipe(
        tap((response: any) => {
          this.userData = response;
          const token = 'Bearer ' + response.token;
          this.storage.setItem('token', token);
        })
      );
  }

  // 验证用户
  getVerify() {
    return this.request.rawRequest<any>('get', '/test', {
      responseType: 'text',
      observe: 'response',
    });
  }

  // 根据用户id获取用户信息
  getUserById(id: string | number, ifStore = false) {
    return this.request.get<UserData>(`/users/${id}`).pipe(
      tap((response) => {
        if (ifStore) {
          this.userData = response;
          this.storage.setItem('userData', response);
        }
      })
    );
  }

  // 清除登录信息
  clearLoginData() {
    this.userData = undefined;
    this.storage.removeItem('userData');
    this.storage.removeItem('token');
  }

  // 获取用户列表
  postUsersList(params: UsersListParams) {
    if (params.size === 0) params.size = 10;
    if (params.offset === 0) params.offset = 0;

    return this.request.post<UsersListData>('/users/list', params).pipe(
      switchMap((response) => {
        this.usersListData$.next(response);
        return this.usersListData$;
      })
    );
  }
}
