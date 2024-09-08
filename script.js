// Function to get the start of the upcoming Friday at 00:00 CET
function getNextFriday() {
  const now = new Date();
  const daysUntilFriday = (5 - now.getDay() + 7) % 7;
  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + daysUntilFriday);
  nextFriday.setHours(0, 0, 0, 0); // 00:00 CET

  // Convert to CET (UTC+1 or UTC+2)
  const cetOffset = now.getTimezoneOffset() / 60; // Offset in hours from UTC
  nextFriday.setHours(nextFriday.getHours() + 1 - cetOffset); // Adjust to CET

  return nextFriday.getTime();
}

// Function to get the start of Saturday at 05:00 CET
function getSaturdayStart() {
  const now = new Date();
  const daysUntilSaturday = (6 - now.getDay() + 7) % 7;
  const nextSaturday = new Date(now);
  nextSaturday.setDate(now.getDate() + daysUntilSaturday);
  nextSaturday.setHours(5, 0, 0, 0); // 05:00 CET

  // Convert to CET (UTC+1 or UTC+2)
  const cetOffset = now.getTimezoneOffset() / 60; // Offset in hours from UTC
  nextSaturday.setHours(nextSaturday.getHours() + 1 - cetOffset); // Adjust to CET

  return nextSaturday.getTime();
}

// Function to get the end time for "Skirmish Ending Soon" on Saturday at 06:00 CET
function getSaturdayEnd() {
  const now = new Date();
  const daysUntilSaturday = (6 - now.getDay() + 7) % 7;
  const nextSaturday = new Date(now);
  nextSaturday.setDate(now.getDate() + daysUntilSaturday);
  nextSaturday.setHours(6, 0, 0, 0); // 06:00 CET

  // Convert to CET (UTC+1 or UTC+2)
  const cetOffset = now.getTimezoneOffset() / 60; // Offset in hours from UTC
  nextSaturday.setHours(nextSaturday.getHours() + 1 - cetOffset); // Adjust to CET

  return nextSaturday.getTime();
}

// Set the initial countdown date
let countdownDate = getNextFriday();

// Get the countdown container
const countdownElement = document.querySelector('.countdown');

// Update the countdown every second
const interval = setInterval(function() {
  const now = new Date().getTime(); // Current time in milliseconds
  const distance = countdownDate - now; // Time difference
  const saturdayStart = getSaturdayStart();
  const saturdayEnd = getSaturdayEnd();

  // Display the countdown if current time is before the countdown date
  if (now >= countdownDate && now < saturdayStart) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
      <div class="countdown-item">
        ${days}<span class="label">Days</span>
      </div>
      <div class="countdown-item">
        ${hours}<span class="label">Hours</span>
      </div>
      <div class="countdown-item">
        ${minutes}<span class="label">Minutes</span>
      </div>
      <div class="countdown-item">
        ${seconds}<span class="label">Seconds</span>
      </div>
    `;
    countdownElement.className = ""; // Reset class

  // Display "Skirmish Live" if the countdown has ended and it is before the Saturday end time
  } else if (now >= countdownDate && now >= saturdayStart && now < saturdayEnd) {
    countdownElement.className = "countdown-green"; // Apply green gradient class
    countdownElement.innerHTML = "Skirmish Live";

  // Display "Skirmish Ending Soon" if it is between Saturday 05:00 and 06:00 CET
  } else if (now >= saturdayStart && now < saturdayEnd) {
    countdownElement.className = "countdown-red"; // Apply red gradient class
    countdownElement.innerHTML = "Skirmish Ending Soon";

  // Reset to the next Friday if the current time is past the Saturday end time
  } else if (now >= saturdayEnd) {
    countdownDate = getNextFriday(); // Reset to next Friday
    countdownElement.className = ""; // Reset class
    countdownElement.innerHTML = "Countdown to next Friday";

    // Reset the interval for the new countdown
    clearInterval(interval);
    interval = setInterval(function() {
      const now = new Date().getTime(); // Current time in milliseconds
      const distance = countdownDate - now; // Time difference
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the countdown for the new Friday
      countdownElement.innerHTML = `
        <div class="countdown-item">
          ${days}<span class="label">Days</span>
        </div>
        <div class="countdown-item">
          ${hours}<span class="label">Hours</span>
        </div>
        <div class="countdown-item">
          ${minutes}<span class="label">Minutes</span>
        </div>
        <div class="countdown-item">
          ${seconds}<span class="label">Seconds</span>
        </div>
      `;
    }, 1000);
  }
}, 1000);
