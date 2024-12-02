const input: string[] = (await Bun.file("./input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

const checkSafeLevels = (levels: number[]) => {
  const diffsArray = levels.map((level, index) => level - levels[index - 1]);
  diffsArray.shift();

  return (
    diffsArray.every((diff) => diff >= -3 && diff < 0) ||
    diffsArray.every((diff) => diff <= 3 && diff > 0)
  );
};

const safeReports = input.map((report) => {
  const levels = report.split(" ").map(Number);

  if (checkSafeLevels(levels)) return true;

  for (let index = 0; index < levels.length; index++) {
    const newLevels = [...levels];

    newLevels.splice(index, 1);
    if (checkSafeLevels(newLevels)) return true;
  }

});

const safeAmount = safeReports.filter(Boolean).length;

console.log(safeAmount);
