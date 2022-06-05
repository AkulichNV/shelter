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

            //create cards with pets for caruosel
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

                // Popup

                document.getElementById(`i-${i}`).addEventListener("click", showmodal);
                
                // base layout
                let popupDiv = document.createElement('div');
                    popupDiv.id = `pop-${i}`;
                    popupDiv.className = "modal";
                    
                    popupDiv.insertAdjacentHTML("afterbegin", `<img class="popup-img" alt=${data[i].type}-${data[i].name} src=${data[i].img}>`);

                // description of pet
                let contentDiv = document.createElement('div');
                    contentDiv.className = "pets-content";

                    contentDiv.insertAdjacentHTML("beforeend", `<h3 class="popup-name">${data[i].name}</h3>`);
                    contentDiv.insertAdjacentHTML("beforeend", `<h4 class="popup-type">${data[i].type} - ${data[i].breed}</h4>`);
                    contentDiv.insertAdjacentHTML("beforeend", `<h5 class="popup-description">${data[i].description}</h5>`);
                    var ulLi = `<ul class="popup-extra"><li><strong>Age:</strong> ${data[i].age}</li> <li><strong>Inoculations:</strong> ${data[i].inoculations}</li> <li><strong>Diseases:</strong> ${data[i].diseases}</li> <li><strong>Parasites:</strong> ${data[i].parasites}</li></ul>`
                    contentDiv.insertAdjacentHTML("beforeend", ulLi);

                    // button close
                let close = document.createElement("span");
                    close.className = "modal-js-close";
                    close.id = `${i}`;
                    close.innerHTML = "<img src='/shelter/assets/icons/Vector.svg' alt='close' />";

                popupDiv.append(contentDiv);
                popupDiv.append(close);
                document.body.append(popupDiv);
                
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

// open and close popup
function modalOnOff(id, e) {
    var numId = parseInt(id.match(/\d+/));
    var popId = "pop-" + numId; 

    let popEl = document.getElementById(popId);
    popEl.classList.add("on");

    let body = document.querySelector("body");
    let close = popEl.querySelector(".modal-js-close");
    let bg = document.createElement("div");
    bg.className = "modal-js-overlay";
    body.appendChild(bg);

    // delete popup to click on grey zone
    bg.addEventListener("click", (e) => { 
        body.removeChild(bg);
        popEl.classList.remove('on');
    });

    // close button in popup
    close.addEventListener('click', (e) => {
        popEl.classList.remove('on');
        body.removeChild(bg);
        
    });
}

function showmodal(e)  {
    modalOnOff(this.id, e);
}