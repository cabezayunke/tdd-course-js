import fizzbuzz from "./fizzbuzz";


describe('Fizzbuzz', () => {

  const findResultElement = (result, n) => result[n - 1];

  // test("should return array with 100 elements", () => {
  //   // arrange

  //   // act
  //   const result = fizzbuzz();

  //   // assert
  //   expect(result).toHaveLength(100);
  // });

  // test.each([3, 6, 9])(`should return Fizz if multiple of 3 [%p]`, (multipleOfThree) => {
  //   // arrange

  //   // act
  //   const result = fizzbuzz();

  //   // assert
  //   expect(findResultElement(result, multipleOfThree)).toEqual('Fizz')
  // });

  // test.each([5, 10])("should return Buzz if multiple of 5 [%p]", (multipleOfFive) => {
  //   // arrange

  //   // act
  //   const result = fizzbuzz();

  //   // assert
  //   expect(findResultElement(result, multipleOfFive)).toEqual('Buzz')
  // });

  // test.each([15, 30])("should return FizzBuzz if multiple of 3 and 5 [%p]", (multipleOfThreeAndFive) => {
  //   // arrange

  //   // act
  //   const result = fizzbuzz();

  //   // assert
  //   expect(findResultElement(result, multipleOfThreeAndFive)).toEqual('FizzBuzz')
  // });

  // test.each([1, 2, 4, 7, 8])("should return number if not multiple of 3 or 5 [%p]", (number) => {
  //   // arrange

  //   // act
  //   const result = fizzbuzz();

  //   // assert
  //   expect(findResultElement(result, number)).toEqual(number)
  // });

  const IS_MULTIPLE_OF_3 = 'is multiple of 3';
  const IS_MULTIPLE_OF_5 = 'is multiple of 5';
  const IS_MULTIPLE_OF_3_AND_5 = 'is multiple of 3 and 5';
  const IS_NOT_MULTIPLE_OF_3_OR_5 = 'is not multiple of 3 or 5';
  const CONTAINS_3 = 'it contains a 3';
  const CONTAINS_5 = 'it contains a 5';
  const CONTAINS_3_AND_5 = 'it contains a 3 and a 5';

  test.each([
    { target: 3, expectedResult: 'Fizz', condition: IS_MULTIPLE_OF_3 },
    { target: 6, expectedResult: 'Fizz', condition: IS_MULTIPLE_OF_3 },
    { target: 9, expectedResult: 'Fizz', condition: IS_MULTIPLE_OF_3 },
    { target: 5, expectedResult: 'Buzz', condition: IS_MULTIPLE_OF_5 },
    { target: 10, expectedResult: 'Buzz', condition: IS_MULTIPLE_OF_5 },
    { target: 15, expectedResult: 'FizzBuzz', condition: IS_MULTIPLE_OF_3_AND_5 },
    { target: 30, expectedResult: 'FizzBuzz', condition: IS_MULTIPLE_OF_3_AND_5 },
    { target: 1, expectedResult: 1, condition: IS_NOT_MULTIPLE_OF_3_OR_5 },
    { target: 2, expectedResult: 2, condition: IS_NOT_MULTIPLE_OF_3_OR_5 },
    { target: 4, expectedResult: 4, condition: IS_NOT_MULTIPLE_OF_3_OR_5 },
    { target: 31, expectedResult: 'Fizz', condition: CONTAINS_3 },
    { target: 73, expectedResult: 'Fizz', condition: CONTAINS_3 },
    { target: 52, expectedResult: 'Buzz', condition: CONTAINS_5 },
    { target: 58, expectedResult: 'Buzz', condition: CONTAINS_5 },
    { target: 53, expectedResult: 'FizzBuzz', condition: CONTAINS_3_AND_5 },
    { target: 35, expectedResult: 'FizzBuzz', condition: CONTAINS_3_AND_5 },
    { target: 75, expectedResult: 'FizzBuzz', condition: IS_MULTIPLE_OF_3_AND_5 },
  ])('should return $expectedResult for target $target if $condition', ({ target, expectedResult }) => {
    // arrange

    // act
    const result = fizzbuzz();

    // assert
    expect(findResultElement(result, target)).toEqual(expectedResult);
  });
});
