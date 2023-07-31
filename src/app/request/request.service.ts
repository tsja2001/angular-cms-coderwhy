import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { StorageService } from '../utils/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient, private myStorage: StorageService) {
    this.getTokenInStorage();
  }

  getTokenInStorage() {
    this._token = this.myStorage.getItem('token');
  }

  getHeadersWithToken() {
    if (!this._token) {
      this.getTokenInStorage();
    }

    return {
      'Content-Type': 'application/json',
      Authorization: this._token ?? '',
    };
  }

  _token: string | null = null;

  baseUrl = '/api';

  // 仅携带token的请求，其余参数自定义
  rawRequest<T>(
    method: string,
    uri: string,
    options = {}
  ): Observable<T> {
    return this.http.request<T>(method, this.baseUrl + uri, {
      headers: this.getHeadersWithToken(),
      ...options
    });
  }

  get<T>(uri: string, params?: any): Observable<T> {
    return this.http
      .get<returnType<T>>(this.baseUrl + uri, {
        params,
        responseType: 'json',
        observe: 'body',
        headers: this.getHeadersWithToken(),
      })
      .pipe(
        map((response) => {
          if (response.code !== 0) {
            // 处理异常
            console.error('An error occurred111:', response);
            throw new Error(response.data as any);
          }
          // console.log('RequestService get map', response);
          return response.data;
        }),
        catchError((error) => {
          console.error('An error occurred222:', error);
          return throwError(error);
        })
      );
  }

  post<T>(uri: string, data?: any): Observable<T> {
    // console.log('RequestService post');
    return this.http
      .post<returnType<T>>(this.baseUrl + uri, data, {
        headers: this.getHeadersWithToken(),
      })
      .pipe(
        map((response) => {
          if (response.code !== 0) {
            // 处理异常
            console.error('An error occurred:', response);
            throw new Error(response.data as any);
          }
          // console.log('RequestService post map', response);
          return response.data;
        }),
        catchError((error) => {
          // 在这里处理错误
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }

  put<T>(uri: string, data?: any): Observable<returnType<T>> {
    return this.http
      .put<returnType<T>>(this.baseUrl + uri, data, {
        headers: this.getHeadersWithToken(),
      })
      .pipe(
        map((response) => {
          if (response.code !== 0) {
            // 处理异常
            console.error('An error occurred:', response);
            throw new Error(response.data as any);
          }
          console.log('RequestService put map', response);
          return response;
        }),
        catchError((error) => {
          // 在这里处理错误
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }

  delete<T>(uri: string, params: any): Observable<returnType<T>> {
    return this.http
      .delete<returnType<T>>(this.baseUrl + uri, {
        headers: this.getHeadersWithToken(),
        params: params,
      })
      .pipe(
        map((response) => {
          if (response.code !== 0) {
            // 处理异常
            console.error('An error occurred:', response);
            throw new Error(response.data as any);
          }
          console.log('RequestService delete map', response);
          return response;
        }),
        catchError((error) => {
          // 在这里处理错误
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }
}

export interface returnType<T = any> {
  code: number;
  data: T;
}
