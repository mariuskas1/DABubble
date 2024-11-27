import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private authService: AuthService, private router: Router) {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async registerUser() {

    console.log('E-Mail:', this.email);
    console.log('Passwort:', this.password);
    if (!this.email || !this.isValidEmail(this.email)) {
      console.error('Ungültige E-Mail-Adresse');
      return;
    }

    try {
      const result = await this.authService.signUp(this.email, this.password);

      const [firstName, ...lastNameParts] = this.fullName.trim().split(' ');
      const lastName = lastNameParts.join(' ');

      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: this.email,
        avatar: '',
        channels: [],
        chats: [],
        online: true,
      };
      await this.authService.saveUserData(result.user.uid, userData);
      this.router.navigate(['/avatar-selection']);
    } catch (error) {
      console.log('Fehler bei der Registrierung', error);
    }
  }
}
