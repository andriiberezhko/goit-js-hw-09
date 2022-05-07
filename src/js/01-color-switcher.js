
const refs = {
    body: document.querySelector('body'),
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]')
};


refs.startButton.addEventListener('click', onStartClick);
refs.stopButton.addEventListener('click', onStopClick);
refs.stopButton.setAttribute('disabled', 'true');
let timerId = null;

function onStartClick() {
    
    refs.startButton.setAttribute('disabled', 'true');
    refs.stopButton.removeAttribute('disabled');
    timerId = setInterval(() => {
        refs.body.style.background = getRandomHexColor();
    }, 1000);
    
};

function onStopClick() {
    refs.startButton.removeAttribute('disabled');
    refs.stopButton.setAttribute('disabled', 'true');
    clearInterval(timerId);
};



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};