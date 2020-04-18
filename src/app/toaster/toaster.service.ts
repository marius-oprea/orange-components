import { Injectable } from '@angular/core';
import { OverlayService } from '../overlay/overlay.service';
import { ToasterComponent } from './toaster.component';

@Injectable()
export class ToasterService {
  timeout: any;

  constructor(private overlayService: OverlayService) {
  }

  open() {
    this.close();

    this.overlayService.attach(ToasterComponent, null, false);
    this.timeout = setTimeout(() => this.close(), 5000);
  }

  close() {
    clearTimeout(this.timeout);
    this.overlayService.detach(ToasterComponent);
  }
}
