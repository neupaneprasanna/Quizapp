const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

const noOfQuestions = 5;

// catogery buttons
const scienceCatogeryBtn = document.querySelector('.science-cat');
const mathsCatogeryBtn = document.querySelector('.maths-cat');
const englishCatogeryBtn = document.querySelector('.english-cat');
const generalCatogeryBtn = document.querySelector('.general-cat');
const physicsCatogeryBtn = document.querySelector('.physics-cat');
const computerCatogeryBtn = document.querySelector('.computer-cat');
const rapidCatogeryBtn = document.querySelector('.rapid-cat');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    startQuiz();
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    window.requestAnimationFrame(() => {
        clearCatogeryActiveBtn();
        quizBox.classList.add('active');
        nextBtn.classList.remove('active');
        resultBox.classList.remove('active');

        questionCount = 0;
        questionNumb = 1;
        userScore = 0;

        optionList.innerHTML = '';

        quizQuestions = getRandomQuestions(selectedCategory);

        showQuestions(questionCount, quizQuestions);
        questionCounter(questionNumb);
        headerScore();
    });
};

goHomeBtn.onclick = () => {
    selectedCategory = '';
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
}

let selectedCategory = '';

// Catogery Buttons
scienceCatogeryBtn.onclick = () => {
    clearCatogeryActiveBtn();
    scienceCatogeryBtn.classList.add('active');
    continueBtn.classList.add('active');
    selectedCategory = 'science';
    updateCategoryDisplay();
}

mathsCatogeryBtn.onclick = () => {
    clearCatogeryActiveBtn();
    mathsCatogeryBtn.classList.add('active');
    continueBtn.classList.add('active');
    selectedCategory = 'maths';
    updateCategoryDisplay();
}

englishCatogeryBtn.onclick = () => {
    clearCatogeryActiveBtn();
    englishCatogeryBtn.classList.add('active');
    continueBtn.classList.add('active');
    selectedCategory = 'english';
    updateCategoryDisplay();
}

generalCatogeryBtn.onclick = () => {
    clearCatogeryActiveBtn();
    generalCatogeryBtn.classList.add('active');
    continueBtn.classList.add('active');
    selectedCategory = 'general';
    updateCategoryDisplay();
}

physicsCatogeryBtn.onclick = () => {
    clearCatogeryActiveBtn();
    physicsCatogeryBtn.classList.add('active');
    continueBtn.classList.add('active');
    selectedCategory = 'physics';
    updateCategoryDisplay();
}

computerCatogeryBtn.onclick = () => {
    clearCatogeryActiveBtn();
    computerCatogeryBtn.classList.add('active');
    continueBtn.classList.add('active');
    selectedCategory = 'computer';
    updateCategoryDisplay();
}

rapidCatogeryBtn.onclick = () => {
    clearCatogeryActiveBtn();
    rapidCatogeryBtn.classList.add('rapid-active');
    continueBtn.classList.add('rapid-active');
    selectedCategory = 'random';
    updateCategoryDisplay();
}


function clearCatogeryActiveBtn() {
    scienceCatogeryBtn.classList.remove('active');
    mathsCatogeryBtn.classList.remove('active');
    englishCatogeryBtn.classList.remove('active');
    generalCatogeryBtn.classList.remove('active');
    physicsCatogeryBtn.classList.remove('active');
    computerCatogeryBtn.classList.remove('active');
    rapidCatogeryBtn.classList.remove('rapid-active');
    continueBtn.classList.remove('rapid-active');
}

function updateCategoryDisplay() {
    const categoryDisplay = document.querySelector('.quiz-category');
    categoryDisplay.textContent = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`;
}



let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < quizQuestions.length - 1) {
        questionCount++;
        showQuestions(questionCount, quizQuestions);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        nextBtn.classList.remove('active');
        showResultBox();
    }
}


const optionList = document.querySelector('.option-list');

function showQuestions(index, quizQuestions) {
    if (!quizQuestions || quizQuestions.length === 0) {
        console.error('Quiz questions are undefined or empty.');
        return;
    }

    console.log(`Showing question ${index + 1} out of ${quizQuestions.length}`);

    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${index + 1}. ${quizQuestions[index].question}`;

    let optionTag = '';
    quizQuestions[index].options.forEach(option => {
        optionTag += `<div class="option"><span>${option}</span></div>`;
    });

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    option.forEach(opt => {
        opt.addEventListener('click', function () {
            optionSelected(this, quizQuestions, index);
        });
    });
}

function optionSelected(answer, quizQuestions, index) {
    let userAnswer = answer.textContent;
    let correctAnswer = quizQuestions[index].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disable');
    }

    nextBtn.classList.add('active');
}

function getRandomQuestions(category) {
    const allQuestions = questions[category];
    const selectedQuestions = [];

    if (!allQuestions || allQuestions.length === 0) {
        console.error(`No questions found for category: ${category}`);
        return [];
    }

    const numberOfQuestions = Math.min(noOfQuestions, allQuestions.length);
    while (selectedQuestions.length < numberOfQuestions) {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        const question = allQuestions[randomIndex];
        if (!selectedQuestions.includes(question)) {
            selectedQuestions.push(question);
        }
    }

    return selectedQuestions;
}

let quizQuestions = [];

function startQuiz() {
    quizQuestions = getRandomQuestions(selectedCategory);
    showQuestions(0, quizQuestions);
    questionCounter(1);
    headerScore();
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${quizQuestions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${quizQuestions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Score ${userScore} out of ${quizQuestions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / quizQuestions.length) * 100;
    let speed = 10;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#2ba0ee ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}