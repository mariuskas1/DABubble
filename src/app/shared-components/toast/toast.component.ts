import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  message: string = '';
  isVisible: boolean = false;
  duration: number = 2000;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((toast) => {
      this.message = toast.message;
      this.isVisible = true;
      this.duration = 2000;

      setTimeout(() => {
        this.isVisible = false;
      }, this.duration || 2000);
    });
  }
}
