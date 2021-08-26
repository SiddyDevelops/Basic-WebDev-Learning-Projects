
var gamePattern = [];
var userClickPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var gameStarted = false;     
var level = 0;

$(document).keypress(function(){
    if(!gameStarted)
    {        
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);

    playsound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickPattern.length-1);
});

function nextSequence()
{
    userClickPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColor);

}

function playsound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(userClickPattern[currentLevel] === gamePattern[currentLevel])
    {   
        console.log("Success");
        if (userClickPattern.length === gamePattern.length)
        {
            console.log("lol");
            setTimeout(function ()
            {
                nextSequence();
            }, 1000); 
        }
    }
    else
    {
        console.log("Fail");
        playsound("wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();

    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    gameStarted = false;
}


