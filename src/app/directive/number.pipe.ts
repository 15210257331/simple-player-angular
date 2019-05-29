import { Pipe, PipeTransform } from '@angular/core';

// 管道装师符 ， name就是管道名称
@Pipe({
  name: 'numberToWan'
})


export class NumberPipe implements PipeTransform {
  // value : 就是传入的值
  // ...args : 参数集合(用了...拓展符),会把数组内的值依次作为参数传入
  // ...args可以改成我们常规的写法(value:any,start:number,end:number)
  transform(value: number | string, ...args: any[]): string {
    if (!value) {
      return '0.0万';
    }
    const number =  parseInt(value.toString(), 10);
    return Math.floor(number / 10000) + '.' + Math.floor((number % 10000) / 1000) + '万';
  }
}
