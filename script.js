// THE 10LB + BAND ROUTINE
const exercises = [
    {n: "Band-Resisted Pushups", d: "Loop band around back/palms. Slow down, explosive up. Max reps."},
    {n: "10lb Goblet Squats", d: "Hold both 10lb weights at chest. 40 reps. Don't lock knees."},
    {n: "Seated Band Rows", d: "Loop band around feet. Pull to stomach. Squeeze back for 2 seconds."},
    {n: "10lb Lateral Raises", d: "Weights at sides. Lift to shoulder height. Slow 3-sec descent."},
    {n: "Overhead Band Extension", d: "Step on band, pull over head. Squeeze triceps at top."}
];

let currentEx = 0;
let seconds = 0;
let interval;

function toggleWorkout() {
    const box = document.getElementById('routine-steps');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
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
    const log = document.getElementById('history-log');
    const li = document.createElement('li');
    li.innerText = `COMPLETED: ${exercises[currentEx].n} (${seconds}s tension)`;
    log.prepend(li);

    currentEx++;
    if(currentEx >= exercises.length) {
        alert("WORKOUT COMPLETE. GROWTH TRIGGERED.");
        currentEx = 0;
        toggleWorkout();
    } else {
        document.getElementById('ex-title').innerText = `Step ${currentEx + 1}: ${exercises[currentEx].n}`;
        document.getElementById('ex-instructions').innerText = exercises[currentEx].d;
        document.getElementById('timer').innerText = "0s";
    }
}

// THE DAILY CLOCK
function clock() {
    const h = new Date().getHours();
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    
    const mission = document.getElementById('mission-title');
    const desc = document.getElementById('mission-desc');

    if (h < 9) { mission.innerText = "ANABOLIC BREAKFAST"; desc.innerText = "4 Eggs + Oats. Fuel up."; }
    else if (h < 13) { mission.innerText = "PREP FOUNDATION MEAL"; desc.innerText = "6oz Beef + 2 Cups Rice."; }
    else if (h < 18) { mission.innerText = "HYPERTROPHY WINDOW"; desc.innerText = "Time to use the bands/10lbs."; }
    else { mission.innerText = "RECOVERY PHASE"; desc.innerText = "Steak + Potato + 8hrs Sleep."; }
}
setInterval(clock, 1000);    clearInterval(timerInterval);
    seconds = 0;
    document.getElementById('timer-display').style.color = "#00ff88";
    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById('timer-display').innerText = seconds + "s";
        if(seconds >= 45) document.getElementById('timer-display').style.color = "#ff9f43";
    }, 1000);
}
function stopTension() { clearInterval(timerInterval); }

document.getElementById('master-add').addEventListener('click', () => {
    const name = document.getElementById('entry-name').value;
    if(!name) return;
    const li = document.createElement('li');
    li.innerHTML = `<span>${new Date().getHours()}:00</span> | <strong>${name}</strong> (${seconds}s)`;
    document.getElementById('activity-log').prepend(li);
    document.getElementById('entry-name').value = '';
    stopTension();
    document.getElementById('timer-display').innerText = "0s";
});

setInterval(updateCoach, 1000);
updateCoach();        <button class="delete-btn" onclick="deleteLog(${id})">DEL</button>
    `;
    logContainer.prepend(li);
}

function saveLog(id, name, sets, reps) {
    let logs = JSON.parse(localStorage.getItem('70808-elite-data')) || [];
    logs.push({ id, name, sets, reps });
    localStorage.setItem('70808-elite-data', JSON.stringify(logs));
}

function deleteLog(id) {
    let logs = JSON.parse(localStorage.getItem('70808-elite-data')) || [];
    logs = logs.filter(item => item.id !== id);
    localStorage.setItem('70808-elite-data', JSON.stringify(logs));
    
    document.querySelector(`li[data-id="${id}"]`).remove();
    updateUI();
}

function updateUI() {
    const count = logContainer.children.length;
    totalDisplay.innerText = count;
    const goal = 5; 
    const percentage = Math.min((count / goal) * 100, 100);
    progressBar.style.width = percentage + '%';
}

function loadLogs() {
    const saved = JSON.parse(localStorage.getItem('70808-elite-data')) || [];
    saved.forEach(item => createEntry(item.id, item.name, item.sets, item.reps));
    updateUI();
}

document.getElementById('clear-all').addEventListener('click', () => {
    if(confirm("Wipe all elite data?")) {
        localStorage.removeItem('70808-elite-data');
        logContainer.innerHTML = '';
        updateUI();
    }
});
