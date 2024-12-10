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
    const tempMemory = [memoryAlocation[i]];

    i--;
    while (true) {
      if (tempMemory.every((number) => number === memoryAlocation[i])) {
        tempMemory.push(memoryAlocation[i]);
        i--;
      } else {
        i++;
        break;
      }
    }

    loop: for (let j = 0; j < i; j++) {
      const initialIndex = j;
      let size = 0;

      loop2: while (memoryAlocation[j] === ".") {
        size++;
        j++;

        if (tempMemory.length <= size) {
          memoryAlocation.splice(i, tempMemory.length);
          memoryAlocation.splice(i, 0, ...Array(tempMemory.length).fill("."));
          memoryAlocation.splice(initialIndex, size);
          memoryAlocation.splice(initialIndex, 0, ...tempMemory);

          break loop;
        }
      }
    }
  }
}

console.timeEnd("Time to compute");

const sum = memoryAlocation
  .map((element) => (element === "." ? 0 : Number(element)))
  .reduce((acc, curr, index) => acc + curr * index, 0);

console.log(sum);
