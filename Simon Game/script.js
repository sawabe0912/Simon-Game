const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");
let yellow = document.getElementById("yellow");
let userClickedPattern = [];
let level = 0;
let started = false;


$(document).keypress(function(event){
	if(started === false){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode = "65"){
          document.querySelector("h1").innerText = "Level " + level;
          nextSequence();
          started = true;   
      }
    }
});



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
    




function nextSequence(){
	userClickedPattern = [];
	level++;
	let randomN = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomN];
	gamePattern.push(randomChosenColour);
    
    document.querySelector("h1").innerText = "Level " + level;

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

    playSound(randomChosenColour);
}



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
    	$("#" + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if(userClickedPattern.length === gamePattern.length){
      	setTimeout(function(){
    	  nextSequence()
       },1000)
     }
    	console.log("success!");
    }else{
    	console.log("wrong");
    	playSound("wrong");
    	document.querySelector("h1").innerText = "Game Over. Press Any Key to Restart.";
    	$("body").addClass("game-over");
    	setTimeout(function(){
          $("body").removeClass("game-over");
    	},200);
    	startOver();
    }
    
}

function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
}