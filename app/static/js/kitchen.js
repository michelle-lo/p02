// HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
// SoftDev pd2
// P02: Four Toppings Boba Shop
// 2022-03-09

//script for counter stage
// '''access canvas and buttons via DOM'''
//Different canvas layers

var c1 = document.getElementById('counter');
var c2 = document.getElementById('kitchen');
var c3 = document.getElementById('drink');

var counterB = document.getElementById('countStage');
var kitchenB = document.getElementById('kitchenStage');

// tea variables
var milkTea = document.getElementById('milkTea')
var greenTea = document.getElementById('greenTea')
var taroTea = document.getElementById('taroTea')
var oolongTea = document.getElementById('oolongTea')

// topping variables

var lycheeJelly =  document.getElementById('lycheeJelly')

// '''prepare to interact with canvas in 2D'''
var ctx1 = c1.getContext("2d");
var ctx2 = c2.getContext("2d");
var ctx3 = c3.getContext("2d");



var drawCounter = () => {
  document.getElementById("kitchen").style.visibility = "hidden";
  document.getElementById("counter").style.visibility = "visible";

};

var drawKitchen = () => {
  document.getElementById("counter").style.visibility = "hidden";
  document.getElementById("kitchen").style.visibility = "visible";
};

// // creates background images for counter on canvas
let img0 = document.createElement("img");
img0.src = '../static/assets/cup.png';

img0.addEventListener("load", () => {
  ctx3.drawImage(img0, 0, 0)
});


let img1 = document.createElement("img");
img1.src = '../static/img/counter_canvas.png';

img1.addEventListener("load", () => {
  ctx1.drawImage(img1, 0, 0)
});

let img2 = document.createElement("img");
img2.src = '../static/img/kitchen_canvas.png';

img2.addEventListener("load", () => {
  ctx2.drawImage(img2, 0, 0)
});

let img3 = document.createElement("img");
img3.src = '../static/assets/tea_milk.png';
//
function drawMilkTea(){
//   // img3.addEventListener("load", () => {
     ctx3.drawImage(img3, 0, 0);
}

let img4 = document.createElement("img");
img4.src = '../static/assets/tea_green.png';

function drawGreenTea(){
    ctx3.drawImage(img4, 0, 0);
}

let img5 = document.createElement("img");
img5.src = '../static/assets/tea_taro.png';

function drawTaroTea(){
    ctx3.drawImage(img5, 0, 0);
}

let img6 = document.createElement("img");
img6.src =  '../static/assets/tea_oolong.png';

function drawOolongTea(){
    ctx3.drawImage(img6, 0, 0);
}

let img7 = document.createElement("img");
img7.src = '../static/assets/topping_lychee.png'

function drawLycheeJelly(){
    ctx3.drawImage(img7, 0, 0);
}



counterB.addEventListener("click", drawCounter);
kitchenB.addEventListener("click", drawKitchen);
milkTea.addEventListener("click", drawMilkTea);
