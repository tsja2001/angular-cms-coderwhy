import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit {
  message: string | null = null;

  constructor(
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.alertService.alert$.subscribe(message => {
      this.message = message;
    })
  }
}
