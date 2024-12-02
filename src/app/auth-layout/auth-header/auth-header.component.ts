import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.scss',
})
export class AuthHeaderComponent {
  @Input() title: string = '';
  @Input() info: string = '';
  @Input() showIconContainer: boolean = false;

  constructor(private location: Location) {}

  navigateBack() {
    this.location.back();
  }
}
