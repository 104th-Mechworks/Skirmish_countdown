// console.log the Days hours mins and secs to the next friday at 00:00 CET in the console. just js code
function getNextFriday() {
  const now = new Date();
  const daysUntilFriday = (5 - now.getUTCDay() + 7) % 7;
  const nextFriday = new Date(now);
  nextFriday.setDate(now.getUTCDate() + daysUntilFriday);
  nextFriday.setHours(0, 0, 0, 0); // 00:00 CET

  // Convert to CET (UTC+1 or UTC+2)
  const cetOffset = now.getTimezoneOffset() / 60; // Offset in hours from UTC
  nextFriday.setHours(nextFriday.getHours() + 1 - cetOffset); // Adjust to CET

  return nextFriday;
}


function saturdaysCountdown() {
  function getNextSaturday() {
    const now = new Date();
    const daysUntilSaturday = (6 - now.getDay() + 7) % 7;
    const nextSaturday = new Date(now);
    nextSaturday.setDate(now.getDate() + daysUntilSaturday);
    nextSaturday.setHours(6, 0, 0, 0); // 06:00 CET

    // Convert to CET (UTC+1 or UTC+2)
    const cetOffset = now.getTimezoneOffset() / 60; // Offset in hours from UTC
    nextSaturday.setHours(nextSaturday.getHours() + 1 - cetOffset); // Adjust to CET

    return nextSaturday;
  }

  const countdownDate = getNextSaturday();
  const now = new Date().getTime(); // Current time in milliseconds
   // Time difference
  return countdownDate - now;
}

function output() {
  const countdownDate = getNextFriday();
  const now = new Date().getTime(); // Current time in milliseconds
  const distance = countdownDate - now; //- 387_400_000; // Time difference 387,804,408


  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (0 < distance && distance < 503_200_000) {
    console.log(`Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds} | ${distance}`);
  } else if (saturdaysCountdown() > 3600000) {
    console.log("Skirmish Live")
  } else if (saturdaysCountdown() < 3_600_000 && saturdaysCountdown() > 0) {
    console.log("Skirmish Ending Soon")
  }

}


setInterval(output, 1000);

