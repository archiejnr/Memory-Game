
/*
*Declaration of variables
*/
const deck=document.querySelector('.deck');
const moves=document.querySelector('.moves');
const restart=document.querySelector('.fa-repeat');
const popRestart=document.querySelector('.RESTART');
let timeboard=document.querySelector('.timer');
let clickedElement;
let element;
let first;
let second;
let x=0;
let y;
let timer=0;
let domArray=deck.querySelectorAll('li');
let starArray=document.querySelectorAll('.fa-star');
let stars=document.querySelectorAll('.stars');
let box=document.querySelector('.popUp');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 function arrangement(w) {
   deck.innerHTML="";
   for(let p=0;p<=w.length-1;p++)
     deck.appendChild(w[p]);
}
/**
*@description function to put nodelist into an domArray
*taken from stackoverflow.com
*/
function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) {
    array[i] = obj[i];
  }
  return array;
}


/**
*@description timer function to keep measure elapsed time
*/
function stopWatch() {
  timer=timer+1;
  timeboard.textContent=timer+ " sec";
}
/**
*@description to allow me to use clearInterval method
*interval stopper
*/
let myTime=setInterval(function () {stopWatch();},1000);

/**
*@description onload function to ensure shuffle when the browser is refreshed
*
*/

 window.onload=function() {
   let newArray=toArray(domArray);
   domArray=shuffle(newArray);
   arrangement(domArray);
   //myTime;

 }
 /**
 *@description function to clear statistics on restart
 */
 function clearStats () {
   moves.textContent=0;
   x=0;
   starArray[0].style.display='block';
   starArray[1].style.display='block';
   starArray[2].style.display='block';
 }
 /**
 *@description to check if game was completed
 */
 function completionCheck () {
  let complete=deck.querySelectorAll('.match');
  let timeStats=document.querySelector('#seconds');
  let starsStats=document.querySelector('#stars');
  if(complete.length===16){
    box.style.display='block';
  clearInterval(myTime);
  timeStats.textContent=timer+"  ";
  for(let i=0;i<=2;i++)
    starsStats.appendChild(starArray[i]);
    }
  }
 /**
 *@description function to close  cards all cards on restart
 */
 function closeCards() {
   let openCard=deck.querySelectorAll('.open');
   let selectedCard=deck.querySelectorAll('.selected');
   let matchedCard=deck.querySelectorAll('.match');
   let shownCards=deck.querySelectorAll('.show');
   for(let i=0;i<=openCard.length-1;i++)
         openCard[i].classList.toggle('open');
   for(let i=0;i<=selectedCard.length-1;i++)
        selectedCard[i].classList.toggle('selected');
   for(let i=0;i<=matchedCard.length-1;i++)
        matchedCard[i].classList.toggle('match');
   for(let i=0;i<=shownCards.length-1;i++)
        shownCards[i].classList.toggle('show');
 }

 /**
 *@description function to rearrange the elements
 */

 function arrangement(w) {
   deck.innerHTML="";
   for(let p=0;p<=w.length-1;p++)
     deck.appendChild(w[p]);
}

/**
*event listeners
*please note that i have used some jquery to simplify some tasks
*/

$(document).ready(function () {



  /***
  *@description function for reaaranging cards
  */

  restart.addEventListener('click',function () {
    let newArray=toArray(domArray);
    domArray=shuffle(newArray);
    arrangement(domArray);
    closeCards();
    clearStats();
    location.reload();
    timer=0;
    let myTime=setInterval(function () {stopWatch();},1000);
})

/**
*@description event listener for the restart button in the popUp
*/

popRestart.addEventListener('click',function () {
   let newArray=toArray(domArray);
   domArray=shuffle(newArray);
   arrangement(domArray);
   closeCards();
   clearStats();
   box.style.display='none';
   location.reload();

})


  /**
  *@description event handler for each of the cards in the deck
  */
$('li').click(function () {
    $(this).toggleClass('open show selected');
    x=counter(x);
    moves.textContent=x;
    if(x%2===1)
      first=$(this).children().attr('class');
    else
      second=$(this).children().attr('class');
      compareCards(first,second,x);
      stars(x);
      setTimeout(function () {completionCheck()},1000);
});

/**
*@description the next function is to count the number of clicks the user has done
*/
function counter() {
 return x=x+1;
}
/**
*@description the following function compares the cards
*/
function compareCards(first,second,x) {
  if (x%2===0)
    if(first===second)
        setTimeout(function () {match();},600);
      else
        setTimeout(function () {noMatch();},600);
}
/**
*@description the function below opens the matched cards
*/
function match() {
  let array=document.querySelectorAll('.selected');
 for(let x=0;x<=1;x++){
  array[x].classList.toggle('match');
  array[x].classList.toggle('open');
  array[x].classList.toggle('show');
  array[x].classList.toggle('selected');
  }
}
/**
*@description the next func is to close unmatching cards
*/
function noMatch() {
  let array=document.querySelectorAll('.selected');
  for(let x=0;x<=1;x++){
  array[x].classList.toggle('open');
  array[x].classList.toggle('show');
  array[x].classList.toggle('selected')
    }
}
/**
*@description the function adds starts depending on the number of moves made
*@param NumOfMoves-- number of moves made so far
*/
function stars(y) {
  if(y>=32)
      starArray[2].style.display='none';
  if(y>=50)
      {
      starArray[2].style.display='none';
      starArray[1].style.display='none';
      }

}
/**
*@description event close the popoUp message
*/
 $('.close').click(function () {
 box.style.display='none';
});
});
