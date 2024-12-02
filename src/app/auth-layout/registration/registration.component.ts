import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, NavigationStart } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegistrationDataService } from '../../services/registration-data.service';
import { AuthHeaderComponent } from '../auth-header/auth-header.component';
import { Subscription } from 'rxjs';
import { PasswordVisibilityService } from '../../services/password-visibility.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AuthHeaderComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  showPrivacyPolicyError: boolean = false;
  isCheckboxChecked: boolean = false;
  fullName: string = '';
  email: string = '';
  password: string = '';
  private navigationSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private registrationDataService: RegistrationDataService,
    public passwordVisibilityService: PasswordVisibilityService
  ) {}

  ngOnInit(): void {
    this.passwordVisibilityService.resetPasswordVisibility();
    this.fillRegistrationForm();
    this.checkNavigation();
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
      this.navigationSubscription = null;
    }
  }

  fillRegistrationForm(): void {
    const userData = this.registrationDataService.getUserData();
    if (userData) {
      this.fullName = `${userData.firstName ?? ''} ${
        userData.lastName ?? ''
      }`.trim();
      this.email = userData.email ?? '';
      this.password = userData.password ?? '';
    }
  }

  checkNavigation(): void {
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login') {
          this.clearRegistrationForm();
        }
      }
    });
  }

  clearRegistrationForm(): void {
    this.registrationDataService.clearUserData();
  }

  togglePassword(): void {
    this.passwordVisibilityService.togglePasswordInputType();
  }

  async saveUserData() {
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
