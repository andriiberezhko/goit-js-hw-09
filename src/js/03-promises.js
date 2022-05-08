import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import "notiflix/dist/notiflix-3.2.5.min.css";



const refs = {
  form: document.querySelector('form'),
  firstDelay: document.querySelector('[name="delay"]'),
  stepDelay: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onButtonClick);

function onButtonClick(event) {
   event.preventDefault();
  const delay = Number(refs.firstDelay.value);
  const step = Number(refs.stepDelay.value);
  const amount = Number(refs.amount.value);
  let delayStep = delay;
  for (let i = 1; i <= amount; i++) {
    
    createPromise(i, delayStep)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delayStep += step;
  };

  
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay } );
      }
      else {
        reject({ position, delay });
      }
    }, delay)
  })
  
};