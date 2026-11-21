document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       COPIER LES PROMPTS
    ===================================== */

    const copyButtons = document.querySelectorAll(".copy-prompt");
    const copyStatus = document.getElementById("copy-status");

    copyButtons.forEach(function (button) {

        button.addEventListener("click", async function () {

            const promptId = button.dataset.copy;
            const promptElement = document.getElementById(promptId);

            if (!promptElement) return;

            const promptText = promptElement.innerText.trim();

            try {
                await navigator.clipboard.writeText(promptText);

                copyStatus.textContent = "♡ Prompt copié avec succès !";
                button.textContent = "Copié ✓";

                setTimeout(function () {
                    button.textContent = "Copier";
                }, 1800);

            } catch (error) {

                copyStatus.textContent =
                    "La copie automatique n'est pas disponible dans ce navigateur. Sélectionnez le texte manuellement.";

            }

        });

    });


    /* =====================================
       QUIZ PROMPT ENGINEERING
    ===================================== */

    const questions = [

        {
            question: "Quel est le rôle du contexte dans un prompt ?",

            options: [
                "Donner des informations utiles sur la situation",
                "Rendre le prompt plus long sans raison",
                "Remplacer la tâche demandée",
                "Empêcher l'IA de répondre"
            ],

            answer: 0,

            explanation:
                "Le contexte aide l'IA à comprendre la situation et à adapter sa réponse."
        },

        {
            question: "Quel prompt est généralement le plus efficace ?",

            options: [
                "Explique-moi tout.",
                "Fais mon travail.",
                "Explique les boucles en C avec un exemple simple adapté à un débutant.",
                "Réponds rapidement."
            ],

            answer: 2,

            explanation:
                "Une demande précise indique le sujet, le niveau et le type de réponse attendu."
        },

        {
            question: "Pourquoi faut-il vérifier les réponses de l'IA ?",

            options: [
                "Parce que l'IA ne peut jamais répondre",
                "Parce qu'une réponse peut contenir des erreurs",
                "Pour rendre le prompt plus compliqué",
                "Parce que toutes les réponses sont identiques"
            ],

            answer: 1,

            explanation:
                "Les outils d'IA peuvent produire des informations incorrectes ou incomplètes. La vérification reste nécessaire."
        },

        {
            question: "Que signifie améliorer progressivement un prompt ?",

            options: [
                "Répéter exactement la même demande",
                "Supprimer toutes les informations",
                "Changer d'outil à chaque question",
                "Préciser la demande selon les limites observées"
            ],

            answer: 3,

            explanation:
                "L'amélioration progressive consiste à ajuster les instructions pour obtenir un résultat plus adapté."
        }

    ];


    const questionNumber = document.getElementById("prompt-question-number");
    const questionTitle = document.getElementById("prompt-question");
    const optionsContainer = document.getElementById("prompt-options");
    const feedback = document.getElementById("prompt-feedback");
    const nextButton = document.getElementById("prompt-next");
    const scoreLabel = document.getElementById("prompt-score-label");
    const progressFill = document.getElementById("prompt-progress-fill");

    if (
        !questionNumber ||
        !questionTitle ||
        !optionsContainer ||
        !feedback ||
        !nextButton ||
        !scoreLabel ||
        !progressFill
    ) {
        return;
    }

    let currentQuestion = 0;
    let score = 0;
    let answered = false;


    function displayQuestion() {

        const q = questions[currentQuestion];

        answered = false;

        questionNumber.textContent = currentQuestion + 1;
        questionTitle.textContent = q.question;

        optionsContainer.innerHTML = "";
        feedback.textContent = "";
        feedback.className = "quiz-feedback";

        nextButton.disabled = true;
        nextButton.textContent = "Valider ma réponse";

        progressFill.style.width =
            ((currentQuestion + 1) / questions.length * 100) + "%";

        q.options.forEach(function (option, index) {

            const label = document.createElement("label");
            label.className = "quiz-option";

            const input = document.createElement("input");
            input.type = "radio";
            input.name = "prompt-answer";
            input.value = index;

            input.addEventListener("change", function () {
                if (!answered) {
                    nextButton.disabled = false;
                }
            });

            const span = document.createElement("span");
            span.textContent = option;

            label.appendChild(input);
            label.appendChild(span);

            optionsContainer.appendChild(label);

        });

    }


    function validateAnswer() {

        const selected = document.querySelector(
            'input[name="prompt-answer"]:checked'
        );

        if (!selected || answered) return;

        answered = true;

        const selectedAnswer = Number(selected.value);
        const correctAnswer = questions[currentQuestion].answer;

        const allOptions = optionsContainer.querySelectorAll("input");

        allOptions.forEach(function (input) {
            input.disabled = true;
        });

        if (selectedAnswer === correctAnswer) {

            score++;

            feedback.textContent =
                "Bonne réponse ! " + questions[currentQuestion].explanation;

            feedback.classList.add("correct");

        } else {

            feedback.textContent =
                "Pas tout à fait. " +
                questions[currentQuestion].explanation;

            feedback.classList.add("incorrect");

        }

        scoreLabel.textContent = "Score : " + score;

        nextButton.disabled = false;

        if (currentQuestion === questions.length - 1) {
            nextButton.textContent = "Voir mon résultat";
        } else {
            nextButton.textContent = "Question suivante";
        }

    }


    function showFinalResult() {

        questionTitle.textContent =
            "Votre résultat : " + score + " / " + questions.length;

        optionsContainer.innerHTML = "";

        questionNumber.textContent = questions.length;

        progressFill.style.width = "100%";

        if (score === 4) {

            feedback.textContent =
                "Excellent ! Vous maîtrisez les notions essentielles.";

        } else if (score >= 2) {

            feedback.textContent =
                "Bon travail ! Continuez à pratiquer pour progresser.";

        } else {

            feedback.textContent =
                "Continuez à apprendre. Relisez les notions et réessayez.";

        }

        feedback.className = "quiz-feedback correct";

        nextButton.disabled = false;
        nextButton.textContent = "Recommencer le quiz";

        scoreLabel.textContent = "Score final : " + score + " / 4";

    }


    nextButton.addEventListener("click", function () {

        if (!answered) {

            validateAnswer();
            return;

        }

        if (currentQuestion < questions.length - 1) {

            currentQuestion++;
            displayQuestion();

        } else if (nextButton.textContent === "Voir mon résultat") {

            showFinalResult();

        } else {

            currentQuestion = 0;
            score = 0;

            scoreLabel.textContent = "Score : 0";

            displayQuestion();

        }

    });


    displayQuestion();

});
