import { Component, Output, EventEmitter } from '@angular/core';
import { WorkspaceChannelsComponent } from "./workspace-channels/workspace-channels.component";
import { WorkspaceDirectMessagesComponent } from "./workspace-direct-messages/workspace-direct-messages.component";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [WorkspaceChannelsComponent, WorkspaceDirectMessagesComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
  animations: [
    trigger('slideInOut', [
      state('opened', style({
        transform: 'translateX(0)',
        opacity: 1,
        display: 'block', // Display state ensures visibility when opened
      })),
      state('closed', style({
        transform: 'translateX(-200%)',
        opacity: 0,
        display: 'none', // Display state hides element when closed
      })),
      transition('opened <=> closed', animate('125ms ease-in-out')), // Smooth transition
    ]),
  ],
})
export class WorkspaceComponent {

  @Output() dialogStateChange = new EventEmitter<boolean>();
  

  workspaceMenuOpened = true;

  handleDialogStateChange(newState: boolean) {
    this.dialogStateChange.emit(newState); 
  }


  toggleWorkspaceMenu(){
    this.workspaceMenuOpened = !this.workspaceMenuOpened;
  }

}
