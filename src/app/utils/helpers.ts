export function inputValueToBoolean(value: boolean | string): boolean {
    return value === '' || (value && value !== 'false');
}

export function isUndefined(value: any) {
    return value === undefined;
}

export function isNull(value: any) {
    return value === null;
}

export function isUndefinedOrNull(value: any) {
    return isUndefined(value) || isNull(value);
}

export function isArray(value: any): boolean {
    return value && baseGetTag(value) === '[object Array]';
}

export function isEmpty(value: any): boolean {
    return !(isArray(value) && value.length > 0);
}

export function isString(value: any): boolean {
    return value && baseGetTag(value) === '[object String]';
}

function isObjectLike(value: any) {
    return typeof value === 'object' && value !== null;
}

function baseGetTag(value: any) {
    const objectProto = Object.prototype;
    const hasOwnProperty = objectProto.hasOwnProperty;
    const toString = objectProto.toString;
    const symToStringTag =
        typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined;

    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    if (!(symToStringTag && symToStringTag in Object(value))) {
        return toString.call(value);
    }
    const isOwn = hasOwnProperty.call(value, symToStringTag);
    const tag = value[symToStringTag];
    let unmasked = false;
    try {
        value[symToStringTag] = undefined;
        unmasked = true;
    } catch (e) {}

    const result = toString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag;
        } else {
            delete value[symToStringTag];
        }
    }
    return result;
}

export function isNumber(value: any) {
    return (
        typeof value === 'number' ||
        (isObjectLike(value) && baseGetTag(value) === '[object Number]')
    );
}

export function isObject(value: any) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    const type = typeof value;
    return !!value && (type === 'object' || type === 'function');
}

export function isFunction(value: any) {
    const type = typeof value;
    return !!value && type === 'function';
}

export function isDate(value: any) {
    const type = typeof value;
    return !!value && type === 'object' && !!value.getTime;
}

export function coerceArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

export function get(object: any, path: string, defaultValue?: any) {
    const paths = path.split('.');
    let result = object[paths.shift()];
    while (result && paths.length) {
        result = result[paths.shift()];
    }
    return result === undefined ? defaultValue : result;
}

export function set(object: any, path: string, value: any) {
    if (object == null) {
        return object;
    }
    const paths = path.split('.');
    let index = -1;
    const length = paths.length;
    const lastIndex = length - 1;
    let nested = object;
    while (nested !== null && ++index < length) {
        const key = paths[index];
        if (isObject(nested)) {
            if (index === lastIndex) {
                nested[key] = value;
                nested = nested[key];
                break;
            } else {
                if (nested[key] == null) {
                    nested[key] = {};
                }
            }
        }
        nested = nested[key];
    }
    return object;
}

export function isBoolean(value: any) {
    return (
        value === true ||
        value === false ||
        (isObjectLike(value) && baseGetTag(value) === '[object Boolean]')
    );
}

export function fromArray(value: any): any[] {
    if (Array.from && isFunction(Array.from)) {
        return Array.from(value);
    } else {
        return Array.prototype.slice.call(value);
    }
}

export function htmlElementIsEmpty(element: HTMLElement) {
    if (element && element.childNodes) {
        const nodes = element.childNodes;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (
                node.nodeType === Node.ELEMENT_NODE &&
                (node as HTMLElement).outerHTML.toString().trim().length !== 0
            ) {
                return false;
            } else if (
                node.nodeType === Node.TEXT_NODE &&
                node.textContent.toString().trim().length !== 0
            ) {
                return false;
            } else if (node.nodeType !== Node.COMMENT_NODE) {
                return false;
            }
        }
    }
    return true;
}

export function hexToRgb(hexValue: any, alpha: number): string {
    const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const hex = hexValue.replace(
        rgx,
        (m: any, r: any, g: any, b: any) => r + r + g + g + b + b
    );
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const resultR = parseInt(rgb[1], 16);
    const resultG = parseInt(rgb[2], 16);
    const resultB = parseInt(rgb[3], 16);
    if (alpha) {
        return `rgba(${resultR},${resultG},${resultB},${alpha})`;
    } else {
        return `rgb(${resultR},${resultG},${resultB})`;
    }
}



export function formatLyric(text: any) {
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

export function formatDate(value: any): string {
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