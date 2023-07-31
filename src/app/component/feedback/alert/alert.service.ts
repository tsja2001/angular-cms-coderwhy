import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert$ = new Subject<string | null>();

  alert(message: string, timeOut: number = 1500) {
    this.alert$.next(message);

    setTimeout(() => {
      this.alert$.next(null);
    }, timeOut);
  }
}
