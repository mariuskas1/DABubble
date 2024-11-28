import { Component, OnInit, inject, Input, Output, EventEmitter } from '@angular/core';
import { ChannelService } from '../../../../services/channel.service';
import { Observable } from 'rxjs';
import { Channel } from './../../../../models/channel.class';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-channel-dialog',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './edit-channel-dialog.component.html',
  styleUrl: './edit-channel-dialog.component.scss'
})
export class EditChannelDialogComponent {
  @Input() channelData!: Channel;
  @Input() position!: { top: string; left: string };
  @Output() dialogClosed = new EventEmitter<void>();

  firestore: Firestore = inject(Firestore);

  editingChannelName = false;
  editingChannelDescription = false;

  constructor(private channelService: ChannelService) {}


  closeDialog(){
    this.dialogClosed.emit();
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }


  async editChannel(){
    const channelDocRef = doc(this.firestore, `channels/${this.channelData.id}`);
    try {
      await updateDoc(channelDocRef, { ...this.channelData });
      this.closeDialog();
    } catch (error) {
      console.error(error);
    }
  }

  editChannelName(){
    if(!this.editingChannelName){
      this.editingChannelName = true;
    } else {
      this.editingChannelName = false;
      // this.editChannel();
    }
  }


  editChannelDescription(){
    if(!this.editingChannelDescription){
      this.editingChannelDescription = true;
    } else {
      this.editingChannelDescription = false;
      // this.editChannel();
    }
  }



}
