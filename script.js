// Initial Date
let currentQuestion = 0;
let correctAnswer = 0;

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetQuiz);

// Functions

function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;
        let optionsHTML = '';

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`


        for (let i in q.options) {
            optionsHTML += `<div data-op="${i}" class="option"><span>${parseInt(i)+ 1}</span>${q.options[i]}</div>`
        }

        document.querySelector('.options').innerHTML = optionsHTML;

        document.querySelectorAll('.option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    }

    else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = (e.target.getAttribute('data-op'));
    if(questions[currentQuestion].answer == clickedOption) {
        correctAnswer ++;
    }
    currentQuestion ++;
    showQuestion();
};

function finishQuiz() {
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';

    let points = Math.floor((correctAnswer / questions.length) * 100);

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Ta ruim hein?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    }

    else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom!!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    }

    else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabens!!!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}`;

};

function resetQuiz() {
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestion();
}
showQuestion();