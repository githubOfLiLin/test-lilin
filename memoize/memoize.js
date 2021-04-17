"use strict";
exports.__esModule = true;
// 使用闭包实现对上次执行结果的缓存
function memoize(fn) {
    var memoizedresult = null; // 对上一次结果的缓存
    var preArgumenets = null;
    return function memoizedFn() {
        var curArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            curArguments[_i] = arguments[_i];
        }
        var isArgumentsSame = getIsArgumenetsSame(preArgumenets, curArguments);
        if (isArgumentsSame && memoizedresult) {
            console.log('use cache');
            return memoizedresult;
        }
        else {
            preArgumenets = curArguments.slice();
            return memoizedresult = fn.apply(void 0, curArguments);
        }
    };
}
exports.memoize = memoize;
// 浅比较判断两次的参数是否相同
function getIsArgumenetsSame(preArgumenets, curArguments) {
    var isArgumentsSame = false;
    if (!preArgumenets) {
        return isArgumentsSame;
    }
    for (var i = 0; i < curArguments.length; i++) {
        if (curArguments[i] !== preArgumenets[i]) {
            isArgumentsSame = false;
            return isArgumentsSame;
        }
    }
    isArgumentsSame = true;
    return isArgumentsSame;
}
/*** example ***/
// 单个参数
function sqrt(n) { return Math.sqrt(n); }
var cachedSqrt = memoize(sqrt);
console.log(cachedSqrt(4));
console.log(cachedSqrt(4));
// 多个参数
function sum(m, n) { return m + n; }
var cachedSum = memoize(sum);
console.log(cachedSum(2, 4));
console.log(cachedSum(2, 4));
// 引用类型参数
function getArrLength(arr) { return arr.length; }
var cachedGetArrLength = memoize(getArrLength);
console.log(cachedGetArrLength([2, 4]));
console.log(cachedGetArrLength([2, 4]));
