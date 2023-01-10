const evaluateString = (calc) => {
  // Regex to turn string into an array of numbers by splitting by multiple delminiators
  let nums = calc.split(/[/x%+-]+/);
  nums = nums.map((item) => Number(item)); // convert strings to Numbers

  // Regex to split by numbers and make an array of operations
  const operations = calc.split(/[0.0-9]+/);
  // deep copy of array of operations for later manipulation within maps
  let operationsClone = structuredClone(operations);

  // console.log(nums)
  // console.log(operations)

  operations.map((op) => {
    if (op === "%") {
      let mapIndex = operationsClone.indexOf(op); // creating an index from the clone because the cloned array will be manipulated
      const percentage = nums[mapIndex - 1] / 100;
      const cleanUp = () => {
        nums.splice(mapIndex, 1);
        operationsClone.splice(operationsClone.indexOf(op), 1);
      };
      if (operations.indexOf(op) === 1) {
        nums[mapIndex - 1] = percentage;
        cleanUp();
      } else {
        switch (operations[operations.indexOf(op) - 1]) {
          case "x":
            nums[mapIndex - 2] = percentage * nums[mapIndex - 2];
            nums.splice(mapIndex - 1, 2);
            operations.splice(operations[operations.indexOf(op) - 1]);
            break;
          case "/":
            nums[mapIndex - 2] = nums[mapIndex - 2] / percentage;
            nums.splice(mapIndex - 1, 2);
            operations.splice(operations[operations.indexOf(op) - 1]);
            break;
          case "+":
            console.log(nums);
            console.log(mapIndex);
            nums[mapIndex - 2] =
              nums[mapIndex - 2] * percentage + nums[mapIndex - 2];
            nums.splice(mapIndex - 1, 2);
            operations.splice(operations[operations.indexOf(op) - 1]);
            break;
          case "-":
            console.log(nums);
            console.log(mapIndex);
            nums[mapIndex - 2] =
              nums[mapIndex - 2] - nums[mapIndex - 2] * percentage;
            nums.splice(mapIndex - 1, 2);
            operations.splice(operations[operations.indexOf(op) - 1]);
            break;
        }
      }
    }
    return nums;
  });

  operations.map((op) => {
    if (op === "x" || op === "/") {
      // first map checking for multiplaction or divide (because of order of operations)
      let mapIndex = operationsClone.indexOf(op); // creating an index from the clone because the cloned array will be manipulated

      if (op === "x") {
        // if statement to check if operation is multiply or divide
        nums[mapIndex] = nums[mapIndex - 1] * nums[mapIndex]; // performs the operation on the numbers either side of the operation and sets it to the rightmost operation
      } else {
        nums[mapIndex] = nums[mapIndex - 1] / nums[mapIndex];
      }

      nums.splice(mapIndex - 1, 1); // removes the first number the operation was performed on leaving only the calcualted result
      operationsClone.splice(operationsClone.indexOf(op), 1); // removes the operation that has just been performed from the cloned array
    }
    return nums;
  });

  operations.map((op) => {
    if (op === "+" || op === "-") {
      // second map checking for addition or subtraction (because of order of operations)
      let mapIndex = operationsClone.indexOf(op); // creating an index from the clone because the cloned array will be manipulated

      if (op === "+") {
        // if statement to check if operation is addition or subtraction
        nums[mapIndex] = nums[mapIndex - 1] + nums[mapIndex]; // performs the operation on the numbers either side of the operation and sets it to the rightmost operation
      } else {
        nums[mapIndex] = nums[mapIndex - 1] - nums[mapIndex];
      }

      nums.splice(mapIndex - 1, 1); // removes the first number the operation was performed on leaving only the calcualted result
      operationsClone.splice(operationsClone.indexOf(op), 1); // removes the operation that has just been performed from the cloned array
    }
    return nums;
  });

  console.log("final nums = ", nums[0]);

  return nums[0];
};

export default evaluateString;
