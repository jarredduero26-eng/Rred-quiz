/* =====================================================
   JARRED FRIEND QUIZ
===================================================== */


/* =====================================================
   PERSONAL INFORMATION
===================================================== */

const quizQuestions = [

    {
        question: "What is Jarred's full name?",
        correct: "Jarred D. Duero",
        wrong: [
            "Jarred D. Dalonhao",
            "Jarred Duero Reyes",
            "Jarred Daniel Duero"
        ]
    },

    {
        question: "What is Jarred's favorite color?",
        correct: "Red",
        wrong: [
            "Blue",
            "Green",
            "Black"
        ]
    },

    {
        question: "What food does Jarred like?",
        correct: "Fried chicken",
        wrong: [
            "Pizza",
            "Spaghetti",
            "Fish"
        ]
    },

    {
        question: "What is Jarred's favorite sport?",
        correct: "Basketball",
        wrong: [
            "Volleyball",
            "Football",
            "Badminton"
        ]
    },

    {
        question: "Where can you usually find Jarred?",
        correct: "Basketball court",
        wrong: [
            "Swimming pool",
            "Library",
            "Computer laboratory"
        ]
    },

    {
        question: "What is Jarred's favorite mobile game?",
        correct: "ML",
        wrong: [
            "Free Fire",
            "Roblox",
            "Clash of Clans"
        ]
    },

    {
        question: "When is Jarred's birthday?",
        correct: "March 26, 2008",
        wrong: [
            "March 28, 2008",
            "February 26, 2008",
            "April 26, 2008"
        ]
    },

    {
        question: "What is Jarred's middle name?",
        correct: "Dalonhao",
        wrong: [
            "Duero",
            "Dela Cruz",
            "Daniel"
        ]
    },

    {
        question: "What hairstyle did Jarred like before?",
        correct: "Mullet haircut",
        wrong: [
            "Buzz cut",
            "Two-block haircut",
            "Crew cut"
        ]
    },

    {
        question: "What is Jarred's favorite snack?",
        correct: "Burger",
        wrong: [
            "Donut",
            "Chips",
            "Ice cream"
        ]
    },

    {
        question: "What is Jarred's dream job?",
        correct: "Police officer",
        wrong: [
            "Doctor",
            "Engineer",
            "Pilot"
        ]
    },

    {
        question: "How many exes does Jarred have?",
        correct: "1",
        wrong: [
            "0",
            "2",
            "3"
        ]
    }

];


/* =====================================================
   PAGE DATA
===================================================== */

const pageData = {

    namePage: {
        number: "01",
        name: "WELCOME",
        progress: 12
    },

    rulesPage: {
        number: "02",
        name: "RULES",
        progress: 24
    },

    quizPage: {
        number: "03",
        name: "QUIZ",
        progress: 38
    },

    failedPage: {
        number: "04",
        name: "RESULT",
        progress: 50
    },

    perfectPage: {
        number: "05",
        name: "PERFECT",
        progress: 65
    },

    friendshipPage: {
        number: "06",
        name: "FRIENDSHIP",
        progress: 78
    },

    flowerPage: {
        number: "07",
        name: "FLOWER",
        progress: 90
    },

    thankYouPage: {
        number: "08",
        name: "THANK YOU",
        progress: 100
    }

};


/* =====================================================
   VARIABLES
===================================================== */

let currentQuestion = 0;
let score = 0;
let playerName = "";

const totalQuestions =
    quizQuestions.length;


/* =====================================================
   ELEMENTS
===================================================== */

const pages =
    document.querySelectorAll(".quiz-page");

const pageNumber =
    document.getElementById("pageNumber");

const pageName =
    document.getElementById("pageName");

const indicatorProgress =
    document.getElementById("indicatorProgress");

const clickLight =
    document.getElementById("clickLight");

const statusText =
    document.getElementById("statusText");


/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(id) {

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    const target =
        document.getElementById(id);

    if (!target) return;

    target.classList.add("active-page");

    updatePageIndicator(id);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateDots(id);

}


/* =====================================================
   PAGE INDICATOR
===================================================== */

function updatePageIndicator(id) {

    const data = pageData[id];

    if (!data) return;

    pageNumber.textContent =
        data.number;

    pageName.textContent =
        data.name;

    indicatorProgress.style.width =
        data.progress + "%";

}


/* =====================================================
   PAGE DOTS
===================================================== */

function updateDots(id) {

    document
        .querySelectorAll(".dot")
        .forEach(dot => {

            dot.classList.remove("active-dot");

            if (
                dot.dataset.page === id
            ) {

                dot.classList.add(
                    "active-dot"
                );

            }

        });

}


