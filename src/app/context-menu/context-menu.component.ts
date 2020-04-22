import {
  Component,
  TemplateRef,
  AfterViewInit,
  ChangeDetectorRef,
  DoCheck,
  OnInit,
  ViewContainerRef,
  ViewChild,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements DoCheck,/* OnChanges,*/ OnInit, AfterViewInit {
  // isVisible$: BehaviorSubject<boolean>;
  isVisible: boolean;
  temp: BehaviorSubject<any>;
  data;
  template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  // @Input() itemTemplate: TemplateRef<HTMLElement>;
  // @ViewChild('container', { read: ViewContainerRef }) container;

  constructor(private cd: ChangeDetectorRef, private viewContainerRef: ViewContainerRef) {
    // this.isVisible$.next(true);
    //this.isVisible$ = new BehaviorSubject(false);
    // this.cd.detectChanges();
  }

  ngDoCheck() {
    console.log('check:', this.data);
    // this.template = this.data.template;
    // this.container.createEmbeddedView(this.template);
    // this.viewContainerRef.createEmbeddedView(this.template);

    // setTimeout(() => console.log('check:', this.data), 1000);
    // this.cd.markForCheck();
  }

/*
  ngOnChanges(simpleChanges: SimpleChanges) {
    
    // if (this.temp) {
      console.log('data check: ', this.temp)
    // }
    
  }
*/
  ngOnInit() {
    // this.data = new BehaviorSubject({});
  }

  ngAfterViewInit() {
    // this.cd.detectChanges();
    if (this.data) {
      // this.template = this.data.template;
      console.log(this.data);

      this.container.createEmbeddedView(this.data.template);

      this.isVisible = this.data.isVisible;
      this.cd.detectChanges();


      // this.isVisible$ = new BehaviorSubject(this.data.isVisible);
      // this.isVisible$.next(this.data.isVisible);
      // this.cd.detectChanges();
    }
    // this.viewContainerRef.createEmbeddedView( this.template, {} );
  }
}
