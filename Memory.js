const gameContainer = document.getElementById("game");
const startButton = document.querySelector("#start");
const refreshButton = document.querySelector("#refresh");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
let start = false;

startButton.addEventListener('click',function(){
    start = true;
    gameContainer.classList.add('started');
})



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

let triesText = document.querySelector('#tries');
let matchText = document.querySelector("#matches");
let triesCounter = 0;
let matchCounter = 0;
let currentGuessCount = 0;
let currentGuessColor;
let firstCard;
let firstCardColor;
let secondCard;
let secondCardColor;
let permission = true;

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (permission == true && start == true){
    currentGuessCount = currentGuessCount + 1;
    if(currentGuessCount == 1 ){
        firstCard = event.target;
        firstCardColor = event.target.classList.value;
        event.target.style.backgroundColor = firstCardColor;  
    } else if(firstCard == event.target){
        currentGuessCount = 1;
    }  else if(currentGuessCount ==2){
      triesCounter = triesCounter + 1;
      triesText.innerText = triesCounter;
        permission = false;
        currentGuessCount = 0;
        secondCard = event.target;
        secondCardColor = event.target.classList.value;
        event.target.style.backgroundColor = secondCardColor;
        //evaluate if cards are a match!
        if(firstCardColor == secondCardColor){
          //console.log("Match")
          matchCounter = matchCounter + 1;
          if (matchCounter == (COLORS.length/2)){
            gameContainer.classList.remove('started');
            gameContainer.classList.add('winner');
          }
          setTimeout(function(){
            matchText.innerText = matchCounter;
            firstCard.style.backgroundColor = firstCardColor;
            secondCard.style.backgroundColor = secondCardColor;
            permission = true;
          },1000);
        } else {
          //console.log("no Match");
          setTimeout(function(){
            firstCard.style.backgroundColor = 'white';
            secondCard.style.backgroundColor = 'white';
            permission = true;
          },1000); 
        }
  }
  }
};

// when the DOM loads
createDivsForColors(shuffledColors);
