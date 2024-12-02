const input: string[] = (await Bun.file("./input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

const safeReports = input.map((report) => {
  const levels = report.split(" ").map(Number);
  const shouldBeIncreasing = levels[0] < levels[1];

  let isSafe = true;
  for (let index = 0; index < levels.length; index++) {
    const level = levels[index];
    if (shouldBeIncreasing && level >= levels[index + 1]) {
      isSafe = false;
      break;
    }
    if (!shouldBeIncreasing && level <= levels[index + 1]) {
      isSafe = false;
      break;
    }

    if (
      Math.abs(level - levels[index + 1]) > 3 
    ) {
      isSafe = false;
      break;
    }
  }

  return isSafe;
});

const safeAmount = safeReports.filter(Boolean).length;

console.log(safeAmount)