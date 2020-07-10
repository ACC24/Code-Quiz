// Defining global variables //

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        answer: "3. parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store:",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    }
];

var timeEl = document.querySelector(".time");

var homePageEl = document.querySelector(".homePage");
var scorePageEl = document.querySelector(".scorePage");
var highscorePageEl = document.querySelector(".highscorePage");

var initialInput = document.querySelector("#initials");

var scoreList = document.querySelector("#scoreList");
var finalScoreEl = document.querySelector(".finalScore");

var submitBttn = document.querySelector("#submit");
var refreshBttn = document.querySelector("#goBack");
var clearBttn = document.querySelector("#clear");
var startBttn = document.getElementById("start");

var questionsEl = document.querySelector(".questions-rendered");

var returnFeedback = document.querySelector("#returnFeedback");

var questionIndex = 0;

var secondsLeft = 90;

var timerInterval;

var userInitials = [];

        // Start code //

scorePageEl.style.display='none';
highscorePageEl.style.display='none';

        // Start button //

startBttn.addEventListener('click', function() {
    setTime();
    startBttn.style.display = 'none';
    homePageEl.style.display='none';
    displayQuestions(questionIndex);
})

        // Timer/Score //

function setTime(){
    timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
        if(secondsLeft === 0){
            clearInterval(timerInterval);
            scorePageEl.style.display='block';
            timeEl.style.display='none';
            document.querySelector('.questions-rendered').style.display='none';
            finalScoreEl.textContent = "Your final score is " + secondsLeft;
        }
    }, 1000);
}

        // Display Questions//

function displayQuestions(){
    
    questionsEl.textContent = "";
    var question = questions[questionIndex];
    var questionDiv = document.createElement("div");
    var questionText = document.createElement("h2");
    questionText.textContent = question.title;
    questionDiv.appendChild(questionText)
    
    for (var i=0; i < question.choices.length ;i++) {
        var option = document.createElement("button");
        option.textContent = question.choices[i];
        option.setAttribute("class", "option");
        option.addEventListener("click", function(e) {
            var optionClicked = (e.target.innerHTML);
            
            if(optionClicked === questions[questionIndex].answer){
                popUp("Right Answer!");
                displayQuestions(questionIndex++);
            }
            else{
                popUp("Wrong Answer!");
                displayQuestions(questionIndex++);
                secondsLeft -= 10;
            }
            
        });
        if (questionIndex == questions.length - 1) {
            clearInterval(timerInterval);
            scorePageEl.style.display='block';
            popUp(" ");
            timeEl.style.display="none"
            finalScoreEl.textContent = "Your final score is " + secondsLeft;
            return;
        }
        questionDiv.appendChild(option);
    }
    questionsEl.appendChild(questionDiv);
}

function popUp(message){
returnFeedback.innerHTML = message;
returnFeedback.style.borderTop = "1px solid grey";
}

        // Submit scores button //

submitBttn.addEventListener("click", function(){
    event.preventDefault();
    renderScores();
    init();
});

        // Rendering scores //

function renderScores(){
    scoreList.innerHTML = "";
    
    for (var x = 0; x < userInitials.length; x ++){
        var letters = userInitials[x];
        
        var li = document.createElement("li");
        li.textContent = letters;
        li.setAttribute("data-index", x);
        scoreList.appendChild(li);
    }
} 

        // Storing scores//

function storeScore(){
    localStorage.setItem("userInitials", JSON.stringify(userInitials));
}

    scoreList.addEventListener("click", function(event){
    var element = event.target;
    
    if (element.matches("button")=== true){
        var index = element.parentElement.getAttribute("data-index");
        userInitials.splice(index, 1);
    }
});

        // Displaying scores on highscores page //

function init() {
    var storedScores = JSON.parse(localStorage.getItem("userInitials"));
    
    if(storedScores !==null) {
        userInitials = storedScores;
    }
    
    var initialText = initialInput.value.trim();
        
        if (initialText === ""){
            return;
        }
        userInitials.push(initialText + " " + "- " + secondsLeft);
        console.log(userInitials);
        initialInput.value = "";
        
        scorePageEl.style.display='none';
        highscorePageEl.style.display='block';
        
        storeScore();
        renderScores();
}

        // Refresh button //

refreshBttn.addEventListener("click", function(){
    location.reload();
});

        // Clear highscores button //

clearBttn.addEventListener("click", function(){
    localStorage.clear();
    scoreList.textContent = "";
  
});
