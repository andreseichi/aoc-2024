// const input: string = await Bun.file("./example.txt").text();
const input: string = (await Bun.file("./input.txt").text());

console.time("Time to compute");

const memoryAlocation: string[] = [];

let id = 0;
for (let i = 0; i < input.length; i++) {
  if (i % 2 === 0) {
    for (let j = 0; j < Number(input[i]); j++) {
      memoryAlocation.push(String(id));
    }
    id++;
  } else {
    for (let j = 0; j < Number(input[i]); j++) {
      memoryAlocation.push(".");
    }
  }
}

for (let i = memoryAlocation.length - 1; i >= 0; i--) {
  if (memoryAlocation[i] !== ".") {
    const removed = memoryAlocation.splice(i, 1);
    memoryAlocation.splice(i, 0, ".");

    for (let j = 0; j < memoryAlocation.length; j++) {
      if (memoryAlocation[j] === ".") {
        memoryAlocation.splice(j, 1);
        memoryAlocation.splice(j, 0, String(removed));
        break;
      }
    }
  }
}

console.timeEnd("Time to compute");

const sum = memoryAlocation
  .filter((element) => !isNaN(Number(element)))
  .map(Number)
  .reduce((acc, curr, index) => acc + curr * index, 0);

console.log(sum);
