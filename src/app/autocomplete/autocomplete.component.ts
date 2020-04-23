/*
https://stackblitz.com/edit/angular-custom-formcontrols?file=src%2Fapp%2Fjson-input.component.ts
*/

import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  forwardRef,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(()=> AutocompleteComponent), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => AutocompleteComponent), multi: true}
  ],
})
export class AutocompleteComponent implements OnChanges, ControlValueAccessor, Validator {
  @Input() selectedItem: any;
  @Input() items: any[];
  @ViewChild('list') listControl: ElementRef<HTMLDivElement>;
  @ViewChild('input') inputControl: ElementRef<HTMLInputElement>;
  @Output() changed: EventEmitter<any>;
  isInputFocused: boolean;
  isListFocused: boolean;
  inputValue: string;
  val;
  isValid: boolean;
  @Input() disabled: boolean;
  @Input() label: string;

  isVisible: boolean;
  selectedItemIndex: number;

  onChange: any = () => { };
  onTouched: any = () => { };

  public validate(c: FormControl) {
    return this.isValid ? null : { valid: false };
  }

  constructor(private renderer: Renderer2) {
    this.isValid = false;
    this.changed = new EventEmitter();
    this.isVisible = false;
    this.selectedItemIndex = -1;
  }

  onKeyUp(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowDown': {
        if (this.selectedItemIndex < this.items.length - 1) {
          this.selectedItemIndex ++;
          this.selectItem(this.items[this.selectedItemIndex], this.selectedItemIndex);
        }
        break;
      }

      case 'ArrowUp': {
        if (this.selectedItemIndex > 0) {
          this.selectedItemIndex --;
          this.selectItem(this.items[this.selectedItemIndex], this.selectedItemIndex);
        }
        break;
      }
    }
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (this.selectedItem) {
      this.inputValue = this.selectedItem.label;
    }
  }

  onClick(event) {
    this.isVisible = true;
  }

  onFocusInput(event) {
    this.isInputFocused = true;
    this.isListFocused = false;
  }

  onBlurInput(event) {
    this.isInputFocused = false;
    this.hideList();
  }

  onFocusList(event) {
    this.isListFocused = true;
    this.isInputFocused = false;
  }

  onBlurList(event) {
    this.isListFocused = false;
    this.hideList();
  }

  hideList() {
    setTimeout(() => {
      if (!this.isInputFocused && !this.isListFocused) {
        this.isVisible = false;
      }
    }, 200);
  }

  onSelectedItem(event: MouseEvent, item, index) {
    this.selectItem(item, index);
  }

  selectItem(item, index) {
    this.selectedItem = item;
    this.inputValue = this.selectedItem.label;
    this.isValid = true;
    this.selectedItemIndex = index;
    this.onChange(this.inputControl);
    this.changed.emit(this.selectedItem);
  }

  onInput(event) {
    this.inputValue = event;

    this.isValid = false;
    this.onChange(this.inputControl);
  }

  updateHaystack(input: string, needle: string) {
    if (input) {
      return input.replace(new RegExp(needle, 'g'), '<b>' + needle + '</b>');
    }

    return input;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
