import { Component } from '@angular/core';
import { AlertService } from 'src/app/component/feedback/alert/alert.service';

@Component({
  selector: 'app-home-signup',
  templateUrl: './home-signup.component.html',
  styleUrls: ['./home-signup.component.sass'],
})
export class HomeSignupComponent {
  constructor(
    private alertService: AlertService,
  ) {

  }
  add() {
    this.alertService.alert('Sign up successfully!');
  }
}
