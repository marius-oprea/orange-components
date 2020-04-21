import { Injectable, Type } from '@angular/core';
import { OverlayService } from '../overlay/overlay.service';

@Injectable()
export class DialogService {
  constructor(private overlayService: OverlayService) {
  }

  open(component: Type<any>, isModal: boolean = true) {
    // this.close(component);

    this.overlayService.attach(component, null, true, isModal);
  }

  close(component: Type<any>) {
    this.overlayService.detach(component);
  }
}
