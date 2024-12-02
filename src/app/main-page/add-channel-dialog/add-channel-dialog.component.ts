import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Channel } from './../../models/channel.class';
import { Observable } from 'rxjs';
import { ChannelService } from '../../services/channel.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { channelData } from '../../types/types';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-add-channel-dialog',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './add-channel-dialog.component.html',
  styleUrl: './add-channel-dialog.component.scss'
})
export class AddChannelDialogComponent {
  @Output() dialogStateChange = new EventEmitter<boolean>();

  dialogOpened: boolean = false;
  mainDialogOpened: boolean = true;
  addPeopleDialogOpened: boolean = false;
  channel = new Channel();
  channelMemberNames?: string[];
  selectedOption: string = 'option1';
  activeChannel: string | null = null;
  activeChannelData!: Channel | null;
  channels$!: Observable<Channel[]>;
  allUsers$!: Observable<User[]>;
  allUserChannels: Channel[] = [];
  users: User[] = [];
  

  firestore: Firestore = inject(Firestore);

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
    this.activeChannelData = this.allUserChannels.find(channel => channel.id === this.activeChannel) ?? null;
  }


  getAllUsers(){
    const userCollection = collection(this.firestore, 'users');
    this.allUsers$ = collectionData(userCollection, { idField: 'id'}) as Observable<User[]>;

    this.allUsers$.subscribe((changes) => {
      this.users = Array.from(new Map(changes.map(user => [user.id, user])).values());
    })
  }

  
    closeDialog(){
      this.dialogOpened = false;
      this.dialogStateChange.emit(this.dialogOpened);
    }


    stopPropagation(event: MouseEvent): void {
      event.stopPropagation();
    }


    getErrorMessage(errors:any): string{
      if(errors.required){
        return 'Bitte einen Namen eingeben.';
      }
      if (errors.minlength) {
        return `Der Name muss mindestens ${errors.minlength.requiredLength} Buchstaben lang sein.`;
      }
      return '';
    }


    displayAddPeopleDialog(ngForm: NgForm){
      if(ngForm.submitted && ngForm.form.valid){
        this.mainDialogOpened = false;
        this.addPeopleDialogOpened = true;
      }
    }

    async createNewChannel(){
      this.addMembersToChannel();
      try {
        const channelCollection = collection(this.firestore, 'channels');
        await addDoc(channelCollection, { ...this.channel});
        this.channel = new Channel();
        this.closeDialog();
      } catch (error) {
        console.error(error);
      }
    }


    addMembersToChannel(){
      if (this.selectedOption === 'option1' && this.activeChannelData){
        this.channel.userIds = this.activeChannelData.userIds;
      } else if (this.selectedOption === 'option2'){
        //push userIds to channelMembers on input first
        //set this.channel.userIds to this.channelMembers
      }
    }



}
