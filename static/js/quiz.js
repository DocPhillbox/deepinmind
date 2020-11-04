// Déclaration des variables utilisées dans toutes les fonctions
// Liste contenant toutes les listes des objets de question
var formList = [];
// Contient l'index de la dernière question
var lastQuestion = 0;

// Ajoute une nouvelle question
function addform() {
    // Liste contenant tous les objets DOM de la question
    var questionList = [];
    // Index de la question actuelle
    var currentQuestion = lastQuestion;

    // Create question paragraph
    var pQuestion = document.createElement("p");
    var textNode = document.createTextNode("Question :");
    pQuestion.appendChild(textNode);
    document.getElementById("form-quiz").appendChild(pQuestion);
    questionList.push(pQuestion);

    // Create input for question
    var inpQuestion = document.createElement("input");
    inpQuestion.setAttribute("type", "text");
    inpQuestion.setAttribute("name", "question");
    inpQuestion.setAttribute("id", "question" + currentQuestion);
    inpQuestion.setAttribute("class", "entryHead");
    document.getElementById("form-quiz").appendChild(inpQuestion);
    questionList.push(inpQuestion);

    // Create answer paragraphs
    var pAnswer = document.createElement("p");
    var answerNode = document.createTextNode("Réponses :");
    pAnswer.appendChild(answerNode);
    document.getElementById("form-quiz").appendChild(pAnswer);
    questionList.push(pAnswer);

    var pCoche = document.createElement("p");
    var cocheNode = document.createTextNode("Cochez la bonne réponse");
    pCoche.appendChild(cocheNode);
    pCoche.setAttribute("class", "tiny");
    document.getElementById("form-quiz").appendChild(pCoche);
    questionList.push(pCoche);

    // Ajoute les 4 radion button dont un coché
    var i;
    for (i = 0; i < 4; i++) {
        // Create input for answers
        var divReponse = document.createElement("div");
        var radGoodReponse1 = document.createElement("input");
        radGoodReponse1.setAttribute("type", "radio");
        radGoodReponse1.setAttribute("name", "response" + formList.length);
        if(i == 0){
            radGoodReponse1.setAttribute("checked", "true");
        }
        divReponse.appendChild(radGoodReponse1);
        questionList.push(radGoodReponse1);

        var inpReponse1 = document.createElement("input");
        inpReponse1.setAttribute("type", "text");
        inpReponse1.setAttribute("name", "rep" + i);
        inpReponse1.setAttribute("id", "answer" + currentQuestion);
        inpReponse1.setAttribute("class", "entry");
        divReponse.appendChild(inpReponse1);
        document.getElementById("form-quiz").appendChild(divReponse);
        questionList.push(inpReponse1);
    }
    
    // Create delete button
    var btnDel = document.createElement("button");
    btnDel.setAttribute("type", "button");
    var delText = document.createTextNode("Supprimer");
    btnDel.appendChild(delText);

    // Sur le click du bouton supprime le question actuelle 
    // Supprime les objets DOM contenu dans la liste
    btnDel.onclick = function(){
        // Contient la liste des objets à supprimer
        lstDom = formList[currentQuestion];
        // Supprime la liste actuelle
        formList.splice(currentQuestion, 1);
        // Supprime chaque objet contenu dans la liste
        lstDom.forEach(objectDOM => {
            objectDOM.parentNode.removeChild(objectDOM);
        });
    };
    document.getElementById("form-quiz").appendChild(btnDel);
    questionList.push(btnDel);

    // Add to global list
    formList.push(questionList);
    lastQuestion += 1;
}

// Sauvegarde le quiz dans un fichier JSON
function saveform() {
    // Base du fichier JSON
    var quizData = {};
    // Load quiz title into JSON
    var quizTitle = document.getElementById("title").value;
    quizData.quesTitle = quizTitle;
    
    // Contient le nombre de question a enregistrer
    var nbQuestion = 0;
    formList.forEach(listDOM => {
        // Add each question
        var nbAnswer = 0;
        var right;
        // Base de la question du fichier JSON
        quizQuestion = {};
        // Ajout du titre de la question dans le fichier JSON
        quizQuestionTitle = document.getElementById("question" + nbQuestion).value;
        quizQuestion.title = quizQuestionTitle;

        // Récupère chaque objet DOM de la question
        listDOM.forEach(objectDOM => {
            // Convert into JSON file
            // Test si l'objet est un radio button
            if(objectDOM.tagName === "INPUT" && objectDOM.type === "radio"){
                // Test s'il est checké
                if(objectDOM.checked) {
                    right = true;
                } else {
                    right = false;
                }
            }
            // Test si l'objet est un input de texte
            if(objectDOM.tagName === "INPUT" && objectDOM.type === "text"){
                // Test si c'est une réponse et pas la question
                if(objectDOM.classList.contains("entry")){
                    // Récupère le texte
                    var answer = objectDOM.value;
                    // Nom de la question ex : answer1
                    var nameAnswer = "answer" + nbAnswer;
                    // Contient la question et s'il est correct
                    frame = {};
                    frame.data = answer;
                    // Test si la réponse est correct
                    if(right){
                        frame.isRight = "true";
                    } else {
                        frame.isRight = "false";
                    }
                    quizQuestion[nameAnswer] = frame;
                    
                    nbAnswer += 1;
                }
            }
        });
        // Ajoute le nom de la question
        var quesName = "question" + nbQuestion;
        quizData[quesName] = quizQuestion;
        nbQuestion += 1;
    });
    // Envoie les données dans la valeur du bouton
    var btnData = document.getElementById("btnData");
    btnData.setAttribute("value", JSON.stringify(quizData));
}