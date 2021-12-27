
const gridContainer = document.querySelector('.grid-container');
const colorButtons = document.querySelectorAll('.color-button'); 
const colorPallete = document.querySelector('#pallete'); // # cause id ( id cause only a single element)
const clearButton = document.querySelector('.clear-button');
var colorizeOn = true;
var slider = document.querySelector('#slider'); // it changes therefore var
var sliderSize = document.querySelector('.slider-size');
//default color at start
let color = 'black';


function createGrid(gridSize) {
  for (let i = 1 ; i <= gridSize**2 ; i++ ) {
    let gridSquare = document.createElement('div');
    gridContainer.insertAdjacentElement('beforeend',gridSquare);
    gridSquare.classList.add('borders');
    // ^^ Created gridSize^2 "squares" and inserted them into our gridcontaier//
    // ^^ "beforeend" just tells them to stack em one after the other in th html file// 
    //^^ now we have a big tower of  gridsize^2 divs occuping all lateral space //
  }
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize},1fr)`;

  // ^^Let's style the tower of divs, let's make gridContainer a Grid in css and//
  // ^^tell it to make gridSize amount of  columns and gridSize acmount of  rows and have each of the//
  // ^^elements occupy all available space (1fr) (since all are 1fr they all occupy same space) 

  var gridPixels = gridContainer.querySelectorAll('div');
  gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover',colorize));
  sliderSize.innerText = `Grid size: ${gridSize} X ${gridSize}`;

  // ^^selects all of the squares we've put in gridContainer and listens for a mouseover //
  //^^ in each one to activate colorize function //
}
// default size 
createGrid(30);

function colorize () {
  if (colorizeOn == true) {
    switch (color) {
      case 'rainbow':
          this.style.backgroundColor = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},1)`; 
        //^^ a note on "this": colorize is called to work on the element gridPixel, so when we say "this" we mean gridPixel //
        break;
      case 'eraser':   
        this.style.backgroundColor = '#ffffff';
        break;
      case 'black':
        this.style.backgroundColor = '#000000';
        break;
      case 'shade':
          if (this.style.backgroundColor.match(/rgba/)) {
              let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
              if (currentOpacity <= 0.9) {
                  this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                  this.classList.add('gray');
              }
          } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
              return;
          } else {
              this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
          }
      default:
        this.style.backgroundColor = color;
        break;
    }
  }
}
// takes in an element (colorButton)  and extracts the dataset value we added in html, smart because they all have "color-button" class but different datasets
function newColor(event) {
  switch(event.target.dataset.color) {
    case 'rainbow':
      color = 'rainbow';
      break;
    case 'eraser':
      color = 'eraser';
      break;
    case 'black':
      color = 'black';
      break;
    case 'shade':
      color = 'shade';
      break;
  }
}
// similarly this function works like the prior but on the pallete
function palleteColor(event) {
  color = event.target.value;
}
// Activated by the clear button, clears grid
function clearGrid() {
  var gridPixels = gridContainer.querySelectorAll('div');
  gridPixels.forEach(gridPixel => gridPixel.style.backgroundColor = 'rgb(255, 255, 255)');
  colorButtons.forEach(colorButton => colorButton.classList.remove('toggle-on')); // removes toggle on class
  color=''; // toggles off all buttons
}
// resizes grid when user moves the slider
function resizeGrid () {
  var gridPixels = gridContainer.querySelectorAll('div');
  gridPixels.forEach(gridPixel => gridPixel.remove()); // first deletes all divs we had previously
  createGrid(slider.value);
}
// button animation when mouse is over 
function hoverAnimation() {
  this.classList.add('hovering');
}
// of course, removes the animation when no longer hovering
function hoverAnimationOff() {
  this.classList.remove('hovering');
}
function toggleOn() {
  if (this.classList.contains('toggle-on')) {
    this.classList.toggle('toggle-on');
    colorizeOn = false;
    // colorizeOn toggles the colorize function, we want the user to hover over the picture without painting it , note:
    // putting "color = '' " does not work, cause it effectively works as an eraser, default value is transparent
  }
  else { 
    colorButtons.forEach(colorButton => colorButton.classList.remove('toggle-on'));
    this.classList.toggle('toggle-on');
    colorizeOn = true;
  }
}


// Event listeners

clearButton.addEventListener('click',clearGrid);
clearButton.addEventListener('mouseover',hoverAnimation);
clearButton.addEventListener('mouseout',hoverAnimationOff);
colorButtons.forEach(colorButton => colorButton.addEventListener('click',newColor));
colorButtons.forEach(colorButton => colorButton.addEventListener('click',toggleOn));
colorButtons.forEach(colorButton => colorButton.addEventListener('mouseover',hoverAnimation));
colorButtons.forEach(colorButton => colorButton.addEventListener('mouseout',hoverAnimationOff));
slider.addEventListener('mouseup',resizeGrid);
colorPallete.addEventListener('change', palleteColor, true);
colorPallete.addEventListener('input', palleteColor, true);