const prices = Array.from({length: 24}).map(() => Math.random() + 0.5);

export const calculatePrice = (length = 1) => {
  const lengthOfProgram = length;

  let cheapest = 10000;
  let cheapeastHour = 0;
  for (let index = 0; index < prices.length; index++) {
    let cheap = 10000;
    let cheapHour = index;
    let count = 0;
    let current = 0;
    for (let hour = index; hour < prices.length; hour++) {
      current += prices[hour];
      count++;
      if (count === lengthOfProgram) {
        if (current < cheap) {
          // console.log('new cheap', current, index, 'hours', hour);
          cheap = current;
          cheapHour = hour - lengthOfProgram + 1;
        }
        count = 0;
        current = 0;
      }
    }
    if (cheap < cheapest) {
      cheapest = cheap;
      cheapeastHour = cheapHour;
    }
  }

  return {time: cheapeastHour, price: cheapest};
};
// console.log(prices.map((p, i) => ({ hour: i, price: p.toPrecision(2) })))
// console.log('cheapeast', cheapest, cheapeastHour, prices[cheapeastHour], prices[cheapeastHour+1], prices[cheapeastHour+2], 'endTime', cheapeastHour + lengthOfProgram)
