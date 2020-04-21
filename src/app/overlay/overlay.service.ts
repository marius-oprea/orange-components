import {
  Injectable,
  Type,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Renderer2,
  RendererFactory2,
  Inject,
  ElementRef
} from '@angular/core';
import { OverlayComponent } from './overlay.component';
import { DOCUMENT } from '@angular/common';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class OverlayService {
  private component: Type<any>;
  private componentRef: any;
  private renderer: Renderer2;
  private element;
  // private parentElementRef: ElementRef;
  showFullscreen: boolean;
  // private overlayRef: Subject<any>;

  overlayMap: {[uniqueKey: string]: any};


  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) {

    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.overlayMap = {};
  }

  attach(component: Type<any>, data?: any, isFullscreen: boolean = true, isModal: boolean = true): Observable<any> {
    if (this.overlayMap[component.name] && this.overlayMap[component.name].isAttached) {
      return;
    }

    const overlayItem = {
      isAttached: false,
      componentRef: null,
      overlayRef: null,
      parentElementRef: null,
      element: null
    };

    overlayItem.isAttached = true;

    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(OverlayComponent)
      .create(this.injector);

    this.componentRef.instance.overlayService = this;
    this.componentRef.instance.component = component;

    if (isFullscreen !== undefined) {
      this.componentRef.instance.isFullscreen$.next(isFullscreen);
    }
    this.componentRef.instance.isModal = isModal;

    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.element = this.renderer.createElement('div');

    this.element.setAttribute('id', 'orange-overlay');
    this.element.appendChild(domElem);
    this.renderer.appendChild(this.document.body, this.element);

    overlayItem.componentRef = this.componentRef;
    overlayItem.element = this.element;

    if (this.overlayMap[component.name] && this.overlayMap[component.name].parentElementRef) {
      overlayItem.parentElementRef = this.overlayMap[component.name].parentElementRef;
    }

    overlayItem.overlayRef = new Subject();
    this.overlayMap[component.name] = overlayItem;
    if (!isFullscreen) {
      this.setElementPosition(component.name);
    }


    return this.overlayMap[component.name].overlayRef;
  }

  setElementPosition(overlayKey: string) {
    if (this.overlayMap[overlayKey] && this.overlayMap[overlayKey].parentElementRef && this.overlayMap[overlayKey].element) {
      setTimeout(() => {
        const elementRectangle = this.overlayMap[overlayKey].element.querySelector('#overlayContent').getBoundingClientRect()
        const parentRectangle = this.overlayMap[overlayKey].parentElementRef.nativeElement.getBoundingClientRect();

        let left = parentRectangle.x;
        let top = parentRectangle.y + parentRectangle.height;

        if (parentRectangle.x + parentRectangle.width + elementRectangle.width >= window.innerWidth) {
          left = window.innerWidth - elementRectangle.width;
        }

        if (parentRectangle.y + parentRectangle.height + elementRectangle.height >= window.innerHeight) {
          top = window.innerHeight - elementRectangle.height - parentRectangle.height;
        }

        this.overlayMap[overlayKey].element.style.position = 'absolute';
        this.overlayMap[overlayKey].element.style.left = left + 'px';
        this.overlayMap[overlayKey].element.style.top = top + 'px';
      }, 0);
    }
  }

  detach(component: Type<any>) {
    if (this.overlayMap[component.name] && this.overlayMap[component.name].isAttached) {
      this.appRef.detachView(this.overlayMap[component.name].componentRef.hostView);
      this.renderer.removeChild(this.document.body, this.overlayMap[component.name].element);
      this.overlayMap[component.name].isAttached = false;
      this.overlayMap[component.name].overlayRef.next();
    }
  }

  setParentElement(overlayKey, parentRef: ElementRef) {
    const overlayItem = {
      isAttached: false,
      componentRef: null,
      parentElementRef: null,
      element: null
    };
    this.overlayMap[overlayKey] = overlayItem;
    this.overlayMap[overlayKey].parentElementRef = parentRef;
  }
}