/* =====================================================
   NAME PAGE
===================================================== */

const startButton =
    document.getElementById("startButton");

startButton.addEventListener(
    "click",
    function () {

        const first =
            document
                .getElementById("firstName")
                .value
                .trim();

        const last =
            document
                .getElementById("lastName")
                .value
                .trim();

        const error =
            document.getElementById("nameError");

        if (!first || !last) {

            error.textContent =
                "Please enter your first and last name.";

            createLightAtButton(this);

            return;
        }

        playerName =
            `${first} ${last}`;

        error.textContent = "";

        createLightAtButton(this);

        setTimeout(() => {

            showPage("rulesPage");

        }, 350);

    }
);


/* =====================================================
   NEXT BUTTONS
===================================================== */

document
    .querySelectorAll("[data-next]")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const next =
                    this.dataset.next;

                createLightAtButton(this);

                setTimeout(() => {

                    showPage(next);

                    if (
                        next === "quizPage"
                    ) {

                        startQuiz();

                    }

                }, 250);

            }
        );

    });


/* =====================================================
   START QUIZ
===================================================== */

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    document
        .getElementById("scoreDisplay")
        .textContent = score;

    loadQuestion();

}


/* =====================================================
   RANDOMIZE ARRAY
===================================================== */

function shuffle(array) {

    const copy =
        [...array];

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            copy[i],
            copy[j]
        ] =
        [
            copy[j],
            copy[i]
        ];

    }

    return copy;
}


/* =====================================================
   LOAD QUESTION
===================================================== */

function loadQuestion() {

    const question =
        quizQuestions[currentQuestion];

    const questionText =
        document.getElementById(
            "questionText"
        );

    const questionNumber =
        document.getElementById(
            "questionNumber"
        );

    const choicesContainer =
        document.getElementById(
            "choicesContainer"
        );

    const progress =
        document.getElementById(
            "questionProgress"
        );

    questionText.textContent =
        question.question;

    questionNumber.textContent =
        `QUESTION ${String(
            currentQuestion + 1
        ).padStart(2, "0")}`;

    progress.style.width =
        `${(
            currentQuestion /
            totalQuestions
        ) * 100}%`;

    choicesContainer.innerHTML = "";

    const choices =
        shuffle([
            {
                text: question.correct,
                correct: true
            },

            ...question.wrong.map(
                answer => ({
                    text: answer,
                    correct: false
                })
            )
        ]);

    const letters =
        ["A", "B", "C", "D"];

    choices.forEach(
        (choice, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "choice-button";

            button.innerHTML = `
                <span class="choice-letter">
                    ${letters[index]}
                </span>

                <span>
                    ${choice.text}
                </span>
            `;

            button.addEventListener(
                "click",
                function () {

                    createLightAtButton(this);

                    handleAnswer(
                        choice.correct
                    );

                }
            );

            choicesContainer.appendChild(
                button
            );

        }
    );

}


/* =====================================================
   HANDLE ANSWER
===================================================== */

function handleAnswer(correct) {

    if (!correct) {

        saveScore(false);

        setTimeout(() => {

            showFailedPage();

        }, 350);

        return;
    }


    score++;

    document
        .getElementById(
            "scoreDisplay"
        )
        .textContent = score;


    currentQuestion++;


    if (
        currentQuestion >=
        totalQuestions
    ) {

        saveScore(true);

        setTimeout(() => {

            showPage("perfectPage");

        }, 450);

        return;
    }


    setTimeout(() => {

        loadQuestion();

    }, 300);

}


/* =====================================================
   FAILED PAGE
===================================================== */

function showFailedPage() {

    const failedScore =
        document.getElementById(
            "failedScore"
        );

    const failedJudgement =
        document.getElementById(
            "failedJudgement"
        );

    failedScore.textContent =
        `${score} / ${totalQuestions}`;

    if (score === 0) {

        failedJudgement.textContent =
            "QUIZ NOT PASSED — 0 CORRECT";

    } else {

        failedJudgement.textContent =
            `QUIZ NOT PASSED — ${score} CORRECT`;

    }

    statusText.textContent =
        "QUIZ TERMINATED";

    showPage("failedPage");

}


/* =====================================================
   RETRY
===================================================== */

document
    .getElementById("retryButton")
    .addEventListener(
        "click",
        function () {

            createLightAtButton(this);

            setTimeout(() => {

                showPage("rulesPage");

            }, 300);

        }
    );


