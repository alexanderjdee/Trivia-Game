//OBJECTS
var question1 = {
    question: "What does the Japanese word 'Atari' mean?",
    answers: ["Fun", "Adventure", "Future", "Success"],
    correctAnswerId: 3,
    gif: "assets/images/atari.gif"
}

var question2 = {
    question: "What does Mario jump on at the end of a level?",
    answers: ["A Turtle Shell", "A Pipe", "A Flag Pole", "A Mushroom"],
    correctAnswerId: 2,
    gif: "assets/images/mario.gif"
}

var question3 = {
    question: "What is the highest grossing video game of all time?",
    answers: ["Super Smash Bros.", "World of Warcraft", "Halo", "Call of Duty"],
    correctAnswerId: 1,
    gif: "assets/images/wow.gif"
}

var question4 = {
    question: "What celestial body is approximately the same size as the world in MineCraft?",
    answers: ["Neptune", "Haley's Comet", "The Moon", "Pluto"],
    correctAnswerId: 0,
    gif: "assets/images/minecraft.gif"
}

//GLOBAL VARIABLES
var contentDiv = "<div id='content'></div>"
var startButtonDiv = "<div id='start-button'>Start</div>";
var timeRemainingDiv = $("<div>");
var currentQuestionDiv = $("<div>");
var announcementDiv = $("<div>");
var gifImg = $("<img>");
var answerCorrectionDiv = $("<div>");
var correctAnswersDiv = $("<div>");
var incorrectAnswersDiv = $("<div>");
var unansweredDiv = $("<div>");
var startOverDiv = $("<div>");

var questionCount = 0;
var questionList = [question1, question2, question3, question4];

var timeRemaining = 30;
var intervalId;
var timeOut;
var clockRunning = false;

var correctAnswerCount = 0;
var incorrectAnswerCount = 0;
var unansweredCount = 0;

//FUNCTIONS
function setQuestion(){
    $("#content").html("");
    $("#time-remaining").html("Time Remaining: " + timeRemaining + " Seconds");
    $(currentQuestionDiv).attr("id", "current-question");
    $(currentQuestionDiv).html(questionList[questionCount].question);
    $("#content").append(currentQuestionDiv);

    $.each(questionList[questionCount].answers, function(index){
        var answerDiv = $("<div>");
        $(answerDiv).addClass("answer");
        $(answerDiv).attr("data-id", index);
        $(answerDiv).html(this);
        $("#content").append(answerDiv);
    });

    if(!clockRunning){
        timeOut = setTimeout(checkAnswer, (timeRemaining+1)*1000);
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }
}

function count(){
    timeRemaining--;
    $("#time-remaining").html("Time Remaining: " + timeRemaining + " Seconds");
}

function stopCount(){
    clearInterval(intervalId);
    clearTimeout(timeOut);
    clockRunning = false;
}

function checkAnswer(userAnswer){
    stopCount();
    $("#content").html("");
    if(userAnswer === questionList[questionCount].correctAnswerId){
        correctAnswerCount++;
        $(announcementDiv).html("Correct!");
        $("#content").append(announcementDiv);
    }
    else if(timeRemaining <= 0){
        unansweredCount++;
        $(announcementDiv).html("Out of Time!");
        $("#content").append(announcementDiv);
        $(answerCorrectionDiv).html("The correct answer was: " + questionList[questionCount].answers[questionList[questionCount].correctAnswerId]);
        $("#content").append(answerCorrectionDiv);
    }
    else{
        incorrectAnswerCount++;
        $(announcementDiv).html("Nope!");
        $("#content").append(announcementDiv);
        $(answerCorrectionDiv).html("The correct answer was: " + questionList[questionCount].answers[questionList[questionCount].correctAnswerId]);
        $("#content").append(answerCorrectionDiv);
    }

    $(gifImg).attr("src", questionList[questionCount].gif);
    $("#content").append(gifImg);

    questionCount++;

    if(questionCount <= questionList.length - 1){
        timeRemaining = 30;
        setTimeout(setQuestion, 4500);
    }
    else{
        setTimeout(endGame, 4500);
    }
}

function endGame(){
    $("#content").html("");
    $(startOverDiv).attr("id", "start-over");
    $(startOverDiv).html("Start Over?");

    $(announcementDiv).html("All done, here's how you did!");
    $("#content").append(announcementDiv);

    $(correctAnswersDiv).html("Correct Answers: " + correctAnswerCount);
    $(incorrectAnswersDiv).html("Incorrect Answers: " + incorrectAnswerCount);
    $(unansweredDiv).html("Unanswered: " + unansweredCount);
    $("#content").append(correctAnswersDiv);
    $("#content").append(incorrectAnswersDiv);
    $("#content").append(unansweredDiv);
    $("#content").append(startOverDiv);
}

function resetGame(){
    $("#content-container").html("");
    questionCount = 0;
    timeRemaining = 30;
    correctAnswerCount = 0;
    incorrectAnswerCount = 0;
    unansweredCount = 0;
    $("#content-container").html(startButtonDiv);
}

//LOGIC
$(document).ready(function(){
    $("#content-container").html(startButtonDiv);

    $("#content-container").on("click", "#start-button", function(){
        $("#content-container").html("");
        $(timeRemainingDiv).attr("id", "time-remaining");
        $(timeRemainingDiv).html("Time Remaining: " + timeRemaining + " Seconds");
        $("#content-container").append(timeRemainingDiv);
        $("#content-container").append(contentDiv);
        setQuestion();
    });

    $("#content-container").on("click", ".answer", function(){
        checkAnswer(eval($(this).attr("data-id")));
    });

    $("#content-container").on("click", "#start-over", function(){
        resetGame();
    });
    
    $("#content").change(function(){
        console.log("Test");
    });
});