import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatTime'
})

export class TimePipe implements PipeTransform {
    // value : 就是传入的值
    // ...args : 参数集合(用了...拓展符),会把数组内的值依次作为参数传入
    // ...args可以改成我们常规的写法(value:any,start:number,end:number)

    // 接受以秒为单位的值
    transform(value: any, ...args: any[]): string {
        if (value) {
            if(String(value).length > 3) {
                value = String(value).substring(0,3);
            }
            let minstr, seconstr;
            const minutes = Math.floor(parseInt(value, 10) / 60);
            if (minutes < 10) {
                minstr = '0' + minutes.toString();
            } else {
                minstr = minutes.toString();
            }
            const seconds = parseInt(value, 10) % 60;
            if (seconds < 10) {
                seconstr = '0' + seconds.toString();
            } else {
                seconstr = seconds.toString();
            }
            return minstr + ':' + seconstr;
        } else {
            return '00:00';
        }
    }
}
