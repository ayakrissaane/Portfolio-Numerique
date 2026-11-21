document.addEventListener("DOMContentLoaded", function () {
    // Menu mobile : ouvrir et fermer la navigation
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            const isOpen = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.textContent = isOpen ? "✕" : "☰";
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.textContent = "☰";
            });
        });
    }

    // Mode clair / mode nuit
    const themeButton = document.querySelector(".theme-toggle");
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    if (themeButton) {
        themeButton.addEventListener("click", function () {
            document.body.classList.toggle("dark");
            const isDark = document.body.classList.contains("dark");
            localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
            themeButton.setAttribute(
                "aria-label",
                isDark ? "Activer le mode clair" : "Activer le mode nuit"
            );
        });
    }

    // Année automatique dans le footer
    document.querySelectorAll("[data-year]").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });
});
// Checklist d'auto-évaluation
const safetyChecks = [...document.querySelectorAll(".safety-check")];
const checkScore = document.getElementById("check-score");
const checkMessage = document.getElementById("check-message");

function updateChecklist() {
    const score = safetyChecks.filter(item => item.checked).length;
    checkScore.textContent = score;
    if (score === 0) checkMessage.textContent = "Commencez par adopter un premier réflexe de sécurité.";
    else if (score <= 2) checkMessage.textContent = "Vous avez commencé. Choisissez deux habitudes à améliorer cette semaine.";
    else if (score <= 4) checkMessage.textContent = "Bon début ! Renforcez les habitudes qui vous manquent encore.";
    else checkMessage.textContent = "Très bons réflexes ! Continuez à les appliquer et à les vérifier régulièrement.";
}
safetyChecks.forEach(item => item.addEventListener("change", updateChecklist));
document.getElementById("reset-checklist").addEventListener("click", () => {
    safetyChecks.forEach(item => item.checked = false);
    updateChecklist();
});

// Quiz à choix multiples avec explications
const questions = [
    {
        question: "Quel est le meilleur réflexe pour sécuriser ses comptes ?",
        options: ["Utiliser le même mot de passe partout", "Choisir un mot de passe long et unique", "Écrire son mot de passe dans un message public", "Utiliser uniquement son prénom"],
        answer: 1,
        explanation: "Un mot de passe long et unique limite les conséquences si un autre compte est compromis."
    },
    {
        question: "Vous recevez un message urgent qui demande votre mot de passe. Que faire ?",
        options: ["Répondre rapidement", "Cliquer sur le premier lien", "Ne pas communiquer le mot de passe et vérifier par un canal officiel", "Transférer le message à tous vos contacts"],
        answer: 2,
        explanation: "Un service légitime ne doit pas vous demander votre mot de passe par message. Vérifiez l'information depuis son site ou son application officielle."
    },
    {
        question: "Quel est le rôle de l'authentification à deux facteurs ?",
        options: ["Ajouter une deuxième vérification à la connexion", "Remplacer toutes les mises à jour", "Rendre public le compte", "Supprimer les sauvegardes"],
        answer: 0,
        explanation: "Elle ajoute une preuve supplémentaire après le mot de passe, ce qui renforce la protection du compte."
    },
    {
        question: "Que fait généralement un rançongiciel (ransomware) ?",
        options: ["Accélère l'ordinateur", "Chiffre ou bloque des fichiers et réclame une rançon", "Nettoie les fichiers inutiles", "Améliore la connexion Wi-Fi"],
        answer: 1,
        explanation: "Un rançongiciel bloque l'accès à des données, souvent en les chiffrant, puis demande une rançon."
    },
    {
        question: "Pourquoi faut-il effectuer des sauvegardes régulières ?",
        options: ["Pour partager ses mots de passe", "Pour éviter toutes les mises à jour", "Pour pouvoir récupérer ses fichiers en cas de perte ou d'incident", "Pour rendre les fichiers publics"],
        answer: 2,
        explanation: "Une sauvegarde permet de restaurer des fichiers après une panne, une suppression accidentelle ou certaines cyberattaques."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;
let quizFinished = false;

const questionTitle = document.getElementById("quiz-question");
const optionsContainer = document.getElementById("quiz-options");
const feedback = document.getElementById("quiz-feedback");
const nextButton = document.getElementById("quiz-next");
const numberLabel = document.getElementById("question-number");
const scoreLabel = document.getElementById("quiz-score-label");
const progressFill = document.getElementById("quiz-progress-fill");

function renderQuestion() {
    const q = questions[currentQuestion];
    selectedAnswer = null;
    answered = false;
    numberLabel.textContent = currentQuestion + 1;
    scoreLabel.textContent = `Score : ${score}`;
    progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
    questionTitle.textContent = q.question;
    feedback.textContent = "";
    feedback.className = "quiz-feedback";
    nextButton.disabled = true;
    nextButton.textContent = "Valider ma réponse";
    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "quiz-option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "quiz-answer";
        input.value = index;
        input.addEventListener("change", () => {
            selectedAnswer = index;
            nextButton.disabled = false;
        });
        const span = document.createElement("span");
        span.textContent = option;
        label.append(input, span);
        optionsContainer.appendChild(label);
    });
}

nextButton.addEventListener("click", () => {
    if (quizFinished) {
        restartQuiz();
        return;
    }
    if (!answered) {
        if (selectedAnswer === null) return;
        answered = true;
        const q = questions[currentQuestion];
        const isCorrect = selectedAnswer === q.answer;
        if (isCorrect) score++;
        [...optionsContainer.querySelectorAll("input")].forEach(input => input.disabled = true);
        feedback.textContent = `${isCorrect ? "Bonne réponse ! " : "Pas tout à fait. "}${q.explanation}`;
        feedback.className = `quiz-feedback ${isCorrect ? "correct" : "incorrect"}`;
        scoreLabel.textContent = `Score : ${score}`;
        nextButton.textContent = currentQuestion === questions.length - 1 ? "Voir mon résultat" : "Question suivante";
        progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showFinalResult();
    }
});

function showFinalResult() {
    questionTitle.textContent = "Quiz terminé !";
    optionsContainer.innerHTML = "";
    const percent = Math.round((score / questions.length) * 100);
    let message = "Relisez les conseils et réessayez : chaque question est une occasion d'apprendre.";
    if (score === 5) message = "Excellent ! Vous maîtrisez les principaux réflexes abordés dans ce quiz.";
    else if (score >= 3) message = "Bon travail ! Quelques notions méritent encore d'être révisées.";
    feedback.textContent = `Votre résultat : ${score} / ${questions.length} (${percent} %). ${message}`;
    feedback.className = "quiz-feedback correct";
    nextButton.textContent = "Recommencer le quiz";
    nextButton.disabled = false;
    quizFinished = true;
    progressFill.style.width = "100%";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    quizFinished = false;
    renderQuestion();
}
