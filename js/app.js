'use script';

// *Global Variables* - Number of rounds and overall array
let selectionRounds = 25;
let busMallArray = [];

// *DOM References*

let imageContainer = document.getElementById('images');
let imageA = document.getElementById('img-a');
let imageB = document.getElementById('img-b');
let imageC = document.getElementById('img-c');

let results = document.getElementById('results');
let btn = document.getElementById('btn');

// *Constructor Function*

function BusMall(productName, fileExtension = 'jpg') {
  this.productName = productName;
  this.productImage = `img/${productName}.${fileExtension}`;
  this.view = 0;
  this.click = 0;

  busMallArray.push(this);
}

// Bus Mall products

new BusMall('bag');
new BusMall('banana');
new BusMall('bathroom');
new BusMall('boots');
new BusMall('breakfast');
new BusMall('bubblegum');
new BusMall('chair');
new BusMall('cthulhu');
new BusMall('dog-duck');
new BusMall('dragon');
new BusMall('pen');
new BusMall('scissors');
new BusMall('shark');
new BusMall('sweep', 'png');
new BusMall('tauntaun');
new BusMall('unicorn');
new BusMall('water-can');
new BusMall('wine-glass');

// console.log(busMallArray);



// *Helper Functions* - Randomizer, render 3 random images to page (don't duplicate in a round)

function getRandomIndex() {
  return Math.floor(Math.random()*busMallArray.length);
}

function renderImages() {

  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();
  //validation **Help from Katharine
  while (productOneIndex === productTwoIndex || productOneIndex === productThreeIndex || productTwoIndex === productThreeIndex) {
    productOneIndex = getRandomIndex();
    productTwoIndex = getRandomIndex();
  }

  imageA.src = busMallArray[productOneIndex].productImage;
  imageA.alt = busMallArray[productOneIndex].productName;
  busMallArray[productOneIndex].view++;

  imageB.src = busMallArray[productTwoIndex].productImage;
  imageB.alt = busMallArray[productTwoIndex].productName;
  busMallArray[productTwoIndex].view++;


  imageC.src = busMallArray[productThreeIndex].productImage;
  imageC.alt = busMallArray[productThreeIndex].productName;
  busMallArray[productThreeIndex].view++;

}

renderImages();

// *Event Handlers*

function handleClick(event) {
  let imageClicked = event.target.alt;

  // console.log('image clicked', imageClicked);

  for (let j = 0; j < busMallArray.length; j++) {
    if (imageClicked === busMallArray[j].productName) {
      busMallArray[j].click++;
    }
  }

  selectionRounds--;

  if (selectionRounds === 0) {
    imageContainer.removeEventListener('click', handleClick);
  }

  renderImages();

}

function handleResults() {
  if (selectionRounds === 0) {
    for (let k = 0; k < busMallArray.length; k++) {
      let percentageViewed = Math.round((busMallArray[k].click / busMallArray[k].view)*100);
      let li = document.createElement('li');
      results.appendChild(li);
      li.textContent = `${busMallArray[k].productName}: ${busMallArray[k].view} views, ${busMallArray[k].click} votes (~${percentageViewed}%)`;
    }
  }
}

// *Event Listeners* - image click and review results
imageContainer.addEventListener('click', handleClick);
btn.addEventListener('click', handleResults);
