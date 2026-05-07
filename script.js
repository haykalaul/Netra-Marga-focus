// Timer Configuration (in seconds)
const WORK_TIME = 20 * 60;
const BREAK_TIME = 20;

let timeLeft = WORK_TIME;
let isBreak = false;
let isRunning = false;
let timerInterval = null;
let endTime = null; // To store the exact time the session should end

// Stats tracking
let focusSessionsCount = 0;
let totalFocusMinutes = 0;

// DOM Elements
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const sessionTypeTitle = document.getElementById("session-type");
const description = document.getElementById("desc");
const progressInner = document.getElementById("progress");
const alarmSound = document.getElementById("alarm-sound");
const body = document.body;

// Tab buttons
const focusTab = document.getElementById("focusMode");
const breakTab = document.getElementById("breakMode");

// Modals
const reportModal = document.getElementById("reportModal");
const reportBtn = document.getElementById("reportBtn");
const closeReport = document.getElementById("closeReport");

// Stats display
const statsFocus = document.getElementById("stats-focus");
const statsTime = document.getElementById("stats-time");

// --- Initialization ---

function init() {
    updateDisplay();
    setupEventListeners();
}

function setupEventListeners() {
    startBtn.addEventListener("click", toggleTimer);
    
    focusTab.addEventListener("click", () => switchMode(false));
    breakTab.addEventListener("click", () => switchMode(true));

    reportBtn.addEventListener("click", openReport);
    closeReport.addEventListener("click", closeModals);
    window.addEventListener("click", (e) => {
        if (e.target === reportModal) closeModals();
    });

    // Request notification permission
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}

// --- Timer Logic ---

function toggleTimer() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    isRunning = true;
    startBtn.textContent = "STOP";
    startBtn.classList.add("running");
    
    // Set the end time relative to the current time left
    endTime = Date.now() + (timeLeft * 1000);
    
    timerInterval = setInterval(() => {
        const now = Date.now();
        const difference = Math.max(0, Math.round((endTime - now) / 1000));
        
        timeLeft = difference;
        updateDisplay();
        
        if (timeLeft <= 0) {
            handleSessionComplete();
        }
    }, 100); // Check more frequently (every 100ms) for smoother update even if throttled
}

function pauseTimer() {
    isRunning = false;
    startBtn.textContent = "START";
    startBtn.classList.remove("running");
    clearInterval(timerInterval);
}

function handleSessionComplete() {
    pauseTimer();
    playAlarm();
    
    if (!isBreak) {
        focusSessionsCount++;
        totalFocusMinutes += Math.round(WORK_TIME / 60);
        showNotification("Focus session complete!", "Time for a 20-second eye break 👀");
        
        // Auto play break
        setTimeout(() => {
            switchMode(true);
            startTimer();
        }, 1500); 
    } else {
        showNotification("Break finished!", "Ready to focus again? 🎯");
        
        // Return to focus mode and auto-start, same as work → break
        setTimeout(() => {
            switchMode(false);
            startTimer();
        }, 1500);
    }
}

function switchMode(toBreak) {
    pauseTimer();
    isBreak = toBreak;
    timeLeft = isBreak ? BREAK_TIME : WORK_TIME;
    
    // Reset end time
    endTime = null;
    
    // Update UI
    if (isBreak) {
        focusTab.classList.remove("active");
        breakTab.classList.add("active");
        sessionTypeTitle.textContent = "Break Session";
        description.textContent = "Look at something 20 feet away for 20 seconds 👀";
        body.classList.remove("theme-focus");
        body.classList.add("theme-break");
    } else {
        focusTab.classList.add("active");
        breakTab.classList.remove("active");
        sessionTypeTitle.textContent = "Focus Session";
        description.textContent = "Focus on your work for 20 minutes 🎯";
        body.classList.remove("theme-break");
        body.classList.add("theme-focus");
    }
    
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Update progress bar
    const total = isBreak ? BREAK_TIME : WORK_TIME;
    const progress = ((total - timeLeft) / total) * 100;
    progressInner.style.width = `${progress}%`;

    // Update document title
    document.title = `${timerDisplay.textContent} - NetraMarga`;
}

// --- Utils ---

function playAlarm() {
    alarmSound.play().catch(e => console.log("Sound play prevented by browser policy", e));
}

function showNotification(title, message) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: message,
            icon: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
        });
    }
}

function openReport() {
    statsFocus.textContent = focusSessionsCount;
    statsTime.textContent = `${totalFocusMinutes}m`;
    reportModal.style.display = "flex";
}

function closeModals() {
    reportModal.style.display = "none";
}

// Initialize on load
init();
