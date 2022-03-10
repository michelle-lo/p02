// HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
// SoftDev pd2
// P02: Four Toppings Boba Shop
// 2022-03-09

//script for counter stage
// '''access canvas and buttons via DOM'''
//Different canvas layers
var c1 = document.getElementById('counter');
var c2 = document.getElementById('background');

// '''prepare to interact with canvas in 2D'''
var ctx1 = c1.getContext("2d");
var ctx2 = c2.getContext("2d");

// creates background images for counter on canvas
let img1 = document.createElement("img");
img1.src = '../static/img/flower1.png';

img1.addEventListener("load", () => {
  ctx1.drawImage(img1, c1.clientWidth/2, c1.clientHeight/2)
});

let img2 = document.createElement("img");
img2.src = '../static/img/flower2.png';

img2.addEventListener("load", () => {
  ctx2.drawImage(img2, c2.clientWidth/2, c2.clientHeight/2)
});
