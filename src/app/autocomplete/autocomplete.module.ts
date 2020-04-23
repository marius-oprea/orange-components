import { NgModule } from '@angular/core';
import { AutocompleteComponent } from './autocomplete.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [SharedModule],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule {
}
