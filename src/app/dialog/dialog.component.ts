import { Component, ComponentFactoryResolver, AfterViewInit, ViewChild, ComponentRef, Type, OnDestroy } from '@angular/core';
import { DialogDirective } from './dialog.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;
  @ViewChild(DialogDirective) insertionPoint: DialogDirective;
  component: Type<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
  }
}
