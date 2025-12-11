// Elves have a secret timestamp: it’s the exact date and time when Santa Claus takes off with the sleigh 🛷 to deliver gifts around the world. But at the North Pole they use a super weird format to store the time: YYYY*MM*DD@HH|mm|ss NP (example: 2025*12*25@00|00|00 NP).

// Your mission is to write a function that receives:

// fromTime → reference date in elf format (YYYY*MM*DD@HH|mm|ss NP).
// takeOffTime → the same takeoff date, also in elf format.
// The function must return:

// The full seconds remaining until takeoff.
// If we’re exactly at takeoff time → 0.
// If takeoff already happened → a negative number indicating how many seconds have passed since then.
// 🎯 Rules
// First convert the elf format to a timestamp. The NP suffix indicates official North Pole time (no time zones or DST), so you can treat it as if it were UTC.
// Use differences in seconds, not milliseconds.
// Always round down (floor): only full seconds.
// 🧩 Examples
// const takeoff = '2025*12*25@00|00|00 NP'

// // from December 24, 2025, 23:59:30, 30 seconds before takeoff
// timeUntilTakeOff('2025*12*24@23|59|30 NP', takeoff)
// // 30

// // exactly at takeoff time
// timeUntilTakeOff('2025*12*25@00|00|00 NP', takeoff)
// // 0

// // 12 seconds after takeoff
// timeUntilTakeOff('2025*12*25@00|00|12 NP', takeoff)
// // -12

type ElfDateTime =
  `${number}*${number}*${number}@${number}|${number}|${number} NP`;

function timeUntilTakeOff(
  fromTime: ElfDateTime,
  takeOffTime: ElfDateTime
): number {
  // All your code here

  function parseElfDateTime(elfTime: ElfDateTime) {
    const parseTime = elfTime.split(/\*|\@|\||NP/);
    const parsedTimeObj = {
      year: Number(parseTime[0]),
      month: Number(parseTime[1]) - 1,
      day: Number(parseTime[2]),
      hours: Number(parseTime[3]),
      minutes: Number(parseTime[4]),
      seconds: Number(parseTime[5]),
    };

    const parsedDate = new Date(
      parsedTimeObj.year,
      parsedTimeObj.month,
      parsedTimeObj.day,
      parsedTimeObj.hours,
      parsedTimeObj.minutes,
      parsedTimeObj.seconds
    );

    return Date.parse(parsedDate.toString());
  }

  let getCurrentDateTime = parseElfDateTime(fromTime);
  let getTakeOffTime = parseElfDateTime(takeOffTime);

  let diff = getTakeOffTime - getCurrentDateTime;

  let parseDiff = Math.floor(diff / 1000);
  return parseDiff;
}

const takeoff = "2025*12*25@00|00|00 NP";

// from December 24, 2025, 23:59:30, 30 seconds before takeoff
timeUntilTakeOff("2025*12*24@23|59|30 NP", takeoff);
// 30

// exactly at takeoff time
timeUntilTakeOff("2025*12*25@00|00|00 NP", takeoff);
// 0

// 12 seconds after takeoff
timeUntilTakeOff("2025*12*25@00|00|12 NP", takeoff);
// -12

// Code review: 4/5
// Strengths:
// • The code correctly parses the custom date format and calculates the time difference in seconds.
// • Uses `Math.floor` as required to round down to full seconds.
// • TypeScript type definition for `ElfDateTime` is well-defined and useful.
// Weak points:
// • The `parseElfDateTime` function is defined inside the main function, which is unusual and can make it harder to test or reuse independently.
// • The `Date.parse(parsedDate.toString())` is an indirect way to get a timestamp. Directly using `parsedDate.getTime()` would be more idiomatic and potentially more robust.
// Next steps:
// • Move the `parseElfDateTime` function outside of `timeUntilTakeOff` to improve modularity and testability.
// • Consider using `parsedDate.getTime()` instead of `Date.parse(parsedDate.toString())` for a more direct timestamp conversion.
