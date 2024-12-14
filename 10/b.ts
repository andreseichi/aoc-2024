// const lines: string[] = (await Bun.file("./example.txt").text()).split("\n");
const lines: string[] = (await Bun.file("./input.txt").text()).split("\n");

console.time("Time to compute");

const checkOnLimit = (x: number, y: number) =>
  x >= 0 && x < lines.length && y >= 0 && y < lines[x].length;

let sumTrailHead = 0;
const checkTrail = (x: number, y: number) => {
  const actualHeight = Number(lines[x][y]);

  if (actualHeight === 9) {
    sumTrailHead++;
  }

  // up
  if (checkOnLimit(x - 1, y)) {
    if (Number(lines[x - 1][y]) === actualHeight + 1) {
      checkTrail(x - 1, y);
    }
  }

  // right
  if (checkOnLimit(x, y + 1)) {
    if (Number(lines[x][y + 1]) === actualHeight + 1) {
      checkTrail(x, y + 1);
    }
  }

  // down
  if (checkOnLimit(x + 1, y)) {
    if (Number(lines[x + 1][y]) === actualHeight + 1) {
      checkTrail(x + 1, y);
    }
  }

  // left
  if (checkOnLimit(x, y - 1)) {
    if (Number(lines[x][y - 1]) === actualHeight + 1) {
      checkTrail(x, y - 1);
    }
  }
};

let sum = 0;
for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] === "0") {
      checkTrail(i, j);
      sum += sumTrailHead;

      sumTrailHead = 0;
    }
  }
}

console.timeEnd("Time to compute");

console.log(sum);
