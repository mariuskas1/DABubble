import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { RegistrationDataService } from '../../services/registration-data.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  showPrivacyPolicyError: boolean = false;
  isCheckboxChecked: boolean = false;
  fullName: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private registrationDataService: RegistrationDataService) {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async saveUserData() {
    console.log('E-Mail:', this.email);
    console.log('Passwort:', this.password);
    if (!this.email || !this.isValidEmail(this.email)) {
      console.error('Ungültige E-Mail-Adresse');
      return;
    }

    const [firstName, ...lastNameParts] = this.fullName.trim().split(' ');
    const lastName = lastNameParts.join(' ');

    this.registrationDataService.setUserData({
      firstName,
      lastName,
      email: this.email,
      password: this.password,
    });

    this.router.navigate(['/avatar-selection']);
  }
}
