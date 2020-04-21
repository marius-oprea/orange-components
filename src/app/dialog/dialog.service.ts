import { Injectable, Type } from '@angular/core';
import { OverlayService } from '../overlay/overlay.service';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {
  constructor(private overlayService: OverlayService) {
  }

  open(component: Type<any>) {
    // this.close(component);

    this.overlayService.attach(component, null, true);
  }

  close(component: Type<any>) {
    this.overlayService.detach(component);
  }
}
