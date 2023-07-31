import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalData, ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  modalData: ModalData | null = null;

  ngOnInit() {
    this.modalService.modal$.subscribe((data) => {
      this.modalData = data;
    });
  }

  cancelHandler() {
    this.modalData?.cancelCallback?.();
    this.modalService.hideModal();
  }

  confirmHandler() {
    this.modalData?.confirmCallback?.();
    this.modalService.hideModal();
  }
}
