
/* ==========================================
   CYBERSECURITY - INTERACTIVE FEATURES
========================================== */


/* ------------------------------------------
   1. Update the footer year
------------------------------------------ */

const yearElement = document.querySelector("[data-year]");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ------------------------------------------
   2. Self-assessment checklist
------------------------------------------ */

const safetyChecks = document.querySelectorAll(".safety-check");
const checkScore = document.getElementById("check-score");
const checkMessage = document.getElementById("check-message");
const resetChecklist = document.getElementById("reset-checklist");


function updateChecklist() {

    let totalChecked = 0;

    safetyChecks.forEach(function (checkbox) {

        if (checkbox.checked) {
            totalChecked++;
        }

    });

    checkScore.textContent = totalChecked;

    if (totalChecked === 0) {

        checkMessage.textContent =
            "Commencez par adopter quelques bonnes habitudes de sécurité.";

    } else if (totalChecked <= 2) {

        checkMessage.textContent =
            "Vous avez commencé, mais plusieurs habitudes restent à améliorer.";

    } else if (totalChecked <= 4) {

        checkMessage.textContent =
            "Bon progrès ! Continuez à renforcer votre protection numérique.";

    } else {

        checkMessage.textContent =
            "Excellent ! Vous adoptez de nombreux réflexes de cybersécurité.";

    }

}


safetyChecks.forEach(function (checkbox) {

    checkbox.addEventListener("change", updateChecklist);

});


if (resetChecklist) {

    resetChecklist.addEventListener("click", function () {

        safetyChecks.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        updateChecklist();

    });

}


/* ------------------------------------------
   3. Quiz questions
------------------------------------------ */

const quizQuestions = [

    {
        question: "Qu'est-ce qu'un mot de passe robuste ?",

        options: [
            "Une date de naissance facile à retenir",
            "Un mot de passe long, unique et difficile à deviner",
            "Le même mot de passe pour tous les comptes"
        ],

        answer: 1,

        explanation:
            "Un mot de passe long et unique réduit le risque qu'un accès compromis permette d'ouvrir plusieurs comptes."
    },

    {
        question: "Que faut-il faire devant un message suspect ?",

        options: [
            "Cliquer rapidement sur le lien",
            "Transmettre le message à ses amis",
            "Vérifier l'expéditeur et le lien avant toute action"
        ],

        answer: 2,

        explanation:
            "Il faut examiner l'adresse de l'expéditeur et le lien, sans communiquer d'informations personnelles."
    },

    {
        question: "Quel est le rôle d'un rançongiciel ?",

        options: [
            "Chiffrer ou bloquer l'accès aux fichiers et réclamer une rançon",
            "Améliorer la vitesse de l'ordinateur",
            "Protéger les mots de passe"
        ],

        answer: 0,

        explanation:
            "Un rançongiciel est un logiciel malveillant qui bloque l'accès aux données ou les chiffre pour demander une rançon."
    },

    {
        question: "Pourquoi activer la double authentification ?",

        options: [
            "Pour supprimer les mises à jour",
            "Pour ajouter une vérification lors de la connexion",
            "Pour partager son compte avec quelqu'un"
        ],

        answer: 1,

        explanation:
            "La double authentification ajoute une étape de vérification et renforce la sécurité du compte."
    },

    {
        question: "Pourquoi faut-il sauvegarder ses fichiers ?",

        options: [
            "Pour les rendre publics",
            "Pour éviter d'utiliser un mot de passe",
            "Pour pouvoir les récupérer en cas de perte ou d'incident"
        ],

        answer: 2,

        explanation:
            "Une sauvegarde permet de récupérer des fichiers après une panne, une suppression accidentelle ou une attaque."
    }

];


/* ------------------------------------------
   4. Quiz elements
------------------------------------------ */

const quizContainer = document.getElementById("cyber-quiz");

const questionNumber = document.getElementById("question-number");
const quizScoreLabel = document.getElementById("quiz-score-label");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");
const quizProgressFill = document.getElementById("quiz-progress-fill");


