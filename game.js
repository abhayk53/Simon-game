var gamePattern = []
var userClickedPattern= []
var buttoncolour = ["red","blue","green","yellow"]
var started = false;
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomnumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttoncolour[randomnumber];
    gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);
}

$(".btn").click(function(){
    var userchosencolor = $(this).attr("id");
    userClickedPattern.push(userchosencolor);
    playsound(userchosencolor);
    animatepress(userchosencolor);
    checkanswer(userClickedPattern.length-1)
});

function playsound(name){
      var audio = new Audio("sounds/"+name+".mp3")
    audio.play()
    
}

function animatepress(currentcolor){
    $("#"+ currentcolor).addClass("pressed");

     setTimeout(function () {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}
$(document).keypress(function(event){
    if(!started && event.key==="a"){
        $("#level-title").text("Level "+ level)
        nextSequence();
        started = true;
    }
});

function checkanswer(currentlevel){

    if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
        console.log("Success")
        
    if (userClickedPattern.length === gamePattern.length){

        
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }
    else{
        playsound("wrong")
      $("body").addClass("game-over")  ;

      setTimeout(function(){
        $("body").removeClass("game-over")},200)

      $("#level-title").text("Game Over, Press A Key to Restart");  
       startover();

    
    }
}

function startover(){
    level = 0;
    gamePattern = [];
    started = false;



}