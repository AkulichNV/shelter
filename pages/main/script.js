"use strict";

// open and close burger menu

const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const logo = document.querySelector('.logo');

function toggleMenu() {
    navList.classList.toggle('open');
    hamburger.classList.toggle('open');
    logo.classList.toggle('open');
}
function closeMenu(event) {
    if (event.target.classList.contains('nav-link')) {
        navList.classList.remove('open');
        hamburger.classList.remove('open');
        logo.classList.remove('open');
      }
}
hamburger.addEventListener('click', toggleMenu);
navList.addEventListener('click', closeMenu);

// Carousel
 
// shuffle array by Fisher–Yates shuffle  

function shuffle(array) {
    let currentIndex = array.length;  
    let randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

fetch('/shelter/assets/scripts/pets.json')
        .then(response => {
            return response.json();
        })
        .then(data => {

            //shuffle order of pets.json
            shuffle(data);
            // console.log(data);

            //create cards with pets
            var count = countCards();
            var petsCards = document.querySelector('.pets-cards');
            for (let i = 0; i < data.length; i++) {
                let cardDiv = document.createElement('div');
                    cardDiv.className = "card show";
                    cardDiv.id = `i-${i}`;

                    cardDiv.insertAdjacentHTML("beforeend", `<img src=${data[i].img} alt=${data[i].type}-${data[i].name}>`);
                    cardDiv.insertAdjacentHTML("beforeend", `<p class="name-card">${data[i].name}</p>`);
                    cardDiv.insertAdjacentHTML("beforeend", `<button type="button" class="button-secondary">Learn more</button>`);
                    
                petsCards.appendChild(cardDiv);

                // displays only the first cards with pets according width screen
                if (i > count-1) { cardDiv.classList.remove('show');}
            }
            
        })



let arrowRight = document.querySelector('.button-arrow-right');
            arrowRight.addEventListener("click", turnRight);

let arrowLeft = document.querySelector('.button-arrow-left');
            arrowLeft.addEventListener("click", turnLeft);

// click right arrow button
function turnRight() {
    showCard(1); 
}

// click left arrow button
function turnLeft() {
    showCard(-1);
}

// show cards
function showCard(a) {
    // console.log(a);
    var cardShow = [...document.querySelectorAll('.show')];
    var cards = [...document.querySelectorAll('.card')];

    var id = cardShow[0].id;
    var index = cards.findIndex(item => item.id == id);

    var count = countCards(); // count of cards on the page

    cardShow.forEach(el => el.classList.remove('show')); // hide display cards

    if (a == 1) {
        // right arrow
        // first card with pet to show
        var start = index + count;
        (start >= cards.length) ? start = start - cards.length : start;

    } else {
        //left arrow

        // first card with pet to show
        var start = index - count;
        (start < 0) ? start = start + cards.length : start;
    }
    
    // last card to show
    var end = start + count - 1;
    (end >= cards.length) ? end = end - cards.length : end;

    // show these cards
    if (start < end) {
        for (let i=start; i<=end; i++ ) {
            cards[i].classList.toggle('show');
        }
    } else {
        for (let i=start; i<cards.length; i++ ) {
            cards[i].classList.toggle('show');
        }
        for (let i=0; i<=end; i++ ) {
            cards[i].classList.toggle('show');
            document.querySelector('.pets-cards').appendChild(cards[i]);
        }
        
    }
    
}

// get size screen width with count of visible cards
function countCards() {
    const pageWidth  = document.documentElement.scrollWidth;
    var count = 0;
    if (pageWidth >= 1280) {
        count = 3;
    } else if (pageWidth < 1280 && pageWidth >= 768) {
        count = 2;
    } else {
        count = 1;
    }
    return count;
}