/* ------------------------------------------
   5. Quiz variables
------------------------------------------ */

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;
let quizFinished = false;


/* ------------------------------------------
   6. Display a question
------------------------------------------ */

function displayQuestion() {

    const current = quizQuestions[currentQuestion];

    questionNumber.textContent = currentQuestion + 1;

    quizQuestion.textContent = current.question;

    quizScoreLabel.textContent = "Score : " + score;

    quizFeedback.textContent = "";

    quizOptions.innerHTML = "";

    selectedAnswer = null;
    answered = false;

    quizNext.disabled = true;
    quizNext.textContent = "Valider ma réponse";

    quizProgressFill.style.width =
        (currentQuestion / quizQuestions.length * 100) + "%";


    current.options.forEach(function (option, index) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "quiz-option";
        button.textContent = option;

        button.addEventListener("click", function () {

            if (answered) {
                return;
            }

            selectedAnswer = index;

            const allOptions =
                quizOptions.querySelectorAll(".quiz-option");

            allOptions.forEach(function (item) {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            quizNext.disabled = false;

        });

        quizOptions.appendChild(button);

    });

}


/* ------------------------------------------
   7. Correct the selected answer
------------------------------------------ */

function correctAnswer() {

    if (selectedAnswer === null || answered) {
        return;
    }

    answered = true;

    const current = quizQuestions[currentQuestion];

    const allOptions =
        quizOptions.querySelectorAll(".quiz-option");

    allOptions.forEach(function (button, index) {

        button.disabled = true;

        if (index === current.answer) {
            button.classList.add("correct");
        }

        if (index === selectedAnswer &&
            selectedAnswer !== current.answer) {

            button.classList.add("incorrect");

        }

    });


    if (selectedAnswer === current.answer) {

        score++;

        quizFeedback.textContent =
            "Bonne réponse ! " + current.explanation;

    } else {

        quizFeedback.textContent =
            "Réponse incorrecte. " + current.explanation;

    }


    quizScoreLabel.textContent = "Score : " + score;

    quizProgressFill.style.width =
        ((currentQuestion + 1) / quizQuestions.length * 100) + "%";


    if (currentQuestion === quizQuestions.length - 1) {

        quizNext.textContent = "Voir mon résultat";

    } else {

        quizNext.textContent = "Question suivante";

    }

}


/* ------------------------------------------
   8. Display final result
------------------------------------------ */

function displayFinalResult() {

    quizFinished = true;

    quizQuestion.textContent = "Votre résultat final";

    quizOptions.innerHTML = "";

    questionNumber.textContent = quizQuestions.length;

    quizProgressFill.style.width = "100%";

    quizFeedback.textContent =
        "Vous avez obtenu " + score + " réponse(s) correcte(s) sur 5. " +
        getFinalMessage();

    quizNext.textContent = "Recommencer le quiz";

    quizNext.disabled = false;

}


function getFinalMessage() {

    if (score === 5) {
        return "Excellent ! Vous maîtrisez les principaux réflexes de cybersécurité.";
    }

    if (score >= 3) {
        return "Bon travail ! Continuez à approfondir vos connaissances.";
    }

    return "Continuez à apprendre : chaque bonne habitude compte pour votre sécurité.";
}


/* ------------------------------------------
   9. Next question and restart
------------------------------------------ */

if (quizNext && quizContainer) {

    quizNext.addEventListener("click", function () {

        if (quizFinished) {

            currentQuestion = 0;
            score = 0;
            selectedAnswer = null;
            answered = false;
            quizFinished = false;

            displayQuestion();

            return;

        }


        if (!answered) {

            correctAnswer();

            return;

        }


        if (currentQuestion < quizQuestions.length - 1) {

            currentQuestion++;

            displayQuestion();

        } else {

            displayFinalResult();

        }

    });

}


/* ------------------------------------------
   10. Start the quiz
------------------------------------------ */

if (quizContainer) {

    displayQuestion();

}

