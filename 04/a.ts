const input: string[] = (await Bun.file("./input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

const grid = input.map((line) => line.split(""));

const getValue = (x: number, y: number) => {
  return grid[x]?.[y];
};

const checkWordAllDirections = (x: number, y: number) => {
  return [
    getValue(x, y) +
      getValue(x, y + 1) +
      getValue(x, y + 2) +
      getValue(x, y + 3),
    getValue(x, y) +
      getValue(x + 1, y + 1) +
      getValue(x + 2, y + 2) +
      getValue(x + 3, y + 3),
    getValue(x, y) +
      getValue(x + 1, y) +
      getValue(x + 2, y) +
      getValue(x + 3, y),
    getValue(x, y) +
      getValue(x + 1, y - 1) +
      getValue(x + 2, y - 2) +
      getValue(x + 3, y - 3),
    getValue(x, y) +
      getValue(x, y - 1) +
      getValue(x, y - 2) +
      getValue(x, y - 3),
    getValue(x, y) +
      getValue(x - 1, y - 1) +
      getValue(x - 2, y - 2) +
      getValue(x - 3, y - 3),
    getValue(x, y) +
      getValue(x - 1, y) +
      getValue(x - 2, y) +
      getValue(x - 3, y),
    getValue(x, y) +
      getValue(x - 1, y + 1) +
      getValue(x - 2, y + 2) +
      getValue(x - 3, y + 3),
  ].filter((word) => word === "XMAS");
};

let total = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (getValue(i, j) !== "X") {
      continue;
    }

    total += checkWordAllDirections(i, j).length;
  }
}

console.log(total);
