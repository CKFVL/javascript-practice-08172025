const rtf=new Intl.RelativeTimeFormat(
  'en',
  {numeric: 'auto'}
)

console.log(rtf.format(10, 'month')) // in 10 months
console.log(rtf.format(-10, 'month')) // 10 months ago
