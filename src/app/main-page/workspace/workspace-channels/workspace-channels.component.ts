import { Component, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-workspace-channels',
  standalone: true,
  imports: [ ],
  templateUrl: './workspace-channels.component.html',
  styleUrl: './workspace-channels.component.scss',
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
export class WorkspaceChannelsComponent {
  @Output() dialogStateChange = new EventEmitter<boolean>();

  showSubmenu = true;
  addChannelDialogOpened = true;


  toggleDropdown(){
    this.showSubmenu = !this.showSubmenu;
  }

  displayAddChannelDialog(){
    this.addChannelDialogOpened = true;
    this.dialogStateChange.emit(this.addChannelDialogOpened);
  }

}
