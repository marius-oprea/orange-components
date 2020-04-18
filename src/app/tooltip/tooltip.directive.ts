import { Directive, OnDestroy, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { OverlayService } from '../overlay/overlay.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  @HostListener('mouseenter', ['$event'])
  show(event) {
    this.overlayService.attach(TooltipComponent, null, false);
  }

  @HostListener('mouseleave', ['$event'])
  hide(event) {
    this.overlayService.detach(TooltipComponent);
  }

  constructor(private overlayService: OverlayService, private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.overlayService.setParentElement(TooltipComponent.name, this.elementRef);
  }

  ngOnDestroy() {
    this.overlayService.detach(TooltipComponent);
  }
}
