const instruction = document.getElementById('instruction');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const stopBtn = document.getElementById('stop');
const cyclesElement = document.getElementById('cycles');
const cards = document.querySelectorAll('.card'); // Get all card elements
const mainCard = document.querySelector('.mainCard');

let intervalId;
let activeInterval = { breath: 18, hold: 15 }; // Default to classic interval
let phase = 'Breath';
let timeRemaining = activeInterval.breath;
let currentCycle = 0;

// Start with the "classic" card active
document.getElementById("classic").classList.add("active");

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active")); // Remove active class from all cards
    card.classList.add("active"); // Add active class to the clicked card

    if (card.id === "classic") {
      activeInterval = { breath: 18, hold: 15 };
    } else if (card.id === "longHold") {
      activeInterval = { breath: 18, hold: 20 };
    } else if (card.id === "shortHold") {
      activeInterval = { breath: 10, hold: 10 };
    }


    // Immediately update timeRemaining and instruction text when changing intervals
    timeRemaining = activeInterval.breath; // Reset to the breath duration of the new interval
    instruction.textContent = `${phase} (${timeRemaining})`;

    // Reset timer if it's running (only if needed)
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null; // Clear the interval ID to stop the timer
    }
  });
});

function updateTimer() {
  timeRemaining--;
  instruction.textContent = `${phase} (${timeRemaining})`;

  if (timeRemaining === 0) {
    phase = (phase === 'Breath') ? 'Hold' : 'Breath';
    timeRemaining = (phase === 'Breath') ? activeInterval.breath : activeInterval.hold;
    document.body.style.backgroundColor = (phase === 'Breath') ? 'rgb(205, 255, 205)' : 'rgb(246, 251, 255)';
    mainCard.style.padding = (phase === 'Hold') ? '1.5em' : '4em';
    mainCard.style.margin = (phase === 'Hold') ? '2.5em' : '0em';
    if (phase == 'Breath') {
      currentCycle++;
      cyclesElement.textContent = `Current Cycles: ${currentCycle}`;
    }
  } 
}

startBtn.addEventListener('click', () => {
  if (!intervalId) { // Start only if not already running
    intervalId = setInterval(updateTimer, 1000);
    document.body.style.backgroundColor = 'rgb(205, 255, 205)';
    mainCard.style.transition = '7s'
  }
});

pauseBtn.addEventListener('click', () => {
  if (timeRemaining != activeInterval.breath
  ) {
    clearInterval(intervalId);
    intervalId = null; // Clear the interval ID
    document.body.style.backgroundColor = 'rgb(255, 255, 202)';
  }
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null; // Clear the interval ID
  phase = 'Breath';
  timeRemaining = activeInterval.breath;
  instruction.textContent = `Breath (${timeRemaining})`;
  document.body.style.background = 'rgb(246, 251, 255)';
  currentCycle = 0;
  cyclesElement.textContent = "Current Cycles: 0";
  mainCard.style.padding = '4em'
  mainCard.style.margin = '0em'
});
