import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { RegistrationDataService } from '../../services/registration-data.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  showPrivacyPolicyError: boolean = false;
  isCheckboxChecked: boolean = false;
  isPasswordVisible: boolean = false;
  fullName: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private registrationDataService: RegistrationDataService
  ) {}

  ngOnInit(): void {
    this.isPasswordVisible = false;
  }

  togglePasswordInputType(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async saveUserData() {
    console.log('E-Mail:', this.email);
    console.log('Passwort:', this.password);

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
