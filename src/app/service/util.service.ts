import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
    public formatDate(value: any): string {
        if (value) {
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
    public formatLyric(text) {
        let lines = text.split('\n');  // 用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        const pattern = /\[\d{2}:\d{2}.\d{1,3}\]/g;
        const result = []; // 保存最终结果的数组
        // 去掉不含时间的行
        while (!pattern.test(lines[0])) {
            lines = lines.slice(1);
        }
        // 上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
        lines[lines.length - 1].length === 0 && lines.pop();
        lines.forEach(function (v, i, a) {
            const time = v.match(pattern); // 提取出时间[xx:xx.xx]
            const value = v.replace(pattern, ''); // 提取歌词
            // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
            time.forEach(function (v1, i1, a1) {
                // 去掉时间里的中括号得到xx:xx.xx
                let t = v1.slice(1, -1).split(':');
                // 将结果压入最终数组
                result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value, false]);
            });
        });
        // 最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
        result.sort(function (a, b) {
            return a[0] - b[0];
        });
        return result;
    }

    // 设置sessionStorage
    public addToPlayList(key: string, value: string) {
        if (sessionStorage.getItem(key)) {
            if (sessionStorage.getItem(key).includes(value)) {
                return;
            } else {
                sessionStorage.setItem(key, sessionStorage.getItem(key) + ',' + value);
            }
        } else {
            sessionStorage.setItem(key, value);
        }
    }

    // 设置localStorage
    
}




