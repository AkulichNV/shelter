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




  fetch('/shelter/assets/scripts/pets.json')
  .then(response => {
      return response.json();
  })
  .then(data => {
    var countImg = countCards(); // count images on the page

    // generated an array of 48 elements in a pseudo-random way
    const manyPets = genArr(data, countImg);

    showCard(countImg, 1, manyPets); 

    let oneRight = document.querySelector('.right-one');
            oneRight.addEventListener("click", turnOneRight);

    let endRight = document.querySelector('.right-end');
            endRight.addEventListener("click", turnEndRight);

    let oneLeft = document.querySelector('.left-one');
            oneLeft.addEventListener("click", turnOneLeft);

    let endLeft = document.querySelector('.left-end');
            endLeft.addEventListener("click", turnEndLeft);

    // click right one arrow button
    function turnOneRight() {
        let elemPage = document.getElementsByClassName('page');
        let currentPage = +elemPage[0].innerHTML;
        let newPage = currentPage + 1;
        elemPage[0].innerHTML = checkPage(newPage, countImg);
        
        showCard(countImg, newPage, manyPets); 
    }

    // click right end arrow button
    function turnEndRight() {
        let newPage = manyPets.length / countImg;
        let elemPage = document.getElementsByClassName('page');
        elemPage[0].innerHTML = checkPage(newPage, countImg);
        
        showCard(countImg, newPage, manyPets); 
    }

    // click left one arrow button
    function turnOneLeft() {
        let elemPage = document.getElementsByClassName('page');
        let currentPage = +elemPage[0].innerHTML;
        let newPage = currentPage - 1;
        elemPage[0].innerHTML = checkPage(newPage, countImg);
        
        showCard(countImg, newPage, manyPets); 
    }

    // click left end arrow button
    function turnEndLeft() {
        let newPage = 1;
        let elemPage = document.getElementsByClassName('page');
        elemPage[0].innerHTML = checkPage(newPage, countImg);
        
        showCard(countImg, newPage, manyPets); 
    }


  });

  // get size screen width with number of visible cards on it
function countCards() {
    const pageWidth  = document.documentElement.scrollWidth;
    var count = 0;
    if (pageWidth >= 1280) {
        count = 8;
    } else if (pageWidth < 1280 && pageWidth >= 768) {
        count = 6;
    } else {
        count = 3;
    }
    return count;
}

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

  function genArr(arr, num) {
    var newArr = [];
    var x = 48 / num;
    for (let i=1; i<=x; i++) {
        var n = shuffle(arr);
        newArr.push.apply(newArr, n.slice(0, num));
    };
    return newArr;
  }



function showCard(num, nPage, arr) {
    
    // delete all cards with pets
     removeCards();   

     if(nPage == 1) {                           // for endLeft button and start load
        var start = 0;
        var end = num - 1;
     } else if( nPage == arr.length / num ) {   //for endRight button 
        var start = arr.length - num;
        var end = arr.length - 1;
     } else {                                   // for oneLeft and oneRight button
        var start = (nPage - 1) * num;
        var end = start + num - 1;
     }

     // draw new cards with pets and their popup 
    for(let i=start; i<=end; i++) {
        drawCards(arr, i);
        drawPopup(arr, i);
        document.getElementById(`i-${i}`).addEventListener("click", showmodal);
    }


}

// rendering cards with pets
function drawCards(data, i) {
    var petsCards = document.querySelector('.pets-cards');

    let cardDiv = document.createElement('div');
        cardDiv.className = "card";
        cardDiv.id = `i-${i}`;

        cardDiv.insertAdjacentHTML("beforeend", `<img src=${data[i].img} alt=${data[i].type}-${data[i].name}>`);
        cardDiv.insertAdjacentHTML("beforeend", `<p class="name-card">${data[i].name}</p>`);
        cardDiv.insertAdjacentHTML("beforeend", `<button type="button" class="button-secondary">Learn more</button>`);
        
    petsCards.appendChild(cardDiv);
}

// rendering popup with pets
function drawPopup(data, i) {
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

// remove previous visible cards
function removeCards() {
   document.querySelectorAll('.card').forEach(el => el.remove());
}

// check number of page 
function checkPage(p, n) {
    let left = document.querySelectorAll('.button-paginator-left');
    let right = document.querySelectorAll('.button-paginator-right');

    if (p == 1) {
        left.forEach(el => el.disabled = true);
        right.forEach(el => el.disabled = false);
    } else if (p < 48 / n) {
        left.forEach(el => el.disabled = false);
        right.forEach(el => el.disabled = false);
    } else if (p == 48 / n) {
        right.forEach(el => el.disabled = true);
        left.forEach(el => el.disabled = false);
    }
    return p;
}

// open and close popup
function modalOnOff(id, e) {
    var numId = parseInt(id.match(/\d+/));
    var popId = "pop-" + numId; 

    let popEl = document.getElementById(popId);
    popEl.classList.add("on");

    document.body.classList.add("stop-scrolling");

    let body = document.querySelector("body");
    let close = popEl.querySelector(".modal-js-close");
    let bg = document.createElement("div");
    bg.className = "modal-js-overlay";
    body.appendChild(bg);

    // delete popup to click on grey zone
    bg.addEventListener("click", (e) => { 
        body.removeChild(bg);
        popEl.classList.remove('on');
        document.body.classList.remove("stop-scrolling");
    });

    // close button in popup
    close.addEventListener('click', (e) => {
        popEl.classList.remove('on');
        body.removeChild(bg);
        document.body.classList.remove("stop-scrolling");
        
    });
}

function showmodal()  {
    modalOnOff(this.id);
}