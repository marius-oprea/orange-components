import { Injectable, Type } from '@angular/core';
import { OverlayService } from '../overlay/overlay.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DialogService {
  dialogRef: Subject<any>;

  constructor(private overlayService: OverlayService) {
  }

  open(component: Type<any>, isModal: boolean = true): Observable<any> {
    this.dialogRef = new Subject();
    this.overlayService.attach(component, null, true, isModal).subscribe(result => {
      this.dialogRef.next();
    });

    return this.dialogRef;
  }

  close(component: Type<any>) {
    this.overlayService.detach(component);
  }
}
