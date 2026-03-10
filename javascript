const addBtn = document.getElementById('add-btn');
const logContainer = document.getElementById('log-container');
const progressBar = document.getElementById('progress-bar');
const totalDisplay = document.getElementById('total-movements');

// 1. Initialize and Load Data
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('date-display').innerText = new Date().toDateString();
    loadLogs();
});

// 2. Add Movement
addBtn.addEventListener('click', () => {
    const name = document.getElementById('ex-name').value;
    const sets = document.getElementById('ex-sets').value;
    const reps = document.getElementById('ex-reps').value;

    if (name && sets && reps) {
        const id = Date.now(); // Unique ID for deleting
        createEntry(id, name, sets, reps);
        saveLog(id, name, sets, reps);
        updateUI();
        
        // Clear inputs
        document.querySelectorAll('input').forEach(i => i.value = '');
    }
});

function createEntry(id, name, sets, reps) {
    const li = document.createElement('li');
    li.setAttribute('data-id', id);
    li.innerHTML = `
        <div>
            <strong style="color:var(--primary)">${name}</strong><br>
            <small>${sets} Sets x ${reps} Reps</small>
        </div>
        <button class="delete-btn" onclick="deleteLog(${id})">DEL</button>
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
