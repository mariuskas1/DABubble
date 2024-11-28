import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Channel } from './../../../../models/channel.class';

@Component({
  selector: 'app-show-members-dialog',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './show-members-dialog.component.html',
  styleUrl: './show-members-dialog.component.scss'
})
export class ShowMembersDialogComponent {
  @Input() channelData!: Channel;
  @Input() position!: { top: string; left: string };
  @Output() dialogClosed = new EventEmitter<void>();


  closeDialog(){
    this.dialogClosed.emit();
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
