import { Component } from '@angular/core';
import { UserService } from 'src/app/request/user.service';
import { UsersListParams } from 'src/app/request/user.service.type';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent {
  constructor(private userService: UserService) {}

  formData: UsersListParams = {};

  ngOnInit(): void {
    this.userService.postUsersList(this.formData).subscribe();
  }

  submitHandler() {
    this.userService.postUsersList(this.formData).subscribe();
  }

  resetHandler() {
    this.formData = {};
    this.userService.postUsersList(this.formData).subscribe();
  }
}
