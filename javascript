const protocol = [
    {h: 0, t: "SLEEP", d: "Deep recovery mode. Muscle tissue is currently being repaired.", g: ""},
    {h: 7, t: "ANABOLIC BREAKFAST", d: "Eat 4 Eggs + 1 Cup Oats. High Leucine to stop catabolism.", g: "Protein: 30g | Carbs: 50g"},
    {h: 10, t: "NITROGEN SPIKE", d: "Drink 1 Shake or 1 cup Greek Yogurt. Keep muscles fed.", g: "Keep hydration high (20oz water)."},
    {h: 13, t: "THE FOUNDATION MEAL", d: "Eat 6oz Beef + 2 Cups White Rice. Clean fuel for the pump.", g: "Sodium is key for the pump later."},
    {h: 16, t: "TRAINING: HIGH TENSION", d: "Current Exercise: BAND-RESISTED PUSHUPS", g: "Loop band over back. Slow descent. Squeeze at top."},
    {h: 17, t: "TRAINING: HYPERTROPHY", d: "Current Exercise: 10LB GOBLET SQUATS", g: "Hold both weights at chest. 40 reps minimum. No rest."},
    {h: 18, t: "POST-WORKOUT RECOVERY", d: "1 Banana + Protein Shake. Drive insulin to the muscles.", g: "Fast carbs = Instant recovery."},
    {h: 20, t: "REPAIR MEAL", d: "6oz Chicken + 1 Large Potato. Slow burning fuel for sleep.", g: "Magnesium/Zinc now if you have it."},
    {h: 22, t: "BLACKOUT", d: "No phone. No lights. Growth Hormone release starts now.", g: "Sleep = Steroids. Don't skip it."}
];

function updateCoach() {
    const now = new Date();
    const hour = now.getHours();
    document.getElementById('clock').innerText = now.toLocaleTimeString();

    // Find the current protocol phase
    const phase = protocol.reverse().find(p => hour >= p.h) || protocol[0];
    protocol.reverse(); // Reset array order

    document.getElementById('mission-title').innerText = phase.t;
    document.getElementById('mission-desc').innerText = phase.d;
    
    if(phase.g) {
        document.getElementById('exercise-guide').style.display = "block";
        document.getElementById('movement-steps').innerText = phase.g;
    } else {
        document.getElementById('exercise-guide').style.display = "none";
    }
}

// Timer Logic
let timerInterval;
let seconds = 0;
function startTension() {
    clearInterval(timerInterval);
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
