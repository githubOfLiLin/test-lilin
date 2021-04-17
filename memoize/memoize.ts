
// 使用闭包实现对上次执行结果的缓存
export function memoize(fn: (...args: any[]) => any) {
  let memoizedresult: any = null; // 对上一次结果的缓存
  let preArgumenets: any = null;
  return function memoizedFn(...curArguments: any[]) {
    let isArgumentsSame = getIsArgumenetsSame(preArgumenets, curArguments);
    if (isArgumentsSame && memoizedresult) {
      console.log('use cache');
      return memoizedresult;
    } else {
      preArgumenets = [...curArguments];
      return memoizedresult = fn(...curArguments);
    }
  }
}

// 浅比较判断两次的参数是否相同
function getIsArgumenetsSame(preArgumenets: any[], curArguments: any[]) {
  let isArgumentsSame = false;
  if (!preArgumenets) {
    return isArgumentsSame;
  }

  for (let i = 0; i < curArguments.length; i++) {
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
function sqrt(n: number) { return Math.sqrt(n) }
const cachedSqrt = memoize(sqrt);
console.log(cachedSqrt(4));
console.log(cachedSqrt(4));

// 多个参数
function sum(m: number, n: number) { return m + n }
const cachedSum = memoize(sum);
console.log(cachedSum(2, 4));
console.log(cachedSum(2, 4));

// 引用类型参数
function getArrLength(arr: number[]) { return arr.length }
const cachedGetArrLength = memoize(getArrLength);
console.log(cachedGetArrLength([2, 4]));
console.log(cachedGetArrLength([2, 4]));
