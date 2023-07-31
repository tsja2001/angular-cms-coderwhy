import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.sass'],
})
export class HomeLayoutComponent {
  constructor(
    private router: Router
  ) {}
  handler(type: string) {
    if(type === 'login') {
      this.router.navigate(['home', 'login']);
    } else if(type === 'signup') {
      this.router.navigate(['home','signup']);
    }
  }
}
