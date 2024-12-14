// const input: string = await Bun.file("./example.txt").text();
const input: string = (await Bun.file("./input.txt").text());

console.time("Time to compute");

const stones = input.split(" ").map(Number);

let newStones = [...stones];

const checkRules = (stone: number, index: number) => {
  if (stone === 0) {
    newStones.splice(index, 1);
    newStones.splice(index, 0, 1);
    index++;
  } else if (String(stone).length % 2 === 0) {
    const firstHalf = Number(String(stone).slice(0, String(stone).length / 2));
    const secondHalf = Number(String(stone).slice(String(stone).length / 2));

    newStones.splice(index + 1, 1);

    newStones.splice(index + 1, 0, firstHalf, secondHalf);

    index += 2;
  } else {
    newStones.splice(index, 1);
    newStones.splice(index, 0, stone * 2024);

    console.log({ newStones });
    index++;
  }
};

for (let i = 0; i < 25; i++) {
  let tempStones: number[] = [];
  newStones.forEach((stone) => {
    if (stone === 0) {
      tempStones.push(1);
    } else if (String(stone).length % 2 === 0) {
      const firstHalf = Number(
        String(stone).slice(0, String(stone).length / 2),
      );
      const secondHalf = Number(String(stone).slice(String(stone).length / 2));

      tempStones.push(firstHalf, secondHalf);
    } else {
      tempStones.push(stone * 2024);
    }
  });

  newStones = [...tempStones];
}

console.log(newStones.length);

console.timeEnd("Time to compute");