import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-avatar-selection',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './avatar-selection.component.html',
  styleUrl: './avatar-selection.component.scss',
})
export class AvatarSelectionComponent {
  avatars = [
    {
      name: 'avatar_1',
      thumb: 'assets/img/avatar_1.png',
      image: 'assets/img/avatar_1_large.png',
    },
    {
      name: 'avatar_2',
      thumb: 'assets/img/avatar_2.png',
      image: 'assets/img/avatar_2_large.png',
    },
    {
      name: 'avatar_3',
      thumb: 'assets/img/avatar_3.png',
      image: 'assets/img/avatar_3_large.png',
    },
    {
      name: 'avatar_4',
      thumb: 'assets/img/avatar_4.png',
      image: 'assets/img/avatar_4_large.png',
    },
    {
      name: 'avatar_5',
      thumb: 'assets/img/avatar_5.png',
      image: 'assets/img/avatar_5_large.png',
    },
    {
      name: 'avatar_6',
      thumb: 'assets/img/avatar_6.png',
      image: 'assets/img/avatar_6_large.png',
    },
  ];

  selectedAvatar: string = 'assets/img/avatar_empty.png';

  constructor(private authService: AuthService, private router: Router) {}

  get isAvatarEmpty(): boolean {
    return this.selectedAvatar === 'assets/img/avatar_empty.png';
  }

  selectAvatar(avatarImageSource: string): void {
    this.selectedAvatar = avatarImageSource;
  }

  async saveAvatar() {
    if (this.selectedAvatar) {
      try {
        const user = this.authService.auth.currentUser;

        if (user) {
          const updateData: Partial<User> = {
            avatar: this.selectedAvatar,
          };

          await this.authService.saveUserData(user.uid, updateData);
          this.router.navigate(['/main-page']);
        }
      } catch (error) {
        console.error('Fehler beim Speichern des Avatars:', error);
      }
    }
  }
}
