import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { ChannelService } from '../../../services/channel.service';
import { Observable } from 'rxjs';
import { Channel } from './../../../models/channel.class';
import { User } from './../../../models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { EditChannelDialogComponent } from './edit-channel-dialog/edit-channel-dialog.component';
import { CommonModule } from '@angular/common';
import { ShowMembersDialogComponent } from './show-members-dialog/show-members-dialog.component';
import { AddMembersDialogComponent } from './add-members-dialog/add-members-dialog.component';

@Component({
  selector: 'app-channel-chat',
  standalone: true,
  imports: [ EditChannelDialogComponent, CommonModule, ShowMembersDialogComponent, AddMembersDialogComponent ],
  templateUrl: './channel-chat.component.html',
  styleUrl: './channel-chat.component.scss'
})
export class ChannelChatComponent {
  @ViewChild('channelTitleDiv', { static: false }) channelTitleDiv!: ElementRef;
  @ViewChild('showMembersDiv', { static: false }) showMembersDiv!: ElementRef;
  @ViewChild('addMembersDiv', { static: false }) addMembersDiv!: ElementRef;

  dialogPosition: { top: string; left: string } = { top: '0px', left: '0px' };
  addMembersDialogPosition: { top: string; right: string } = { top: '0px', right: '0px' };
  showMembersDialogPosition: { top: string; right: string } = { top: '0px', right: '0px' };

  editChannelDialogOpened = false;
  showMembersDialogOpened = false;
  addMembersDialogOpened = false;
  activeChannel: string | null = null;
  activeChannelData!: Channel | undefined;
  channels$!: Observable<Channel[]>;
  allUsers$!: Observable<User[]>;
  allUserChannels: Channel[] = [];
  users: User[] = [];
  firestore: Firestore = inject(Firestore);

  avatars: string[] = [
    './../../../../assets/img/Avatar 1.png',
    './../../../../assets/img/Avatar.png',
    './../../../../assets/img/Avatar 3.png'
  ];

  constructor(private channelService: ChannelService) {}


  ngOnInit() {
    this.channelService.activeChannel$.subscribe(channelId => {
      this.activeChannel = channelId;
      this.updateActiveChannelData();
    });

    this.getUserChannels();
    this.getAllUsers();
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


  getAllUsers(){
    const userCollection = collection(this.firestore, 'users');
    this.allUsers$ = collectionData(userCollection, { idField: 'id'}) as Observable<User[]>;

    this.allUsers$.subscribe((changes) => {
      this.users = Array.from(new Map(changes.map(user => [user.id, user])).values());
    })
  }


  openEditChannelDialog() {
    const rect = this.channelTitleDiv.nativeElement.getBoundingClientRect();
    this.dialogPosition = {
      top: `${rect.bottom + 10}px`,
      left: `${rect.left}px`,
    };
    this.editChannelDialogOpened = true;
  }

  openAddMembersDialog() {
    const rect = this.channelTitleDiv.nativeElement.getBoundingClientRect();
    this.addMembersDialogPosition = {
      top: `${rect.bottom + 10}px`,
      right: `${rect.right -150}px`,
    };
    this.addMembersDialogOpened = true;
  }

  openShowMembersDialog() {
    const rect = this.channelTitleDiv.nativeElement.getBoundingClientRect();
    this.showMembersDialogPosition = {
      top: `${rect.bottom + 10}px`,
      right: `${rect.right + 185}px`,
    };
    this.showMembersDialogOpened = true;
  }
  
  closeEditDialog() {
    this.editChannelDialogOpened = false;
  }

  closeAddMembersDialog(){
    this.addMembersDialogOpened = false;
  }

  closeShowMembersDialog(){
    this.showMembersDialogOpened = false;
  }
}
