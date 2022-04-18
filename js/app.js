'use script';

// *Global Variables*
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

// BusMall products

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

console.log(busMallArray);



// *Helper Functions*

function getRandomIndex() {
  return Math.floor(Math.random() * busMallArray.length);
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

  imageA.src = busMallArray[productOneIndex].img;
  imageA.alt = busMallArray[productOneIndex].productName;
  busMallArray[productOneIndex].view++;

  imageB.src = busMallArray[productTwoIndex].img;
  imageB.alt = busMallArray[productTwoIndex].productName;
  busMallArray[productTwoIndex].view++;


  imageC.src = busMallArray[productThreeIndex].img;
  imageC.alt = busMallArray[productThreeIndex].productName;
  busMallArray[productThreeIndex].view++;

}

renderImages();

// *Event Handlers*

function handleClick(event) {
  let imageClicked = event.target.alt;

  console.log('image clicked', imageClicked);

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
      let li = document.createElement('li');
      results.appendChild(li);
      li.textContent = 'TEST TEST Fill';
    }
  }
}

// *Event Listeners*
imageContainer.addEventListener('click', handleClick);
btn.addEventListener('click', handleResults);


