import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  constructor(private router: Router, private authService: AuthService) {}

  email!: string;
  password!: string;

  navigateToMainPage(){
    this.router.navigate(['/main']);
  }

  signIn(){
    this.authService.signIn(this.email, this.password);
  }
}
