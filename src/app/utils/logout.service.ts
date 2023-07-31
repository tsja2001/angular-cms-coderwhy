import { Injectable } from "@angular/core";
import { UserService } from "../request/user.service";
import { RoleService } from "../request/role.service";
import { RequestService } from "../request/request.service";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LogoutService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private requestService: RequestService,
    private storage: StorageService,
    private router: Router
  ) {}

  logout() {
    this.userService.userData = undefined;
    this.roleService.roleMenu = [];
    this.requestService._token = null;
    this.storage.clear();
    this.router.navigate(["/home/login"]);
  }
}
