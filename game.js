//Step 2: buttonColours array stores the different colors of the buttons that we will choose from randomly 
var buttonColours=["red","blue","green","yellow"];
//Step 2: gamepattern array intially empty to store the randomized colors and keep track of it in order
var gamePattern=[];
//Step 4: Creating an empty array to store the clicke buttons by the user
var userClickedPattern=[];

var level=0;
var toggle=true;

//This is to listen to the keypresses only once in the begining of the game(once: that is why we used toggle to turn it to false once a button is click to start the game and no more presses are listened to)
$(document).on("keydown",function()
{
    if(toggle)
    {
        nextSequence();                                     //Step 7
        $("h1").text("Level "+level);
        toggle=false;
        clicks=true;
    }
});


// Step 4:Detects the buttons getting clicked and storing their id in userChosenColor // adding the ids of the clicked buttons in order in an array 
// intially empty to keep track of the clicke buttons // Once a Button is clicke its sound will play.

$("div[type=button]").click(function(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern); (This comment was used to show the created array in console after clicking multiple buttons)
    // Step 5: Play sound : Plays the sound according to the name of the color of the button that has been clicked
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);       //Step 8
});


//Step 2
function nextSequence(){
    userClickedPattern=[];
    level++;                                        //Step 7
    $("#level-title").text("Level "+level);
    // Step 2: Randomize a number and using thsi number as an index to choose a random color from buttonColors array
    var randomNumber=Math.floor(Math.random()*4); //0-3
    var randomChosenColour=buttonColours[randomNumber];
    //Step 2: Add the new randomChosenColour generated to the end of the gamePattern. (to keep track of the generated colors in order)
    gamePattern.push(randomChosenColour);                           
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);             //Step 3: selecting the buttons with the same id of the randomized color to add animation to this button emphazizing that this button is the next button in sequence 
    var audio=new Audio("./sounds/"+randomChosenColour+".mp3");     //step 3: adding sound according to the color randomized.
    audio.play();
}


//Step 5 (playSound taking one parameter which is the color of the button that has been clicked so you can concatenate it with the name of the mp3 file)
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}


//Step 6: Adding classes and removing it after a certain time (setTimeout) to add animation 
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


//Step 8: checking Answer if the random generated button was the same as the clicked button then correct
//passing a parameter which is the index of the last clicked button
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){                   //if the last clicked button was at index 0 we are comparing gamePattern[0] and userChosenColour[0]
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)                              //this Would check if the sequence was all completed Correctly(Clicking all the buttons that was randomly generated in correct order)this is by comparing if both arrays have the same number of elements if the lengths are equal we will call newSequence to generate one more button if not then this function will end and won't do anything until you click another button and another button till false or till lengths are equal
        {                                                                                
            setTimeout(nextSequence,1000);                                              //if you have pressed all of them correctly then we will continue to randomly generate one more button but you have to click all of the randomly generated buttons in order from the begining(So that is why we've setted userClickedPattern=[]; in newSequence because every single time you complete the whole level correctly one more button is generated and you start memorizing and clicking all the randomly generated buttons)
        }                                                                               //After Clicking a buttons by 1 second it'll call nextsequence again
    }
    else{
        console.log("wrong");
        var audio=new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


// Step 10: toggle true to all the keydown to begin the game, game pattern empty to start a new sequence, level =0 to start counting levels again
function startOver()
{
    toggle=true;
    level=0;
    gamePattern=[];
}



