function init() {
    document.getElementById('total_questions').innerHTML = questions.length;

    showQuestion();
}

let currentQuestion = 0;
let correctAnswers = 0;

let AUDIO_SUCCESS = new Audio('./audio/success.wav');
let AUDIO_FAIL = new Audio('./audio/fail.mp3');

function showQuestion(){
    if(gameIsOver()){
        updateProgressBar();
        showEndScreen();
    } else {
        updateProgressBar();
        updateQuestion();
    }
}

function gameIsOver(){
    return currentQuestion == questions.length;
}

function showEndScreen(){
        document.getElementById('endscreen').classList.remove('d_none');
        document.getElementById('question_body').classList.add('d_none');

        document.getElementById('result_total_questions').innerHTML = questions.length;
        document.getElementById('result_correct_answers').innerHTML = correctAnswers;

        if(correctAnswers > 5) {
            document.getElementById('header-image').src = './img/trophy_end_screen.jpg';
        } else {
            document.getElementById('header-image').src = './img/fail.png'
        }
}

function updateQuestion(){   
        let question = questions[currentQuestion];

        document.getElementById('current_question').innerHTML = currentQuestion + 1;
        document.getElementById('question_text').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];

        document.getElementById('endscreen').classList.add('d_none');
}

function updateProgressBar(){
        let percent = (currentQuestion / questions.length) * 100;
        document.getElementById('progress-bar').innerHTML = `${percent} %`;
        document.getElementById('progress-bar').style = `width: ${percent}%`;    
}

function answerQuestion(selectedAnswer){
    let question = questions[currentQuestion];
    let selectedAnswerNumber = selectedAnswer.slice(-1); //schneidet den letzten Buchstaben ab und bindet diesen an eine Variable

    let idOfRightAnswer = `answer_${question.right_answer}`;

    if(selectedAnswerNumber == question.right_answer){
        console.log('Korrekt');
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-success'); //Zugriff auf das Parent-Element

        correctAnswers++;
        AUDIO_SUCCESS.play();
    } else {
        console.log('Falsch');
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        
        AUDIO_FAIL.play();
    }

    document.getElementById('next_question_button').disabled = false;
}

function nextQuestion(){
    currentQuestion++;
    document.getElementById('next_question_button').disabled = true;
    resetAnswerButtons()
    showQuestion();

    // let current_question = document.getElementById('current_question').innerHTML;
    // current_question++
    // document.getElementById('current_question').innerHTML = current_question;

    // let rightAnswer = document.getElementsByClassName('bg-success');
    // let wrongAnswer = document.getElementsByClassName('bg-danger');

    // rightAnswer[0].classList.remove('bg-success');
    // wrongAnswer[0].classList.remove('bg-danger');
}

function resetAnswerButtons(){
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function restartGame(){
    currentQuestion = 0;
    correctAnswers = 0;
    document.getElementById('header-image').src = './img/school_supplies.jpg';
    document.getElementById('question_body').classList.remove('d_none');

    init();
}

