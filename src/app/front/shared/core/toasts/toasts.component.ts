import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html'
})
export class ToastsComponent implements OnInit {

  constructor(
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

}
