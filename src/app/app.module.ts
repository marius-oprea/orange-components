import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToasterModule } from './toaster/toaster.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { OverlayModule } from './overlay/overlay.module';
import { DialogModule } from './dialog/dialog.module';
import { TestDialogModule } from './TestDialog/test-dialog.module';
import { ContextMenuModule } from './context-menu/context-menu.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToasterModule,
    TooltipModule,
    TestDialogModule,
    OverlayModule,
    ContextMenuModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