/* =====================================================
   FRIENDSHIP ANSWER
===================================================== */

document
    .getElementById("yesFriend")
    .addEventListener(
        "click",
        function () {

            createLightAtButton(this);

            setTimeout(() => {

                showPage("flowerPage");

            }, 400);

        }
    );


document
    .getElementById("noFriend")
    .addEventListener(
        "click",
        function () {

            createLightAtButton(this);

            setTimeout(() => {

                showPage("thankYouPage");

            }, 400);

        }
    );


/* =====================================================
   FLOWER FINISH
===================================================== */

document
    .getElementById("flowerFinish")
    .addEventListener(
        "click",
        function () {

            createLightAtButton(this);

            setTimeout(() => {

                showPage("thankYouPage");

            }, 350);

        }
    );


/* =====================================================
   EXIT
===================================================== */

document
    .getElementById("exitButton")
    .addEventListener(
        "click",
        function () {

            createLightAtButton(this);

            statusText.textContent =
                "SESSION COMPLETE";

            alert(
                `Thank you, ${playerName || "friend"}!`
            );

        }
    );


/* =====================================================
   SCORE RECORDING
===================================================== */

function saveScore(passed) {

    const records =
        JSON.parse(
            localStorage.getItem(
                "jarredQuizRecords"
            )
        ) || [];

    const record = {

        name:
            playerName || "Unknown",

        score,

        total:
            totalQuestions,

        passed,

        result:
            passed
                ? "PASSED"
                : "NOT PASSED",

        date:
            new Date()
                .toLocaleString()

    };

    records.unshift(record);

    /*
       Keep the latest 20 records.
    */

    records.splice(20);

    localStorage.setItem(
        "jarredQuizRecords",
        JSON.stringify(records)
    );

}


/* =====================================================
   SCORE HISTORY
===================================================== */

function showHistory() {

    const list =
        document.getElementById(
            "historyList"
        );

    const records =
        JSON.parse(
            localStorage.getItem(
                "jarredQuizRecords"
            )
        ) || [];

    list.innerHTML = "";

    if (!records.length) {

        list.innerHTML = `
            <p>
                No quiz records yet.
            </p>
        `;

        return;
    }

    records.forEach(record => {

        const item =
            document.createElement(
                "div"
            );

        item.className =
            "history-entry";

        item.innerHTML = `

            <div>
                <div class="history-name">
                    ${escapeHTML(record.name)}
                </div>

                <div class="history-status">
                    ${record.date}
                </div>
            </div>

            <div class="history-score">
                ${record.score}/${record.total}
            </div>

            <div class="history-status">
                ${record.result}
            </div>

        `;

        list.appendChild(item);

    });

}


/* =====================================================
   CLEAR HISTORY
===================================================== */

document
    .getElementById("clearHistory")
    .addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "jarredQuizRecords"
            );

            showHistory();

            createLightAtButton(this);

        }
    );


/* =====================================================
   BASIC HTML ESCAPE
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   CLICK LIGHT EFFECT
===================================================== */

function createLightAtButton(element) {

    const rect =
        element.getBoundingClientRect();

    const x =
        rect.left +
        rect.width / 2;

    const y =
        rect.top +
        rect.height / 2;

    createLight(x, y);

}


function createLight(x, y) {

    clickLight.style.left =
        `${x}px`;

    clickLight.style.top =
        `${y}px`;

    clickLight.classList.remove(
        "active"
    );

    /*
       Force animation restart.
    */

    void clickLight.offsetWidth;

    clickLight.classList.add(
        "active"
    );

}


/* =====================================================
   CLICK ANYWHERE LIGHT
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.closest(
                "button"
            ) ||
            event.target.closest(
                "input"
            )
        ) {

            return;
        }

        createLight(
            event.clientX,
            event.clientY
        );

    }
);


/* =====================================================
   DOTS
===================================================== */

document
    .querySelectorAll(".dot")
    .forEach(dot => {

        dot.addEventListener(
            "click",
            function () {

                /*
                   Dots are visual indicators.
                   They do not bypass the quiz.
                */

                createLightAtButton(this);

            }
        );

    });


/* =====================================================
   KEYBOARD MOTION
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            document.activeElement.tagName !== "INPUT"
        ) {

            const activePage =
                document.querySelector(
                    ".active-page"
                );

            const button =
                activePage?.querySelector(
                    ".main-button"
                );

            if (button) {

                button.click();

            }

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

updatePageIndicator(
    "namePage"
);

showHistory();