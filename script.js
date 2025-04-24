class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        this.isWorkMode = true;
        
        // DOM elements
        this.timeDisplay = document.getElementById('time-display');
        this.minutesDisplay = this.timeDisplay.querySelector('.minutes');
        this.secondsDisplay = this.timeDisplay.querySelector('.seconds');
        this.resetButton = document.getElementById('reset');
        this.modeToggle = document.getElementById('mode-toggle');
        this.modeTexts = document.querySelectorAll('.mode-text');
        this.workText = document.getElementById('work-text');
        this.breakText = document.getElementById('break-text');
        
        // Event listeners
        this.timeDisplay.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.reset());
        this.modeToggle.addEventListener('click', () => this.toggleMode());
        this.workText.addEventListener('click', () => this.setMode(true));
        this.breakText.addEventListener('click', () => this.setMode(false));
        
        this.updateDisplay();
    }
    
    toggleTimer() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.playAlarm();
                    this.reset();
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timerId);
        }
    }
    
    reset() {
        this.pause();
        this.timeLeft = (this.isWorkMode ? 25 : 5) * 60;
        this.updateDisplay();
    }
    
    setMode(isWorkMode) {
        if (this.isWorkMode !== isWorkMode) {
            this.isWorkMode = isWorkMode;
            this.modeToggle.classList.toggle('active');
            this.modeTexts.forEach(text => text.classList.toggle('active'));
            this.reset();
        }
    }
    
    toggleMode() {
        this.setMode(!this.isWorkMode);
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        
        // Update the tab title with the timer countdown
        if (this.isRunning) {
            document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            document.title = 'Pomodoro Timer';
        }
    }
    
    playAlarm() {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 