import { Component, OnInit, forwardRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineEditComponent),
  multi: true
};

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  providers: [VALUE_ACCESSOR],
  styleUrls: ['./inline-edit.component.css']
})
export class InlineEditComponent implements OnInit, OnChanges {

  @Input() label: string = "Enter value here";
  @Input() required: boolean = true;
  _value: string = '';
  preValue: string = '';
  editing: boolean = false;
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(localStorage.getItem('profile'));
    var contact = JSON.parse(localStorage.getItem('profile'));
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = chng.currentValue;
      const prev = chng.previousValue;
      for (var i = 0; i < contact.length; i++) {
        if (cur != prev) {
          contact[i].FirstName = cur;
          contact[i].LastName =  cur;
          contact[i].MobileNumber = cur;
        }
      }
    }
    localStorage.setItem('profile', JSON.stringify(contact));
  }

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: any) {
    this._value = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  onBlur($event: Event) {
    this.editing = false;
    if (this._value == "") {
      this._value = "No value available";
    }
  }

  beginEdit(value) {
    this.preValue = value;
    this.editing = true;
  }

}
