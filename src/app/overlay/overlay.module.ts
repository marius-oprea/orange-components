import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayComponent } from './overlay.component';
import { OverlayDirective } from './overlay.directive';
import { OverlayService } from './overlay.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [OverlayComponent, OverlayDirective],
  imports: [CommonModule],
  providers: [OverlayService],
})
export class OverlayModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: OverlayModule,
      providers: [OverlayService]
    };
  }

  public static forChild(): ModuleWithProviders {
    return {
      ngModule: OverlayModule,
      providers: [OverlayService]
    };
   }
}
