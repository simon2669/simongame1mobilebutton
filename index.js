//SZÍNEK
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;

$(".btn").on("click", function () {
  if (gameStarted === true) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern);
  }
});

function nextSequence() {
  level++;

  $("#level-title").text("Level " + level);

  //random szám 0-3 / random szín kiválasztása
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber]; //hozzáadja a színt
  gamePattern.push(randomChosenColour);

  //flash effect
  $("#" + randomChosenColour)
    .fadeIn(150)
    .fadeOut(150)
    .fadeIn(150);

  //zene lejátszása
  playSound(randomChosenColour);
}
$("#mobile").on("click", function () {
  if (gameStarted === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});
$(document).keydown(function (a) {
  if (gameStarted === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var szam = currentLevel.length - 1;
  var megoldas = gamePattern[currentLevel.length - 1];
  if (userClickedPattern[szam] === megoldas) {
    console.log(szam);
    console.log(megoldas);
    console.log("jo");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout("nextSequence()", 1000);
      userClickedPattern = [];
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);

    $("h1").text("Game over, press any key to restart!");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
}
