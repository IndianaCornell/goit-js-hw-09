import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

// refs

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
};

// function for calculating the time difference

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// turn off the button
refs.startBtn.disabled = true;

//
let currentTime = null;
let intervalId = null;
let setTime = null;

// flatpickr options

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.startBtn.disabled = false;
    setTime = selectedDates[0].getTime();

    const currentTime = Date.now();
    let difference = setTime - currentTime;
    const countdownValue = convertMs(difference);

    if (setTime < currentTime) {
      Report.warning('Oops!', 'Please choose future date!', 'Try Again');
      return;
    }
    updatingCounter(countdownValue);
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onTimerRun);

// timer starts to count down

function onTimerRun() {
  refs.startBtn.disabled = true;
  intervalId = setInterval(onClockHandle, 1000);
}

function onClockHandle() {
  currentTime = Date.now();
  const timeLeft = setTime - currentTime;
  onTimerStop(timeLeft);
  const formatTime = convertMs(timeLeft);
  updatingCounter(formatTime);
}

function onTimerStop(timeLeft) {
  if (timeLeft < 1000) {
    clearInterval(intervalId);
    Report.warning('Times up!', 'Please choose another date!', 'Try Again');
  }
}

// write a function to get two-digit numbers only

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// lets updater our counter values

function updatingCounter({ days, hours, minutes, seconds }) {
  refs.daysSpan.textContent = `${days}`;
  refs.hoursSpan.textContent = `${hours}`;
  refs.minutesSpan.textContent = `${minutes}`;
  refs.secondsSpan.textContent = `${seconds}`;
}
