const startBtn = document.querySelector('.btn-start'); 
const stopBtn = document.querySelector('.btn-stop'); // Добавляем кнопку "Stop"
const timer = document.querySelector('.timer'); 

let timerInterval;
let active = false;
let workTime = 25 * 60; // 25 минут в секундах
let breakTime = 5 * 60; // 5 минут в секундах
let timeLeft = workTime; // Инициализация времени
let isWorkTimer = true; // Флаг для отслеживания текущего режима (работа или перерыв)
let audio; // Переменная для хранения ссылки на объект аудио

function startTimer() {
    if (active) {
        clearInterval(timerInterval); // Останавливаем предыдущий таймер, если он активен
    }
    
    active = true; // Устанавливаем флаг активности таймера

    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        timer.textContent = `${minutes}:${seconds}`;

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timerInterval); // Останавливаем таймер, когда время истекло
            playAudio(); // Воспроизводим аудио и показываем сообщение
        }
    }, 1); // Интервал в 1000 миллисекунд (1 секунда)
}

function stopTimer() {
    clearInterval(timerInterval); // Останавливаем текущий таймер
    active = false; // Сбрасываем флаг активности
    timeLeft = isWorkTimer ? workTime : breakTime; // Сбрасываем оставшееся время в зависимости от текущего режима
    timer.textContent = `${Math.floor(timeLeft / 60)}:00`; // Обновляем отображение таймера
    
    if (audio) {
        audio.pause(); // Останавливаем воспроизведение аудио
        audio.currentTime = 0; // Сбрасываем текущее время аудио в начало
    }
}

function playAudio() {
    audio = new Audio("./audio.mp3"); // Создаем новый объект аудио и сохраняем его ссылку в переменной audio
    audio.play();

    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;

        if (active) { // Проверяем, активен ли таймер перед показом сообщения и перезапуском таймера
            if (isWorkTimer) {
                alert("Let's take a 5 minute break!");
                timeLeft = breakTime; // Устанавливаем время для перерыва
            } else {
                alert("Back to work!");
                timeLeft = workTime; // Устанавливаем время для работы
            }

            isWorkTimer = !isWorkTimer; // Переключаем режим
            startTimer(); // Запускаем новый таймер
        }
    }, 5000); // Воспроизводим аудио 5 секунд
}

// Добавляем прослушиватели событий для кнопок Start и Stop
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
