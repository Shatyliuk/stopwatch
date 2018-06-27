import 'normalize.css';
import './sass/main.sass';

function Stopwatch(container) {

    this.stopwatchContainer = container;
    let milisecondsAmount = 0;
    let interval;
    let previousDate;
    let timerValue;
    let laps = [];
    let lapsContainer;

    let stopwatchMarkup = () => {
        let timer = document.createElement('div');
        let currentTime = document.createElement('p');
        let stopControls = document.createElement('div');

        let startButton = document.createElement('button');
        let stopButton = document.createElement('button');
        let lapButton = document.createElement('button');
        let resetButton = document.createElement('button');

        let laps = document.createElement('div');

        currentTime.textContent = '00:00:00:000';

        timer.className = 'timer';
        currentTime.className = 'currentTime';
        laps.className = 'laps';

        stopControls.className = 'stopControls'

        startButton.className = 'btn btn-start';
        stopButton.className = 'btn btn-stop';
        lapButton.className = 'btn btn-lap';
        resetButton.className = 'btn btn-reset';

        startButton.textContent = 'Start';
        stopButton.textContent = 'Stop';
        lapButton.textContent = 'Lap';
        resetButton.textContent = 'Reset';

        stopControls.appendChild(startButton);
        stopControls.appendChild(stopButton);
        stopControls.appendChild(lapButton);
        stopControls.appendChild(resetButton);

        timer.appendChild(currentTime);
        timer.appendChild(stopControls);
        timer.appendChild(laps);

        startButton.addEventListener('click', () => {
            this.start();
        });
    
        stopButton.addEventListener('click', () => {
            this.stop();
        });
    
        resetButton.addEventListener('click', () => {
            this.reset();
        });
    
        lapButton.addEventListener('click', () => {
            this.lapTime();
        });
        this.stopwatchContainer.appendChild(timer);
    }
    
    stopwatchMarkup();

    function formatTime(milisecondsAmount) {
        let miliseconds = parseInt(milisecondsAmount % 1000);
        let seconds = parseInt((milisecondsAmount / 1000) % 60);
        let minutes = parseInt((milisecondsAmount / (1000 * 60)) % 60);
        let hours = parseInt((milisecondsAmount / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        miliseconds = (miliseconds < 10) ? '00' + miliseconds : (miliseconds < 100) ? '0' + miliseconds : miliseconds

        return `${hours}:${minutes}:${seconds}:${miliseconds}`;
    }

    function updateTimer(miliseconds) {
        timerValue = document.querySelector('.currentTime');
        timerValue.textContent = formatTime(miliseconds);
    }

    function update() {
        milisecondsAmount += delta();
        updateTimer(milisecondsAmount);
    }

    function delta() {
        let now = Date.now();
        let timePassed = now - previousDate;
        previousDate = now;

        return timePassed;
    }
    this.isOn = false;

    this.start = function () {

        if (!this.isOn) {
            previousDate = Date.now();
            interval = setInterval(update, 60);
            this.isOn = true;
        }
        
    }

    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }      
    }

    this.reset = function () {
        this.stop();
        milisecondsAmount = 0;
        timerValue.textContent = formatTime(0);
        laps = [];
        lapsContainer.innerHTML = '';
    }

    this.lapTime = function() {
        if (milisecondsAmount === 0 || laps[laps.length - 1] === milisecondsAmount) {
            return;
        }
        laps.push(milisecondsAmount);
        newLap();
    }

    function newLap() {
        let newLapContainer = document.createElement('div');
        let newLapValue;
        lapsContainer = document.querySelector('.laps');

        laps.forEach(function(item) {
            newLapValue = document.createElement('p');
            newLapValue.textContent = formatTime(item);
            newLapContainer.appendChild(newLapValue);
        });

        if (lapsContainer.hasChildNodes) {
            lapsContainer.innerHTML = '';
        }
        
        lapsContainer.appendChild(newLapContainer);
        
    }

}

(function init() {
    let stopwatchContainer = document.querySelector('.stopwatchContainer');
    let stopwatch = new Stopwatch(stopwatchContainer);
})();