// In Santa’s workshop there’s an intern elf who is learning to wrap gifts 🎁.

// They’ve asked the elf to wrap boxes using only text… and they do it more or less correctly.

// They are given two parameters:

// size: the size of the square gift
// symbol: the character the elf uses to make the border (when they don’t mess it up 😅)
// The gift must meet these requirements:

// It must be a size x size square.
// The inside is always empty (filled with spaces), because the elf “doesn’t know how to draw the filling yet”.
// If size < 2, return an empty string: the elf tried, but the gift got lost.
// The final result must be a string with newline characters \n.
// Yes, it’s an easy challenge… but we don’t want the intern to get fired. Right?

// 🧩 Examples
// const g1 = drawGift(4, '*')
// console.log(g1)
// /*
//  ****
//  *  *
//  *  *
//  ****
//  */

// const g2 = drawGift(3, '#')
// console.log(g2)
// /*
// ###
// # #
// ###
// */

// const g3 = drawGift(2, '-')
// console.log(g3)
// /*
// --
// --
// */

// const g4 = drawGift(1, '+')
// console.log(g4)
// // ""  poor intern…

function drawGift(size: number, symbol: string): string {
  // Code here
  if (size < 2) {
    return "";
  }

  let str = ``;
  for (let i = 0; i < size; i++) {
    for (let ii = 0; ii < size; ii++) {
      if (i > 0 && ii > 0 && i < size - 1 && ii < size - 1) {
        str += " ";
      } else {
        str += symbol;
      }
    }
    str += `\n`;
  }
  return str.trim();
}

const g1 = drawGift(4, "*");
console.log(g1);
// /*
//  ****
//  *  *
//  *  *
//  ****
//  */

const g2 = drawGift(3, "#");
console.log(g2);
// /*
// ###
// # #
// ###
// */

const g3 = drawGift(2, "-");
console.log(g3);
// /*
// --
// --
// */

const g4 = drawGift(1, "+");
console.log(g4);
// ""  poor intern…

// Code review: 4/5
// Strengths:
// • The code correctly handles the edge case where size is less than 2.
// • The logic for drawing the gift border is sound.
// • TypeScript types are used appropriately.
// Weak points:
// • The nested loop structure, while functional, could be slightly more readable.
// • The conditional logic inside the inner loop is a bit dense.
// Next steps:
// • Consider refactoring the inner loop's conditional logic for improved clarity, perhaps by pre-calculating whether a character should be a symbol or a space.
// • The `trim()` call at the end is unnecessary if the logic correctly avoids trailing newlines, or if the requirement is to have a newline after the last row. The current logic adds a newline after every row, including the last one, and then trims it. This might be a subtle deviation from the example output if the last newline is expected.
