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

let sum = 0;
updates.forEach((update) => {
  const numbers = update.split(",").map(Number);

  let isUpdateCorrect = true;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length - 1; j++) {
      // console.log(numbers[i], numbers[j + 1]);
      // console.log(checkOrder(numbers[i], numbers[j + 1]));

      if (!checkOrder(numbers[i], numbers[j + 1])) {
        isUpdateCorrect = false;
        break;
      }
    }
  }

  if (isUpdateCorrect) {
    sum += numbers[Math.floor(numbers.length / 2)];
  }

});

// console.log(orders);
console.log(sum);
