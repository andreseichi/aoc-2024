const input: string[] = (await Bun.file("./input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

const numbersLeft: number[] = [];

const mapRight = new Map<number, number>();

const numbers: number[] = [];
input.forEach((line) => {
  const [left, right] = line.split("   ").map(Number);

  mapRight.set(right, (mapRight.get(right) ?? 0) + 1);
  numbersLeft.push(left);
});

numbersLeft.forEach((number) => {
  if (mapRight.has(number)) {
    numbers.push(number * mapRight.get(number)!);
  } else numbers.push(0);
});

const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum);
