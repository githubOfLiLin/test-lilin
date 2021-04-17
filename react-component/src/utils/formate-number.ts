/* 
currencyPipe: 数字格式化货币
num: 需要格式化的数字
decimal: 小数位数
isZh: 国际化，是否是中文模式
*/

export function currencyPipe(num: number | string, decimal: number = 2, isZh = true): string {
  if (isZh) {
    const numSize = num ? num.toString().length : 0;
    if (numSize > 8) {
      return (Number(num) / 100000000).toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' 亿';
    }
    if (numSize > 4) {
      return (Number(num) / 10000).toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' 万';
    }
    return (num || 0).toString().replace(/(\d)(?=(\d{3})+)/g, '$1,');
  } else {
    const numSize = num ? num.toString().length : 0;
    if (numSize > 9) {
      return (Number(num) / 1000000000).toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' B';
    }
    if (numSize > 6) {
      return (Number(num) / 1000000).toFixed(decimal) + ' M';
    }
    if (numSize > 3) {
      return (Number(num) / 1000).toFixed(decimal) + ' K';
    }
    return (num || 0).toString();
  }
}

export function percentPipe(value: number): string {
  return value * 100 + '%';
}

