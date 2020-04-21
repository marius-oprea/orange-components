import { NgModule } from '@angular/core';
import { TestDialogComponent } from './test-dialog.component';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  declarations: [TestDialogComponent],
  imports: [DialogModule],
  exports: [TestDialogComponent]
})
export class TestDialogModule {
}
