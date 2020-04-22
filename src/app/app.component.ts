import { Component } from '@angular/core';
import { ToasterService } from './toaster/toaster.service';
import { OverlayService } from './overlay/overlay.service';
import { DialogService } from './dialog/dialog.service';
import { TestDialogComponent } from './TestDialog/test-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private toasterService: ToasterService, public overlayService: OverlayService, private dialogService: DialogService) {
  }

  onToaster(event) {
    this.toasterService.open();
  }

  onTooltip(event) {
    // return true;
    alert('click');
  }

  onModalDialog(event) {
    this.dialogService.open(TestDialogComponent).subscribe(res => console.log('modal inchis'));
  }

  onNonModalDialog(event) {
    this.dialogService.open(TestDialogComponent, false).subscribe(res => console.log('non-modal inchis'));
  }

  onTR(event) {

  }
}
