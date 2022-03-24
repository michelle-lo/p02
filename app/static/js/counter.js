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

img4.addEventListener("load", () => {
  ctx4.drawImage(img4, 0, 0)
});

let img3 = document.createElement("img");

//ticket
let img5 = document.createElement("img");
img5.src = '../static/img/ticket.png';

//loading teas
let img6 = document.createElement("img");

let img10 = document.createElement("img");

let img11 = document.createElement("img");


img5.addEventListener("load", () => {
  ctx5.drawImage(img5, 0, 0)
});


// 256 is the height of image 3

var drawCustomer = () => {
  img3.addEventListener("load", () => {
    ctx3.drawImage(img3, c3.width / 2 - img3.width / 2, c3.height / 2 - (256 / 2) + 10)
  });
}

var drawTea = () => {
  img6.addEventListener("load", () => {
    ctx2.drawImage(img6, 0, 0);
  });
}

var drawTopp1 = () => {
  img10.addEventListener("load", () => {
    console.log()
    ctx2.drawImage(img10, 0, 0);
  });
}

var drawTopp2 = () => {
  img11.addEventListener("load", () => {
    ctx2.drawImage(img11, 0, 0);
  });
}

var order_ticket;
var customer_id;
//jquery for updating balance and order with sell button
$(document).ready(function(data) {
  $.getJSON('/counter_load', function(data) { //send data back to python file
    //do nothing
  })
  .done(function(data){
      order_ticket = data.order;
      customer_id = data.customer;

      saved_tea = data.savedTea;
      console.log(saved_tea);
      saved_topp1 = data.savedTopp1;
      console.log(saved_topp1);
      saved_topp2 = data.savedTopp2;
      console.log(saved_topp2);

      if (customer_id === "customer0") {
        img3.src = img3.src = '../static/assets/customer0.png';
      } else if (customer_id === "customer1"){
        img3.src = img3.src = '../static/assets/customer1.png';
      } else {
        img3.src = img3.src = '../static/assets/customer2.png';
      }
//tea
      if (saved_tea === "milk_tea"){
        img6.src = img6.src = '../static/assets/tea_milk.png';
      } else if (saved_tea === "green_tea") {
        img6.src = img6.src = '../static/assets/tea_green.png';
      } else if (saved_tea === "taro") {
        img6.src = img6.src = '../static/assets/tea_taro.png';
      } else if (saved_tea === "oolong_tea") {
        img6.src = img6.src = '../static/assets/tea_oolong.png';
      } else {
        ctx2.clearRect(0, 0, c2.width, c2.height);
        ctx2.drawImage(img0, 0, 0);
      }
//topp1
      if (saved_topp1 === "lychee_jelly"){
        img10.src = img10.src = '../static/assets/topping_lychee.png';
      } else if (saved_topp1 === "tapioca"){
        img10.src = img10.src = '../static/assets/topping_tapioca.png';
      } else if (saved_topp1 === "red_bean"){
        img10.src = img10.src = '../static/assets/topping_redbean.png';
      } else if (saved_topp1 === "milk_foam"){
        img10.src = img10.src = '../static/assets/topping_milkfoam.png';
      } else if (saved_topp1 === "grass_jelly"){
        img10.src = img10.src = '../static/assets/topping_grassjelly.png';
      }
//topp2
      if (saved_topp2 === "lychee_jelly"){
        img11.src = img11.src = '../static/assets/topping_lychee.png';
        toppSet = 2;
      } else if (saved_topp2 === "tapioca"){
        img11.src = img11.src = '../static/assets/topping_tapioca.png';
        toppSet = 2;
      } else if (saved_topp2 === "red_bean"){
        img11.src = img11.src = '../static/assets/topping_redbean.png';
        toppSet = 2;
      } else if (saved_topp2 === "milk_foam"){
        img11.src = img11.src = '../static/assets/topping_milkfoam.png';
        toppSet = 2;
      } else if (saved_topp1 === "grass_jelly") {
        img11.src = img11.src = '../static/assets/topping_grassjelly.png';
        toppSet = 2;
      }



      clear();
      drawTea();
      drawTopp1();
      drawTopp2();
      drawCustomer();
      drawText();


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
        $("#balance").text("Balance: $" + data.balance); //updates balance div element with the data sent from init file
        order_ticket = data.order;
        customer_id = data.customer;
        status = data.completed;
    // });
    if (status === "true"){
      ctx2.clearRect(0, 0, c2.clientWidth, c2.clientHeight);
      ctx2.drawImage(img0, 0, 0);}
  });
});})

var clearText = (e) => {
    ctx6.clearRect(0, 0, c6.clientWidth, c6.clientHeight);
};

var drawText = () => {
  var order_id = order_ticket[0];
  var tea = ""
  for (let i = 0; i < order_ticket[1].length; i++) {
    if (order_ticket[1].charAt(i) == '_') {
      tea += " ";
    } else {
      tea += order_ticket[1].charAt(i);
    }
  }
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

// drinkOn.addEventListener("click", drawDrinkOn);
// drinkOff.addEventListener("click", drawDrinkOff);
sellBtn.addEventListener("click", customerSlide);
