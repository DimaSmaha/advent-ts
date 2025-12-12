// The elves have found the encrypted code that protects the door to Santa’s workshop 🔐. The PIN has 4 digits, and it is hidden inside blocks like these:

// [1++][2-][3+][<]
// Write a function that deciphers the PIN from the code.

// The code is made up of blocks between brackets [...] and each block generates one digit of the PIN.

// A normal block has the form [nOP...], where n is a number (0-9) and after it there can be a list of (optional) operations.

// The operations are applied in order to the number and are:

// + adds 1
// - subtracts 1
// The result is always a digit (mod 10 arithmetic), for example 9 + 1 → 0 and 0 - 1 → 9.

// There is also the special block [<], which repeats the digit from the previous block.

// If in the end there are fewer than 4 digits, you must return null.

// 🧩 Examples
// decodeSantaPin('[1++][2-][3+][<]')
// // "3144"

// decodeSantaPin('[9+][0-][4][<]')
// // "0944"

// decodeSantaPin('[1+][2-]')
// // null (only 2 digits)

function decodeSantaPin(code: string): string {
  // Code here
  const splitBlocks = code.replaceAll("[", "").trim().split("]");

  let decodedValues = "";
  splitBlocks.forEach((el, index) => {
    if (el == "") {
      return;
    }

    let currentEl: number | string = 0;
    for (let i = 0; i < el.length; i++) {
      if (/[0-9]/.test(el[i])) {
        currentEl = el[i];
      }

      if (el[i] == "+") {
        if (currentEl == 9) {
          currentEl = 0;
          continue;
        }
        currentEl++;
      }

      if (el[i] == "-") {
        if (currentEl == 0) {
          currentEl = 9;
          continue;
        }
        currentEl--;
      }

      if (el[i] == "<") {
        currentEl = decodedValues[index - 1];
      }
    }
    decodedValues += currentEl;
  });

  if (decodedValues.length <= 2) {
    return null;
  }

  return decodedValues;
}

console.log(decodeSantaPin("[1++][2-][3+][<]"));
// "3144"

console.log(decodeSantaPin("[9+][0-][4][<]"));
// "0944"

console.log(decodeSantaPin("[1+][2-]"));
// null (only 2 digits)

// Code review: 3/5
// Strengths:
// • The code correctly handles the basic operations of addition and subtraction with modulo 10 arithmetic.
// • The special '<' block for repeating the previous digit is implemented.
// • The code attempts to handle edge cases like empty blocks and insufficient digits.
// Weak points:
// • The logic for handling the '<' character is flawed. It attempts to access `decodedValues[index - 1]` which might be undefined if the previous block was empty or if it's the first block.
// • The condition `decodedValues.length <= 2` to return `null` is incorrect. The requirement is to return `null` if there are fewer than 4 digits.
// • The parsing of blocks is not robust. For example, if a block contains multiple numbers or invalid characters, the behavior is undefined.
// • The `currentEl` variable is declared as `number | string` and its type is not consistently handled, leading to potential runtime errors.
// • The `forEach` loop with `return` inside does not skip iterations as intended; it only returns from the callback function, not the outer loop. A `for...of` loop or a traditional `for` loop would be more appropriate for controlling iteration flow.
// • The code does not explicitly handle the case where the input `code` string is empty or malformed in ways not covered by the current logic.
// Next steps:
// • Refactor the logic for the '<' block to ensure it correctly accesses the previous valid digit, handling cases where the previous block might have been skipped or invalid.
// • Correct the condition for returning `null` to `decodedValues.length < 4`.
// • Improve block parsing to be more resilient to malformed blocks, perhaps by validating the structure of each block before processing operations.
// • Ensure consistent type handling for `currentEl`. Consider using a number type and performing modulo operations correctly.
// • Replace the `forEach` loop with a `for...of` loop or a traditional `for` loop to allow for proper control flow, especially when skipping elements.
// • Add checks for empty or malformed input strings at the beginning of the function.
