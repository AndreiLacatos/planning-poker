export const generateFibonacci = (count: number) => {
  // start from 1 and 2 (skipping 0 and 1)
  const fibonacci = [1, 2];

  while (fibonacci.length < count) {
    const nextNumber =
      fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2];
    fibonacci.push(nextNumber);
  }

  return fibonacci;
};
