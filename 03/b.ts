const input: string[] = (await Bun.file("./input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example2.txt").text()).split("\n");

const regex = new RegExp(/mul\([0-9]{1,3},[0-9]{1,3}\)|(don't|do)/g);

let sums = 0;
let canDo = true;

input.forEach((line) => {
  const multArray = line.match(regex)?.filter((m) => {
    if (m === "do") {
      canDo = true;
      return false;
    }

    if (!canDo || m === "don't") {
      canDo = false;
      return false;
    }

    return canDo;
  });

  sums +=
    multArray
      ?.map((m) =>
        m
          .match(/\d+/g)
          ?.map(Number)
          .reduce((acc, curr) => acc * curr, 1),
      )
      .reduce((acc, curr) => acc + curr, 0) ?? 0;
});

console.log(sums);
