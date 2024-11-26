import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-channel-dialog',
  standalone: true,
  imports: [],
  templateUrl: './add-channel-dialog.component.html',
  styleUrl: './add-channel-dialog.component.scss'
})
export class AddChannelDialogComponent {
  @Output() dialogStateChange = new EventEmitter<boolean>();

  dialogOpened = true;


  
  closeDialog(){
    this.dialogOpened = false;
    this.dialogStateChange.emit(this.dialogOpened);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
}

}
