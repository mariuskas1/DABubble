import { Component } from '@angular/core';
import { WorkspaceChannelsComponent } from "./workspace-channels/workspace-channels.component";
import { WorkspaceDirectMessagesComponent } from "./workspace-direct-messages/workspace-direct-messages.component";

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [WorkspaceChannelsComponent, WorkspaceDirectMessagesComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {

}
