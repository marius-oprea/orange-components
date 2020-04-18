import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, Type, ApplicationRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { OverlayDirective } from './overlay.directive';
import { OverlayService } from './overlay.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements AfterViewInit, OnDestroy {
  @ViewChild(OverlayDirective, {static: true}) appHost: OverlayDirective;
  component: Type<any>;
  data: any;
  overlayService: OverlayService;
  isFullscreen$: BehaviorSubject<boolean>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver) {

    this.isFullscreen$ = new BehaviorSubject(true);
  }

  ngAfterViewInit() {
    this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);

    const viewContainerRef = this.appHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef: any = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.data = this.data;
  }

  onClickOverlay(event: Event) {
    this.overlayService.detach(this.component);
  }

  ngOnDestroy() {
    this.overlayService.detach(this.component);
  }
}
