import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { WorkspaceComponent } from "./workspace/workspace.component";
import { MainChatComponent } from "./main-chat/main-chat.component";
import { ThreadComponent } from "./thread/thread.component";
import { AddChannelDialogComponent } from './add-channel-dialog/add-channel-dialog.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, WorkspaceComponent, MainChatComponent, ThreadComponent, AddChannelDialogComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  addChannelDialogOpened = true;

  handleDialogStateChange(dialogState: boolean) {
    this.addChannelDialogOpened = dialogState;
  }
}
