const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const theScore = document.querySelector(".scores p")
const error = document.querySelector(".errors p")

// variable declarations
let time = 0;
var hour;
var minute;
var second;
var timer;
var timerContinue = false; 
var myScores = []; // saves scores
var highestScores = []; // saves highest scores
var errorCount = 0;  // counts errors

// Add leading zero to numbers 9 or below (purely for aesthetics):
var leadingZero = function(num){
    // Add a zero before #0-9
    if(num < 10 && num >= 0){
      return "0" + num;  
    } else {
      return num;
    }
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
  // counts up 
  time++;  
          /* Help using https://www.folkstalk.com/2022/07/minutes-to-seconds-javascript-with-code-examples.html for hour, minute, second conversion
-hour: total # of seconds is divided by 3600 -> 60min/hr * 60sec/min
-minute: divide total # of seconds by 60
-second: multiply minutes by 60, hours by 3600, and subtract from total # of seconds
  */
           hour = Math.floor(time/3600); 
           minute = Math.floor((time - (hour*3600))/60); 
           second = time - ((hour*3600) + (minute*60));
  // displays timer set in the proper format
  theTimer.innerHTML = leadingZero(hour) + ":" + leadingZero(minute) + ":" + leadingZero(second);
}

// Match the text entered with the provided text on the page:
function match() {
    // If the characters you type matches the text (I love pasta!) exactly, then the timer stops. It will change the border color to blue.
    if (testArea.value === originText){ 
        clearInterval(timer);
        testWrapper.style.borderColor = "navy";
      
    // stores & pushes time in array
    myScores.push(leadingZero(hour) + ":" + leadingZero(minute) + ":" + leadingZero(second));
    // sorts time lowest to highest order
    myScores.sort();
    // shows all times in order
    window.confirm(myScores);
    // Grabs 3 times from the front of the array since they are the highest; these are the fastest times.
    highestScores = myScores.slice(0, 3) // returns elements myScores[0]-myScores[2] and placed in new array highestScores[]
    // displays 3 fastest scores 
    theScore.innerHTML = "1st score: " + highestScores[0] + "<br>" + "2nd score: " + highestScores[1] + "<br>" + "3rd score: " + highestScores[2];      
      
    // Substring grabs all the characters in a string from beginning to end. Here it would be from the first position (0) to the length of the character/s you type. If there is a match, then the border color will turn red.
    } else if (testArea.value == originText.substring(0, testArea.value.length)){
        testWrapper.style.borderColor = "red";
    } else {
        //  If characters typed doesn't match, then border color will turn yellow.
        testWrapper.style.borderColor = "yellow";
      
        // counts # of errors 
        errorCount++;
        // displays # of errors 
        error.innerHTML = "ERROR: " + errorCount;
    }
}

// Start the timer:
function startTimer(){
    // Everything must be reset completely (timer is turned off, the text box is empty); this will allow the timer to start once the user begins typing and will continue until a match is found.    
    if (timerContinue == false) {
        timerContinue = true;
        timer = setInterval(runTimer, 30); // 30=interval speed
    }
}

// Reset everything:
function resetTimer(){
  clearInterval(timer);
  // original format
  theTimer.innerHTML = "00:00:00";
  // empty value
  testArea.value = "";
  hour = 0;
  minute = 0;
  second = 0;
  // starts counter from 00:00:00
  time = 0;
  timerContinue = false;
  // default border color
  testWrapper.style.borderColor = "grey";
  errorCount = 0;
}
  
// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", startTimer); // presses key
resetButton.addEventListener("click", resetTimer); // clicks button
testArea.addEventListener("keyup", match); // releases key
