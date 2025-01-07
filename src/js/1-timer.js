import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startImput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = new Date();
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Illegal operation',
        position: 'topRight',
      });

      // userSelectedDate = null;
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(startImput, options);

startBtn.addEventListener('click', startCountdown);

function startCountdown() {
  startBtn.disabled = true;
  startImput.disabled = true;
  timerId = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = userSelectedDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(timerId);
      updateTimerDisplay(0);
      iziToast.success({
        title: 'Finished',
        message: 'Countdown completed!',
        position: 'topRight',
      });

      // startBtn.disabled = false;
      startImput.disabled = false;
      return;
    }

    addLeadingZero(timeDifference);
  }, 1000);
}

function addLeadingZero(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));
