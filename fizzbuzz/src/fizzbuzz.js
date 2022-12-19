const isMultipleOf = (number, multipleOf) => number % multipleOf === 0;

const containsNumber = (number, targetNumber) => number.toString().includes(targetNumber);

const getValue = (number) => {
  const isFizz = isMultipleOf(number, 3) || containsNumber(number, '3');
  const isBuzz = isMultipleOf(number, 5) || containsNumber(number, '5');

  // if (isFizz && isBuzz) {
  //   return 'FizzBuzz';
  // }

  let result = '';
  if (isFizz) {
    result += 'Fizz';
  }
  if (isBuzz) {
    result += 'Buzz';
  }
  return result || number;
}


export default () => {
  return [...new Array(100)].map((_, i) => {
    const number = i + 1;
    return getValue(number);    
  });
}
