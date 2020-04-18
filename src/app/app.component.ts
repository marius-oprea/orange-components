import { Component } from '@angular/core';
import { ToasterService } from './toaster/toaster.service';
import { OverlayService } from './overlay/overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private toasterService: ToasterService, public overlayService: OverlayService) {
  }

  onToaster(event) {
    this.toasterService.open();
  }

  onTooltip(event) {
    // return true;
    alert('click');
  }
}
