// Function to get the current time in CET (Central European Time)
function getCETTime() {
  const now = new Date();
  const utcOffset = now.getTimezoneOffset() * 60000; // UTC offset in milliseconds
  const cetOffset = 1 * 60 * 60000; // CET offset from UTC (+1 hour)

  return new Date(now.getTime() + utcOffset + cetOffset);
}

// Set the initial countdown date to the next 3-minute interval
let countdownTarget = Math.ceil(getCETTime().getTime() / 180000) * 180000; // 180000 = 3 minutes in milliseconds

const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const countdownContainer = document.querySelector('.countdown');

// Update the countdown every second
setInterval(updateCountdown, 1000);

function updateCountdown() {
  const nowCET = getCETTime();
  const timeRemaining = countdownTarget - nowCET.getTime();

  // Calculate the remaining time in seconds
  const seconds = Math.floor(timeRemaining / 1000);

  // Update the countdown display if there's time remaining
  if (seconds >= 0) {
    const minutes = Math.floor(seconds / 60) -1;
    const secondsDisplay = seconds % 60;

    minutesElement.innerHTML = minutes;
    secondsElement.innerHTML = secondsDisplay;
  }

  // Logic to change the text at specific times based on the 3-minute loop
  if (seconds >= 60) { // 1 minute countdown
    countdownContainer.classList.remove('countdown-green', 'countdown-red');
    countdownContainer.innerHTML = `
      <div class='countdown-item'><span id='minutes'>${minutes}</span><div class='label'>Minutes</div></div>
      <div class='countdown-item'><span id='seconds'>${secondsDisplay}</span><div class='label'>Seconds</div></div>
    `;
  } else if (seconds >= 0 && seconds < 60) { // 1 minute Skirmish Live
    countdownContainer.classList.add('countdown-green');
    countdownContainer.innerHTML = "<h1>Skirmish Live</h1>";
  } else if (seconds < 0 && seconds > -60) { // 1 minute Ending Soon
    countdownContainer.classList.remove('countdown-green');
    countdownContainer.classList.add('countdown-red');
    countdownContainer.innerHTML = "<h1>Ending Soon</h1>";
  }

  // Check if the 3-minute loop has ended and update the target date
  if (timeRemaining <= 0) {
    countdownTarget = Math.ceil(getCETTime().getTime() / 180000) * 180000; // 180000 = 3 minutes in milliseconds
  }
}