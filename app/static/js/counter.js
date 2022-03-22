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
var c5 = document.getElementById('ticket');
var c6 = document.getElementById('text');


var requestID;
var drinkOnB = document.getElementById('drinkOn');
var drinkOffB = document.getElementById('drinkOff');
var sellBtn = document.getElementById('sellBtn');

// '''prepare to interact with canvas in 2D'''
var ctx1 = c1.getContext("2d");
var ctx2 = c2.getContext("2d");
var ctx3 = c3.getContext("2d");
var ctx4 = c4.getContext("2d");
var ctx5 = c5.getContext("2d");
var ctx6 = c6.getContext("2d");

// drink visiblility
var drawDrinkOff = () => {
  document.getElementById("drink").style.visibility = "hidden";

};

var drawDrinkOn = () => {
  document.getElementById("drink").style.visibility = "visible";
};

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

let img3 = document.createElement("img");
img3.src = '../static/assets/customer0.png';

//ticket
let img5 = document.createElement("img");
img5.src = '../static/img/ticket.png';

img5.addEventListener("load", () => {
  ctx5.drawImage(img5, 0, 0)
});


// 256 is the height of image 3

var drawCustomer = () => {
  img3.addEventListener("load", () => {
    ctx3.drawImage(img3, c3.width / 2 - img3.width / 2, c3.height / 2 - (256 / 2) + 10)
  });
}

var order_ticket;
var customer_id;
//jquery for updating balance and order with sell button
$(document).ready(function(data) {
  console.log("asdfasdf");
  $.getJSON('/counter_load', function(data) { //send data back to python file
    //do nothing
  })
  .done(function(data){
      order_ticket = data.order;
      customer_id = data.customer;
      if (customer_id === "customer0") {
        img3.src = img3.src = '../static/assets/customer0.png';
      } else {
        img3.src = img3.src = '../static/assets/customer1.png';
      }
      clear();
      drawCustomer();
      drawText();
      // console.log(data.order);
      // console.log(data.customer);

  });
  return false;
});

//jquery for updating balance and order with sell button
$(function() {
  $('a#sellBtn').bind('click', function() {
    $.getJSON('/process', function(data) { //send data back to python file
      //do nothing
    })
    .done(function(data){
        $("#balance").text("Balance: " + data.balance); //updates balance div element with the data sent from init file
        $("#order").text(data.order);
        order_ticket = data.order;
        customer_id = data.customer;
    });
    return false;
  });
});

var clearText = (e) => {
    ctx6.clearRect(0, 0, c6.clientWidth, c6.clientHeight);
};

var drawText = () => {
  var order_id = order_ticket[0];
  var tea = order_ticket[1];
  var topping1 = order_ticket[2];
  var topping2 = order_ticket[3];
  var price = order_ticket[4];

  ctx6.fillStyle = "000000";
  ctx6.font = '20px serif';
  ctx6.fillText("order #" + order_id, 850, 50);
  ctx6.font = '15px serif';
  ctx6.fillText(tea, 850, 70);
  ctx6.fillText(topping1, 850, 90);
  ctx6.fillText(topping2, 850, 110);
  ctx6.font = '20px serif';
  ctx6.fillText("Total", 850, 150);
  ctx6.fillText("$" + price, 850, 170);
}

//customer slideeeeee
var clear = (e) => {
    ctx3.clearRect(0, 0, c3.clientWidth, c3.clientHeight);
};

var dx = 0;
var dy = c3.height / 2 - (256 / 2) + 10;
xVel = 5;

var customerSlide = () => {
  //reset position
  if (dx >= c3.width / 2 - img3.width / 2) {
    dx = 0;
  }

  //setting up for animation
  window.cancelAnimationFrame(requestID);
  requestID = window.cancelAnimationFrame(requestID);
  if (customer_id === "customer0") {
    img3.src = '../static/assets/customer0.png';
  } else if (customer_id === "customer1") {
    img3.src = '../static/assets/customer1.png';
  } else {
    img3.src = '../static/assets/customer2.png';
  }
  clear();
  clearText();

  //slideeeeee
  ctx3.beginPath();
  ctx3.drawImage(img3, dx, dy);
  dx += xVel;
  if (dx <= c3.width / 2 - img3.width / 2) {
    requestID = window.requestAnimationFrame(customerSlide);
  }

  //drawing the order text after animation is done
  if (dx >= c3.width / 2 - img3.width / 2) {
    console.log(order_ticket);
    drawText();
  }

}

drinkOn.addEventListener("click", drawDrinkOn);
drinkOff.addEventListener("click", drawDrinkOff);
sellBtn.addEventListener("click", customerSlide);
