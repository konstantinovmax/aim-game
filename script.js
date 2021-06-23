const startButton = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#ca8900', '#fef100', '#8a1d29', '#16D9E3', '#fff'];
let time = 0;
let score = 0; 

startButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('time-btn')) {
        time = parseInt(evt.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('circle')) {
        score++;
        evt.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setTime(time);
    setInterval(decreaseTime, 1000);
    createRandomCircle();
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
    
}

function setTime(value) {
    timeEl.textContent = `00:${value}`;
}

function finishGame() {
    timeEl.parentElement.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    console.lo
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = color;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}