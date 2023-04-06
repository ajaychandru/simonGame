var gamePattern=new Array();
var buttonColours=new Array("red" ,"blue","green","yellow" );
var userClickedPattern=new Array();
var level=0;


$(".btn").on("click",function(){
    var userChosenColor=this.id;

    $("#"+userChosenColor).addClass("pressed"); // adding pressed animation
    setTimeout(function(){
        $("#"+userChosenColor).removeClass("pressed"); // removing pressed animation
    }, 100);

    
    userClickedPattern.push(userChosenColor); // collecting userclicked pattern
    console.log(userClickedPattern.length-1);

    if(userClickedPattern.length===gamePattern.length){// checking whether user as clicked all required pattern
        checkAnswer();
    }
    

    playSound(userChosenColor);
    });

$(document).on("keypress",function(event){
    level=0;
    $("body").removeClass("game-over");
    if(event.key==='a'){
        nextSequence();
    }
});


function playSound(name){//play sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function nextSequence(){
    level++;
    $("h1").text("Level "+level);

    var randomNumber=Math.floor((Math.random())*4);// generating random number
  
    var randomChosenColour=buttonColours[randomNumber];//getting color from array which matchess random number index

    gamePattern.push(randomChosenColour);// adding color in new array

    $("#"+randomChosenColour).fadeOut(100).fadeIn(200);//animating choosen colour

   playSound(randomChosenColour);
}


function checkAnswer(currentLevel){
    if(userClickedPattern.toString()===gamePattern.toString()){
        userClickedPattern=[];
       setTimeout(function(){
        nextSequence();
       },1000);
    }else{
       setTimeout(function(){
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
       $("body").addClass("game-over");
       $("h1").text("Game Over, Press Any Key to Restart");
       },1000);

      
    }
}

