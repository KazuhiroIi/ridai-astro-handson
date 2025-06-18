const addNumber = (a: number, b: number) => {
  return a + b; // number + string -> string と解釈されてしまう
};

console.log(addNumber(1, 2)); // 3
console.log(addNumber(1, 2)); // 12
