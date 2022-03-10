// HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
// SoftDev pd2
// P02: Four Toppings Boba Shop
// 2022-03-09

// '''access canvas and buttons via DOM'''
//Different canvas layers
var c = document.getElementById('canvas');

// '''prepare to interact with canvas in 2D'''
var ctx = c.getContext("2d");

// background image for shop
let img = document.createElement("img");
img.src = "https://ichef.bbci.co.uk/news/976/cpsprodpb/0ED2/production/_118149730_mediaitem118148499.jpg";

//loads image
img.addEventListener("load", () => {
  ctx.drawImage(img, 0, 0);
});
