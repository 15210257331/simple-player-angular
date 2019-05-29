import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatTime'
})

export class TimePipe implements PipeTransform {
    // value : 就是传入的值
    // ...args : 参数集合(用了...拓展符),会把数组内的值依次作为参数传入
    // ...args可以改成我们常规的写法(value:any,start:number,end:number)
    transform(value: number, ...args: any[]): string {
        if (!value) {
            return '00:00';
        }
        let minstr;
        let seconstr;
        const minutes = Math.floor(value / 60);
        if (minutes < 10) {
            minstr = '0' + minutes.toString();
        } else {
            minstr = minutes.toString();
        }
        const seconds = value % 60;
        if (seconds < 10) {
            seconstr = '0' + seconds.toString();
        } else {
            seconstr = seconds.toString();
        }
        return minstr + ':' + seconstr;
    }
}
