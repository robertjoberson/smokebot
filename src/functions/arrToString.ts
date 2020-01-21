export function arrToString(arr) {
    let str = '';
    arr.forEach(function (i, index) {
        str += i;
        if (index != (arr.length - 1)) {
            str += ' ';
        };
    });
    return str;
}