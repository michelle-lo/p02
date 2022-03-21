// HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
// SoftDev pd2
// P02: Four Toppings Boba Shop
// 2022-03-09

//script for counter stage
// '''access canvas and buttons via DOM'''
//Different canvas layers
var c1 = document.getElementById('counterbkg');
var c2 = document.getElementById('drink');
var c3 = document.getElementById('customer');
var c4 = document.getElementById('counter');

var requestID;
var drinkOnB = document.getElementById('drinkOn');
var drinkOffB = document.getElementById('drinkOff');
var sellBtn = document.getElementById('sellBtn');

// '''prepare to interact with canvas in 2D'''
var ctx1 = c1.getContext("2d");
var ctx2 = c2.getContext("2d");
var ctx3 = c3.getContext("2d");
var ctx4 = c4.getContext("2d");

// drink visiblility
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
        $("#balance").text("Balance: " + data.balance); //updates balance div element with the data sent from init file
        $("#order").text(data.order);
    });
    return false;
  });
});

// cup
let img0 = document.createElement("img");
img0.src = '../static/assets/cup.png';

img0.addEventListener("load", () => {
  ctx2.drawImage(img0, 0, 0)
});

//counter background
let img1 = document.createElement("img");
img1.src = '../static/img/counter_canvas.png';

img1.addEventListener("load", () => {
  ctx1.drawImage(img1, 0, 0)
});

//counter foreground
let img4 = document.createElement("img");
img4.src = '../static/img/counter_foreground.png';

img4.addEventListener("load", () => {
  ctx4.drawImage(img4, 0, 0)
});

//customer
let img3 = document.createElement("img");
img3.src = '../static/assets/customer0.png';

//customer slideeeeee
var clear = (e) => {
    ctx3.clearRect(0, 0, c3.clientWidth, c3.clientHeight);
};

// 256 is the height of image 3
console.log(c3.height);
img3.addEventListener("load", () => {
  ctx3.drawImage(img3, c3.width / 2 - img3.width / 2, c3.height / 2 - (256 / 2) + 10)
});

var dx = 0;
var dy = c3.height / 2 - (256 / 2) + 10;
xVel = 5;

var customerSlide = () => {
  if (dx >= c3.width / 2 - img3.width / 2) {
    dx = 0;
  }
  window.cancelAnimationFrame(requestID);
  requestID = window.cancelAnimationFrame(requestID);
  clear();
  ctx3.beginPath();
  ctx3.drawImage(img3, dx, dy);
  dx += xVel;
  if (dx <= c3.width / 2 - img3.width / 2) {
    requestID = window.requestAnimationFrame(customerSlide);
  }

}

drinkOn.addEventListener("click", drawDrinkOn);
drinkOff.addEventListener("click", drawDrinkOff);
sellBtn.addEventListener("click", customerSlide);
