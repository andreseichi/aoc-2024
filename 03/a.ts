const input: string[] = (await Bun.file("./input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

const regex = new RegExp(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);

let sums = 0;
input.forEach((line) => {
  sums +=
    line
      .match(regex)
      ?.map((m) =>
        m
          .match(/\d+/g)
          ?.map(Number)
          .reduce((acc, curr) => acc * curr, 1),
      )
      .reduce((acc, curr) => acc + curr, 0) ?? 0;
});

console.log(sums);
