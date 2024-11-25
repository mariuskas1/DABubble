import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-workspace-direct-messages',
  standalone: true,
  imports: [],
  templateUrl: './workspace-direct-messages.component.html',
  styleUrl: './workspace-direct-messages.component.scss',
  animations: [
    trigger('submenuAnimation', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('125ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('125ms ease-in', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ]
})
export class WorkspaceDirectMessagesComponent {
  showSubmenu = true;


  toggleDropdown(){
    this.showSubmenu = !this.showSubmenu;
  }
}
