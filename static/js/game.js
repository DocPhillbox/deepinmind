function selectQuiz(){
    var quiz = event.target;
    var lblQuiz = document.getElementById('quiz_selected');
    lblQuiz.style.color = 'black';
    lblQuiz.innerText = quiz.textContent;
}

function gameLink(){
    var lblQuiz = document.getElementById('quiz_selected');
    var gameName = document.querySelector('#select').textContent;
    if(lblQuiz.innerText == "Aucun quiz choisi" || lblQuiz.innerText == "Choisissez un quiz"){
        event.preventDefault();
        lblQuiz.innerText = "Choisissez un quiz";
        lblQuiz.style.color = 'red';
    } else {
        // Sauvegarde les données dans le local storage
        localStorage.setItem("QUIZ_NAME", lblQuiz.textContent);
        console.log(gameName);
        window.location.pathname = gameName + '/';
    }
}

// Variables du slider
var slider_data;
var questions;
var idx_slide = 0;
var questions = [];
var launched = false;

function testAsync() {
    var quiz_data = document.getElementById('launch-game').value;
    var container = document.querySelector("#game");

    // Ajout dynamique des éléments
    var slider_container = document.createElement('div');
    slider_container.setAttribute('id', 'slider');
    var progress_container = document.createElement('div');
    progress_container.setAttribute('id', 'progress');

    var question_p = document.createElement('p');
    question_p.setAttribute('id', 'question');
    container.appendChild(question_p);

    for(var idx_answer = 0; idx_answer <= 3; idx_answer++){
        var answer_p = document.createElement('p');
        answer_p.setAttribute('id', 'answer' + idx_answer);
        answer_p.setAttribute('class', 'answer');
        answer_p.setAttribute('onclick', 'selectedAnswer()');
        slider_container.appendChild(answer_p);
    }

    var progress_bar = document.createElement('div');
    progress_bar.setAttribute('id', 'progress-bar');
    progress_container.appendChild(progress_bar);

    var time_p = document.createElement('p');
    time_p.setAttribute('id', 'time');
    progress_container.appendChild(time_p);

    container.appendChild(slider_container);
    container.appendChild(progress_container);

    // Convertit le json en objet javascript
    quiz_data = quiz_data.replace(/'/g, "\"");
    var quiz = JSON.parse(quiz_data);

    // Création de la page de réponse du quiz
    // Création du paragraphe de titre
    var title = document.querySelector('#title');
    title.innerText = quiz['quesTitle'];

    // Stock toutes les questions et réponses
    var data = [];

    // Récupération des questions
    var hasProperty = true;
    var i = 0;
    while(hasProperty){
        if(quiz.hasOwnProperty("question" + i)){
            questions.push(quiz["question" + i]);
        } else {
            hasProperty = false;
        }
        i++;
    }

    // Affiche la l'énoncé de la première queston
    var quesTitle = document.querySelector("#question");
    quesTitle.innerText = questions[0]["title"];
    // Affichage des questions
    var lstAnswers = ["a0", "a1", "a2", "a3"];
    for(var i = 0; i < 4; i++){
        lstAnswers[i] = document.querySelector("#answer" + i);
        lstAnswers[i].innerText = questions[0]["answer" + i]["data"];
    }

    // Affichage des différentes questions du quiz
    questions.forEach(question => {
        var segment = [];
        segment.push(question);

        // Récupération des réponses de la question
        var hasProperty = true;
        var i = 0;
        var answers = [];

        while(hasProperty){
            if(question.hasOwnProperty("answer" + i)){
                answers.push(question["answer" + i]);
            } else {
                hasProperty = false;
            }
            i++;
        }

        segment.push(answers);
        data.push(segment);
    });

    // Variable pour le slider
    slider_data = document.querySelector('#slider');

    // Lance le timer
    if(!launched){
        setTime();
        launched = true;
    }

    // Unbind du bouton lancer la partie
    var btn_launch = document.querySelector('#launch-game');
    btn_launch.remove();
}

function prev() {
    if(idx_slide <= 0) idx_slide = questions.length;
    idx_slide--;
    setData(idx_slide);
}

function next() {
    if(idx_slide >= questions.length - 1){
        correctAnswer();
    } else {
        idx_slide++;
        setData(idx_slide);
        selectedAnswer(true);
    }
}

function setData(idx) {
    // Affiche la l'énoncé de la queston
    var quesTitle = document.querySelector("#question");
    quesTitle.innerText = questions[idx]["title"];
    // Affichage des questions
    var lstAnswers = ["a0", "a1", "a2", "a3"];
    for(var i = 0; i < 4; i++){
        lstAnswers[i] = document.querySelector("#answer" + i);
        lstAnswers[i].innerText = questions[idx]["answer" + i]["data"];
    }
}

var selectedItem;
function selectedAnswer(nexted = false) {
    if(nexted){
        if(selectedItem != undefined) selectedItem.setAttribute("class", "answer");
    } else {
        if(selectedItem != undefined) selectedItem.setAttribute("class", "answer");
        selectedItem = event.target;
        selectedItem.setAttribute("class", "selectedAnswer");
    }
}

var t = 0;
var time;
var totalTime = 100;
function setTime() {
    time = document.querySelector("#time");
    window.t = totalTime;
    timer();
}

function timer() {
    var temp = window.t;
    window.t = window.t-1;
    time.innerText = temp;
    document.querySelector("#progress-bar").style.width = (temp*100)/window.totalTime + "%";
    var t = setTimeout(timer, 1);
    if(temp < 0){
        window.t = window.totalTime;
        next();
    }
}

function correctAnswer() {
    // Vide la page
    var game = document.querySelector('#game');
    game.remove();
}