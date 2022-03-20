// HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
// SoftDev pd2
// P02: Four Toppings Boba Shop
// 2022-03-09

//script for counter stage
// '''access canvas and buttons via DOM'''
//Different canvas layers
var c1 = document.getElementById('counter');
// var c2 = document.getElementById('kitchen');
var c2 = document.getElementById('drink');
var drinkOnB = document.getElementById('drinkOn');
var drinkOffB = document.getElementById('drinkOff');
// var milkTea = document.getElementById('milkTea')
// '''prepare to interact with canvas in 2D'''
var ctx1 = c1.getContext("2d");
var ctx2 = c2.getContext("2d");

var drawDrinkOff = () => {
  document.getElementById("drink").style.visibility = "hidden";

};

var drawDrinkOn = () => {
  document.getElementById("drink").style.visibility = "visible";
};

//jquery for updating balance and order with sell button
$(function() {
  $('a#sellBtn').bind('click', function() {
    $.getJSON('/process', function(data) { //send data back to python file
      //do nothing
    })
    .done(function(data){
        $("#balance").text(data.balance); //updates balance div element with the data sent from init file
        $("#order").text(data.order);
    });
    return false;
  });
});

// // creates background images for counter on canvas
let img0 = document.createElement("img");
img0.src = '../static/assets/cup.png';

img0.addEventListener("load", () => {
  ctx2.drawImage(img0, 0, 0)
});


let img1 = document.createElement("img");
img1.src = '../static/img/counter_canvas.png';

img1.addEventListener("load", () => {
  ctx1.drawImage(img1, 0, 0)
});


drinkOn.addEventListener("click", drawDrinkOn);
drinkOff.addEventListener("click", drawDrinkOff);
