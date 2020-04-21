import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToasterModule } from './toaster/toaster.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { OverlayModule } from './overlay/overlay.module';
import { DialogModule } from './dialog/dialog.module';
import { TestDialog } from './TestDialog/test-dialog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToasterModule,
    TooltipModule,
    TestDialog,
    OverlayModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
