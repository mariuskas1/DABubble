import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Channel } from './../../models/channel.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-channel-dialog',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './add-channel-dialog.component.html',
  styleUrl: './add-channel-dialog.component.scss'
})
export class AddChannelDialogComponent {
  @Output() dialogStateChange = new EventEmitter<boolean>();

  dialogOpened = false;
  mainDialogOpened = true;
  addPeopleDialogOpened = false;
  channel = new Channel();
  firestore: Firestore = inject(Firestore);

  channelMemberNames?: string[];
  selectedOption: string = 'option1';
  
    closeDialog(){
      this.dialogOpened = false;
      this.dialogStateChange.emit(this.dialogOpened);
    }

    stopPropagation(event: MouseEvent): void {
      event.stopPropagation();
    }


    displayAddPeopleDialog(){
      this.mainDialogOpened = false;
      this.addPeopleDialogOpened = true;
    }

    async createNewChannel(){
      console.log(this.channel);
      try {
        // add users to this.channel
        const channelCollection = collection(this.firestore, 'channels');
        await addDoc(channelCollection, { ...this.channel});
        this.channel = new Channel();
        this.closeDialog();
      } catch (error) {
        console.error(error);
      }


    }



}
