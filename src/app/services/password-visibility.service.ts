import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordVisibilityService {
  private _isPasswordVisible: boolean = false;

  get isPasswordVisible(): boolean {
    return this._isPasswordVisible;
  }

  togglePasswordInputType(): void {
    this._isPasswordVisible = !this._isPasswordVisible;
  }

  resetPasswordVisibility(): void {
    this._isPasswordVisible = false;
  }
}
