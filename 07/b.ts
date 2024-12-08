// const input: string[] = (await Bun.file("./example.txt").text()).split("\n");
const input: string[] = (await Bun.file("./input.txt").text()).split("\n");

console.time("Time to compute brute force")

const calibrationNumbers: number[] = [];
input.forEach((line) => {
  const [testValue, values] = line
    .split(": ")
    .map((value) => value.split(" ").map(Number));

  for (let i = 0; i < 3 ** (values.length - 1); i++) {
    const tertiary = i.toString(3).padStart(values.length - 1, "0");

    let result = values[0];

    for (let j = 0; j < tertiary.length; j++) {
      if (tertiary[j] === "0") {
        result += values[j + 1];
      } else if (tertiary[j] === "1") {
        result *= values[j + 1];
      } else {
        const newNumber = Number(String(result) + String(values[j + 1]));
        result = newNumber;
      }
    }

    if (result === testValue[0]) {
      calibrationNumbers.push(testValue[0]);
      break;
    }
  }
});

console.timeEnd("Time to compute brute force")

console.log(calibrationNumbers.reduce((a, b) => a + b, 0));