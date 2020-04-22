import { NgModule } from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';
import { OverlayModule } from '../overlay/overlay.module';
import { ContextMenuDirective } from './context-menu.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ContextMenuComponent, ContextMenuDirective],
  imports: [CommonModule, OverlayModule],
  exports: [ContextMenuComponent, ContextMenuDirective]
})
export class ContextMenuModule {
}
