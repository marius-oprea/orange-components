import { NgModule } from '@angular/core';
import { ToasterService } from './toaster.service';
import { ToasterComponent } from './toaster.component';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  providers: [ToasterService],
  imports: [OverlayModule.forChild()],
})
export class ToasterModule {
}
