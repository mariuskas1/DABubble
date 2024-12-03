import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Channel } from './../../../../models/channel.class';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { User } from './../../../../models/user.class';

@Component({
  selector: 'app-add-members-dialog',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './add-members-dialog.component.html',
  styleUrl: './add-members-dialog.component.scss'
})
export class AddMembersDialogComponent {
  @Input() channelData!: Channel;
  @Input() allUsers!: User[];
  @Input() addMembersDialogPosition!: { top: string; left: string };
  @Output() dialogClosed = new EventEmitter<void>();

  firestore: Firestore = inject(Firestore);


  newMemberName = '';
  channelMembers: string[] = this.channelData?.userIds;;
  newMemberId = '';

  userSearchQuery: string = '';
  foundUsers?: User[] = [];
  displaySearchResultContainer = false;
  selectedUsers?: User[] = [];



  closeDialog(){
    this.dialogClosed.emit();
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  addMember(){
    this.getNewMemberId();
    this.updateChannelMembers();    
  }

  getNewMemberId(){
    const newMember = this.allUsers.find((user) => user.firstName + user.lastName === this.newMemberName.trim());
    if (newMember){
      this.newMemberId = newMember.id;
    }
  }

  updateChannelMembers(){
    if(this.newMemberId){
      this.channelMembers.push(this.newMemberId);
      this.channelData.userIds = this.channelMembers;
      this.updateChannel();
    }
  }


  async updateChannel(){
    const channelDocRef = doc(this.firestore, `channels/${this.channelData.id}`);
    try {
      await updateDoc(channelDocRef, { ...this.channelData });
    } catch (error) {
      console.error(error);
    }
  }

  searchUsers(event: Event){
    const inputElement = event.target as HTMLInputElement;
    this.userSearchQuery = inputElement.value.toLowerCase().trim();

    if(this.userSearchQuery.length >= 3){
      this.foundUsers = this.allUsers.filter(user => 
        (user.firstName.toLowerCase().includes(this.userSearchQuery) || 
        user.lastName.toLowerCase().includes(this.userSearchQuery)) &&
        !this.selectedUsers?.some(selectedUser => selectedUser.id === user.id)
      );
    } else {
      this.foundUsers = [];
    }

    this.displaySearchResultContainer = this.foundUsers.length > 0;
  }


  addFoundUserToChannel(id: string){
    this.channelData.userIds.push(id);
    const selectedUser = this.allUsers.find(user => user.id === id);

    if(selectedUser && !this.selectedUsers?.some(selectedUser => selectedUser.id === id)){
      this.selectedUsers?.push(selectedUser);
    }

    this.userSearchQuery = '';
    this.displaySearchResultContainer = false;
    this.foundUsers = [];
  }    


  cancelUserAdding(id:string){
    this.channelData.userIds = this.channelData.userIds.filter(userId => userId !== id);
    this.selectedUsers = this.selectedUsers?.filter(user => user.id !== id);
  }


  
}
