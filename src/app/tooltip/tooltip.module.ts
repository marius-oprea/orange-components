import { NgModule } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  declarations: [TooltipDirective],
  imports: [OverlayModule.forChild()],
  exports: [TooltipDirective]
})
export class TooltipModule {
}
