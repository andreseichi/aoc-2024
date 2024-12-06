// const [left, right]: string[] = (await Bun.file("./example.txt").text()).split(
//   "\n\n",
// );
const [left, right]: string[] = (await Bun.file("./input.txt").text()).split(
  "\n\n",
);
const orders = left.split("\n");
const updates = right.split("\n");

const orderingRules = orders.map((order) => order.split("|").map(Number));

const checkOrder = (left: number, right: number) =>
  orderingRules.filter((or) => or[0] === left && or[1] === right).length >= 1;

const swapNumbers = (arrayNumber: number[], index: number) => {
  let temp = arrayNumber[index];
  arrayNumber[index] = arrayNumber[index + 1];
  arrayNumber[index + 1] = temp;

  for (let i = index + 1; i < arrayNumber.length; i++) {
    if (!checkOrder(arrayNumber[index], arrayNumber[i])) {
      let temp = arrayNumber[index];

      arrayNumber[index] = arrayNumber[i];
      arrayNumber[i] = temp;
    }
  }
};

let sum = 0;
updates.forEach((update) => {
  const numbers = update.split(",").map(Number);

  const newArray = [...numbers];

  let hasBeenFixed = false;

  for (let i = 0; i < newArray.length; i++) {
    for (let j = i; j < newArray.length - 1; j++) {
      if (!checkOrder(newArray[i], newArray[j + 1])) {
        swapNumbers(newArray, i);
        hasBeenFixed = true;
      }
    }
  }

  if (hasBeenFixed) {
    sum += newArray[Math.floor(newArray.length / 2)];
  }
});

console.log(sum);
