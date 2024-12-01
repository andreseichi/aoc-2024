const input: string[] = (await Bun.file("./input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

const numbersLeft: number[] = [];
const numbersRight: number[] = [];

input.forEach((line) => {
  const [left, right] = line.split("   ").map(Number);
  numbersLeft.push(left);
  numbersRight.push(right);
});

numbersLeft.sort((a, b) => a - b);
numbersRight.sort((a, b) => a - b);

const diff = numbersLeft.map((number, index) =>
  Math.abs(numbersLeft[index] - numbersRight[index]),
);

const sum = diff.reduce((acc, curr) => acc + curr, 0);

console.log("sum", sum);
