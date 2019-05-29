import { Component, OnInit, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,
  NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// 自定义验证函数
export function createCounterRangeValidator(maxValue: number, minValue: number) {
  return (control: AbstractControl): ValidationErrors => {
    return (control.value > maxValue || control.value < minValue) ?
    { 'rangeError': { current: control.value, max: maxValue, min: minValue } } :
    null;
  };
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CounterComponent),
      multi: true
    }
  ]
})
export class CounterComponent implements OnInit, ControlValueAccessor, OnChanges, Validator {

  @Input() _count = 0;

  @Input() counterRangeMax: number;

  @Input() counterRangeMin: number;

  _validator: ValidatorFn;

  propagateChange = (_: any) => {};

  get count() {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
    this.propagateChange(this._count);
  }

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any) { //  自定义表单初始化的时候会调用此函数设置模型中的值,将模型中的值绑定到视图或者dom属性中,参数value就是表单初始化时通过双向绑定或者单项绑定传进来的值
    this.count = value;
  }

  registerOnChange(fn: any) {  // 自定义控件的视图或模型的值改变的时候回出发此函数
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  // 监听输入属性变化，调用内部的_createValidator()方法，创建RangeValidator
  ngOnChanges(changes: SimpleChanges): void {
    if ('counterRangeMin' in changes || 'counterRangeMax' in changes) {
      this._createValidator();
    }
  }

  // 动态创建RangeValidator
  private _createValidator(): void {
    this._validator = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
  }

  // 执行控件验证
  validate(c: AbstractControl): ValidationErrors | null {
    return this.counterRangeMin == null || this.counterRangeMax == null ? null : this._validator(c);
  }
}
