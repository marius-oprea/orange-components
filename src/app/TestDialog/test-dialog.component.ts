import { Component } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-test-tdialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss']
})
export class TestDialogComponent {
  constructor(private dialogService: DialogService) {

  }

  onClose(event) {
    this.dialogService.close(TestDialogComponent);
  }
}
