import { NgModule } from '@angular/core';
import { DialogService } from './dialog.service';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  imports: [OverlayModule],
  providers: [DialogService]
})
export class DialogModule {
}
