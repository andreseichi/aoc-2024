// const grid: string[][] = (await Bun.file("./example.txt").text())
//   .split("\n")
//   .grid((line) => line.split(""));
const grid: string[][] = (await Bun.file("./input.txt").text())
  .split("\n")
  .map((line) => line.split(""));

const guard: {
  [key: string]: boolean;
} = {
  "^": true,
  ">": true,
  v: true,
  "<": true,
};

let currentGuardDirection = "";
let sum = 0;
let currentX = 0;
let currentY = 0;

const checkObjectsInFront = () => {
  if (currentGuardDirection === "^") {
    while (grid[currentX - 1][currentY] !== "#") {
      grid[currentX][currentY] = "X";
      currentX--;

      // out of grid
      if (grid[currentX - 1]?.[currentY] === undefined) {
        grid[currentX][currentY] = "X";
        return;
      }
    }

    currentGuardDirection = ">";
    grid[currentX][currentY] = currentGuardDirection;
  } else if (currentGuardDirection === ">") {
    while (grid[currentX][currentY + 1] !== "#") {
      grid[currentX][currentY] = "X";
      currentY++;

      // out of grid
      if (grid[currentX]?.[currentY + 1] === undefined) {
        grid[currentX][currentY] = "X";
        return;
      }
    }
    currentGuardDirection = "v";
    grid[currentX][currentY] = currentGuardDirection;
  } else if (currentGuardDirection === "v") {
    while (grid[currentX + 1][currentY] !== "#") {
      grid[currentX][currentY] = "X";
      currentX++;

      // out of grid
      if (grid[currentX + 1]?.[currentY] === undefined) {
        grid[currentX][currentY] = "X";
        return;
      }
    }

    currentGuardDirection = "<";
    grid[currentX][currentY] = currentGuardDirection;
  } else {
    while (grid[currentX][currentY - 1] !== "#") {
      grid[currentX][currentY] = "X";
      currentY--;

      // out of grid
      if (grid[currentX]?.[currentY - 1] === undefined) {
        grid[currentX][currentY] = "X";
        return;
      }
    }

    currentGuardDirection = "^";
    grid[currentX][currentY] = currentGuardDirection;
  }
};

for (let i = 0; i < grid.length; i++) {
  if (currentGuardDirection) break;
  for (let j = 0; j < grid[i].length; j++) {
    const tile = grid[i][j];

    if (guard[tile]) {
      currentGuardDirection = tile;
      currentX = i;
      currentY = j;
      // checkObjectsInFront(i, j);
      break;
    }
  }
}

while (
  grid[currentX - 1]?.[currentY] !== undefined &&
  grid[currentX + 1]?.[currentY] !== undefined &&
  grid[currentX]?.[currentY - 1] !== undefined &&
  grid[currentX]?.[currentY + 1] !== undefined
) {
  checkObjectsInFront();
}

// console.log(grid.join("\n").replace(/,/g, ""));

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === "X") {
      sum++;
    }
  }
}

console.log(sum);