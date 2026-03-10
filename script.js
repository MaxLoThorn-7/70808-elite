// THE 10LB + BAND ROUTINE
const exercises = [
    {n: "Step 1: Band-Resisted Pushups", d: "Loop band around back. Slow down, squeeze chest. Max reps."},
    {n: "Step 2: 10lb Goblet Squats", d: "Hold both weights at chest. 40 slow reps. Feel the burn."},
    {n: "Step 3: Seated Band Rows", d: "Loop band around feet. Pull to stomach. Squeeze back hard."},
    {n: "Step 4: 10lb Lateral Raises", d: "Weights at sides. Lift to shoulders. 3-second descent."},
    {n: "Step 5: Overhead Band Extension", d: "Step on band, pull over head. Squeeze triceps."}
];

let currentEx = 0;
let seconds = 0;
let interval;

// THIS MAKES THE BUTTON WORK
function toggleWorkout() {
    const box = document.getElementById('routine-steps');
    if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";
        document.getElementById('start-workout-btn').innerText = "❌ CLOSE WORKOUT";
        updateEx();
    } else {
        box.style.display = "none";
        document.getElementById('start-workout-btn').innerText = "⚡ START TODAY'S WORKOUT";
    }
}

function updateEx() {
    document.getElementById('ex-title').innerText = exercises[currentEx].n;
    document.getElementById('ex-instructions').innerText = exercises[currentEx].d;
}

function startTimer() {
    clearInterval(interval);
    seconds = 0;
    interval = setInterval(() => {
        seconds++;
        document.getElementById('timer').innerText = seconds + "s";
    }, 1000);
}

function nextExercise() {
    clearInterval(interval);
    
    // Log it to history
    const log = document.getElementById('history-log');
    const li = document.createElement('li');
    li.innerHTML = `<strong>DONE:</strong> ${exercises[currentEx].n} (${seconds}s)`;
    log.prepend(li);

    currentEx++;
    if(currentEx >= exercises.length) {
        alert("70808 ELITE: MISSION COMPLETE. GROWING NOW.");
        currentEx = 0;
        toggleWorkout();
    } else {
        updateEx();
        document.getElementById('timer').innerText = "0s";
    }
}

// THE CLOCK
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}, 1000);
