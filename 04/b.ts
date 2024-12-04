const input: string[] = (await Bun.file("./input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

const grid = input.map((line) => line.split(""));

const getValue = (x: number, y: number) => {
  return grid[x]?.[y];
};

const checkWordAllDirections = (x: number, y: number) => {
  return [
    // x x x
    // x x x
    // x x x
    getValue(x - 1, y - 1) + getValue(x, y) + getValue(x + 1, y + 1),
    getValue(x - 1, y + 1) + getValue(x, y) + getValue(x + 1, y - 1),
  ].every((word) => word === "MAS" || word === "SAM");
};

let total = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (getValue(i, j) !== "A") continue;

    if (checkWordAllDirections(i, j)) total++;
  }
}

console.log(total);
