// Santa 🎅 wants to know what the first non-repeated letter is in a toy's name 🎁.

// Write a function that takes a string and returns the first letter that is not repeated, ignoring uppercase and lowercase when counting, but returning the letter as it appears in the string.

// If there is none, return an empty string ("").

// Examples:

// findUniqueToy('Gift') // 'G'
// // ℹ️ The G is the first letter that is not repeated
// // and we return it exactly as it appears

// findUniqueToy('sS') // ''
// // ℹ️ The letters are repeated, since it doesn't distinguish uppercase

// findUniqueToy('reindeeR') // 'i'
// // ℹ️ The r is repeated (even if it's uppercase)
// // and the e as well, so the first one is 'i'

// // More cases:
// findUniqueToy('AaBbCc') // ''
// findUniqueToy('abcDEF') // 'a'
// findUniqueToy('aAaAaAF') // 'F'
// findUniqueToy('sTreSS') // 'T'
// findUniqueToy('z') // 'z'

function findUniqueToy(toy: string): string {
  // Code here
  if (toy === "") {
    return "";
  }

  let arr = toy.toLowerCase().split("");
  let uniqueCharsArr: string[] = [];

  arr.forEach((el, index) => {
    if (arr.indexOf(arr[index]) === arr.lastIndexOf(arr[index])) {
      uniqueCharsArr.push(arr[index]);
      return;
    }
    return;
  });

  if (uniqueCharsArr.length == 0) {
    return "";
  }

  let firstUniqueChar = uniqueCharsArr[0];

  if (!toy.includes(firstUniqueChar)) {
    firstUniqueChar = firstUniqueChar.toUpperCase();
  }

  return firstUniqueChar;
}

console.log(findUniqueToy("AaBbCc")); // ''
console.log(findUniqueToy("abcDEF")); // 'a'
console.log(findUniqueToy("aAaAaAF")); // 'F'
console.log(findUniqueToy("sTreSS")); // 'T'
console.log(findUniqueToy("z")); // 'z'

// Code review: 3/5
// Strengths:
// • Handles the empty string edge case correctly.
// Weak points:
// • The logic for determining the original case of the unique character is flawed. It assumes if the lowercase character is not found in the original string, it must be uppercase, which is incorrect.
// • The use of `indexOf` and `lastIndexOf` within a `forEach` loop leads to O(n^2) time complexity, which can be inefficient for longer strings.
// • The `uniqueCharsArr` is populated with lowercase characters, and then the logic to find the original case is complex and incorrect.
// Next steps:
// • Refactor the logic to correctly identify the first non-repeated character and preserve its original casing. Consider using a Map to store character counts and their first encountered index.
// • Improve the algorithmic efficiency. A Map-based approach can achieve O(n) time complexity.
// • Simplify the logic for handling unique characters and their casing.
