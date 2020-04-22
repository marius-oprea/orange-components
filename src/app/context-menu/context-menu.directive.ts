import {
  Directive,
  ViewContainerRef,
  HostListener,
  ComponentRef,
  AfterViewInit,
  ElementRef,
  Input,
  TemplateRef
} from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';
import { OverlayService } from '../overlay/overlay.service';

@Directive({
  selector: '[appContextMenu]'
})
export class ContextMenuDirective implements AfterViewInit {
  contextMenuRef: ComponentRef<ContextMenuComponent>;
  isVisible: boolean;
  parentRef: ElementRef;
  @Input() template: TemplateRef<any>;

@HostListener('click', ['$event'])
show(event) {
  this.parentRef = event.target;
  this.isVisible = true;
}

  constructor(
    public viewContainerRef: ViewContainerRef,
    private overlayService: OverlayService) {
  }

  ngAfterViewInit() {
    window.addEventListener('click', (e: any) => {
        if (document.getElementById('context-overlay') && document.getElementById('context-overlay').contains(e.target)) {
          // clicked inside context menu
        } else {
          // clicked outside context menu
          if (!this.overlayService.isAttached(ContextMenuComponent) && this.isVisible) {            

            const data = {isVisible: true, template: this.template};
            this.overlayService.attach(ContextMenuComponent, data, false, false);

            this.overlayService.setParentElement(ContextMenuComponent.name, this.parentRef);
            this.overlayService.setElementPosition(ContextMenuComponent.name);
          } else {
            this.isVisible = false;
            this.overlayService.detach(ContextMenuComponent);
          }
        }
    });
  }
}
