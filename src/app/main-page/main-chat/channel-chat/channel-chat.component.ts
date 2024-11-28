import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { ChannelService } from '../../../services/channel.service';
import { Observable } from 'rxjs';
import { Channel } from './../../../models/channel.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { EditChannelDialogComponent } from './edit-channel-dialog/edit-channel-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channel-chat',
  standalone: true,
  imports: [ EditChannelDialogComponent, CommonModule ],
  templateUrl: './channel-chat.component.html',
  styleUrl: './channel-chat.component.scss'
})
export class ChannelChatComponent {
  @ViewChild('channelTitleDiv', { static: false }) channelTitleDiv!: ElementRef;
  dialogPosition: { top: string; left: string } = { top: '0px', left: '0px' };

  editChannelDialogOpened = false;
  activeChannel: string | null = null;
  activeChannelData!: Channel | undefined;
  channels$!: Observable<Channel[]>;
  allUserChannels: Channel[] = [];
  firestore: Firestore = inject(Firestore);

  constructor(private channelService: ChannelService) {}


  ngOnInit(): void {
    this.channelService.activeChannel$.subscribe(channelId => {
      this.activeChannel = channelId;
      this.updateActiveChannelData();
    });

    this.getUserChannels();
  }

  getUserChannels(){
    const userChannelsCollection = collection(this.firestore, 'channels' );
    this.channels$ = collectionData(userChannelsCollection, { idField: 'id'}) as Observable<Channel[]>;
    
    this.channels$.subscribe((changes) => {
      this.allUserChannels = Array.from(new Map(changes.map(channel => [channel.id, channel])).values());
      this.updateActiveChannelData();
    })

  }

  updateActiveChannelData(){
    this.activeChannelData = this.allUserChannels.find(channel => channel.id === this.activeChannel);
  }


  openEditChannelDialog() {
    const rect = this.channelTitleDiv.nativeElement.getBoundingClientRect();
    this.dialogPosition = {
      top: `${rect.bottom}px`,
      left: `${rect.left}px`,
    };
    this.editChannelDialogOpened = true;
  }
  
  closeEditDialog() {
    this.editChannelDialogOpened = false;
  }
}
