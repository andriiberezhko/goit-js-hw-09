// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startButton: document.querySelector('[data-start]'),
};

refs.startButton.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
      const date = new Date();
      const difTime = selectedDates[0] - date;
    
      if (difTime < 0) {
          alert('"Please choose a date in the future"');
          return;
      };
      refs.startButton.removeAttribute('disabled');
   
  },
};

const fp = flatpickr('input#datetime-picker', options);





const timer = {
    start() {
        const curentTime = fp.selectedDates[0];
        
        

        setInterval(() => {
            const startTime = Date.now();
            const deltaTime = curentTime - startTime
            const { days, hours, minutes, seconds } = convertMs(deltaTime)
            console.log({ days, hours, minutes, seconds });
        }, 1000)
    },
};

refs.startButton.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    timer.start();
}




function pad(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
//   console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}


