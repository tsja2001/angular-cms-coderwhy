import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal$ = new Subject<ModalData | null>();

  constructor() {}

  showModal(data: ModalData) {
    this.modal$.next(data);
  }

  hideModal() {
    this.modal$.next(null);
  }
}

export interface ModalData {
  title?: string;
  content?: string;
  showCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  cancelCallback?: () => void;
  confirmCallback?: () => void;
}
