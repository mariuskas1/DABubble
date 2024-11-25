import { Component } from '@angular/core';
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
        opacity: 1
      })),
      state('closed', style({
        transform: 'translateX(-200%)',
        opacity: 0
      })),
      transition('opened <=> closed', [
        animate('500ms ease-in-out')
      ]),
    ]),
  ],
})
export class WorkspaceComponent {

  workspaceMenuOpened = true;


  toggleWorkspaceMenu(){

    this.workspaceMenuOpened = !this.workspaceMenuOpened;
  }

}
