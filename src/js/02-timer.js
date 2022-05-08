// Описаний в документації
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import "notiflix/dist/notiflix-3.2.5.min.css";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startButton: document.querySelector('[data-start]'),
    day: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

refs.startButton.setAttribute('disabled', 'true');

class Timer {
    constructor({onTick}) {
        this.intervalId = null;
        this.isActiv = false;
        this.onTick = onTick;
       
    }
    start() {
        if (this.isActiv) { return };

        //  Вот хоть убейте, не могу додуматься как сюда передать дату, это значение появляется в момент закрытия календаря, а как его оттуда вытянуть не понимаю
        const curentTime = fp.selectedDates[0];   
        this.isActiv = true;
        

        this.intervalId = setInterval(() => {
            const startTime = Date.now();
            const deltaTime = curentTime - startTime
            if (deltaTime <= 0) {

                
                this.stop();
                return
            };
            const time = this.convertMs(deltaTime)
            
            this.onTick(time);
            
        }, 1000)
    }
    
    stop() {
        refs.startButton.setAttribute('disabled', 'true');
        clearInterval(this.intervalId);
        this.isActiv = false;
    }
    pad(value) {
     return String(value).padStart(2, '0');
    }
    convertMs(ms) {
   // Number of milliseconds per unit of time
     const second = 1000;
     const minute = second * 60;
     const hour = minute * 60;
     const day = hour * 24;

     // Remaining days
     const days = this.pad(Math.floor(ms / day));
        // Remaining hours
     const hours = this.pad(Math.floor((ms % day) / hour));
     // Remaining minutes
     const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
     const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));
       
     return { days, hours, minutes, seconds };
}
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
      const date = new Date();
      const difTime = selectedDates[0] - date;
    
      if (difTime < 0) {
          Notiflix.Notify.failure("Please choose a date in the future");
        
          return;
      };
      refs.startButton.removeAttribute('disabled');
      
  },
};


const fp = flatpickr('input#datetime-picker', options);


const timer = new Timer({ onTick: updateClockFace });

refs.startButton.addEventListener('click', timer.start.bind(timer));


function updateClockFace({ days, hours, minutes, seconds }) {
    refs.day.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
};







