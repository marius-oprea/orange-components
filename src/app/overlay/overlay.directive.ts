import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHost]',
})
export class OverlayDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
