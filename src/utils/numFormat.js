export function numFormat(num) {
  let str = num.toString();
  let [intNum, xiaoshu] = str.split('.');
  let intAry = intNum.split('').reverse();
  let ary = [];
  intAry.forEach((item, index) => {
    if (index % 3 == 0 && index !== 0) {
      ary.push(',');
    }
    ary.push(item);
  });
  return xiaoshu
    ? ary.reverse().join('') + '.' + xiaoshu
    : ary.reverse().join('');
}
