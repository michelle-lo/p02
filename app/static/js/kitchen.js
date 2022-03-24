// HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
// SoftDev pd2
// P02: Four Toppings Boba Shop
// 2022-03-09

//script for counter stage
// '''access canvas and buttons via DOM'''
//Different canvas layers

var c1 = document.getElementById('kitchen');
var c2 = document.getElementById('cup');
var c3 = document.getElementById('tea');
var c4 = document.getElementById('topping');

// drink variable
var drink = {"tea":null, "topp1":null, "topp2":null};
var teaSet = false;
var toppSet = 0;

// '''prepare to interact with canvas in 2D'''
// var ctx1 = c1.getContext("2d");
var ctx1 = c1.getContext("2d");
var ctx2 = c2.getContext("2d");
var ctx3 = c3.getContext("2d");
var ctx4 = c4.getContext("2d");


// // creates background images for counter on canvas
let img0 = document.createElement("img");
img0.src = '../static/assets/cup.png';

img0.addEventListener("load", () => {
  ctx2.drawImage(img0, 0, 0)
});

let img2 = document.createElement("img");
img2.src = '../static/img/kitchen_canvas.png';

img2.addEventListener("load", () => {
  ctx1.drawImage(img2, 0, 0)
});

function addTea(teatype){
  if (drink["tea"] === null){
    drink["tea"] = teatype;}
}


let img3 = document.createElement("img");
img3.src = '../static/assets/tea_milk.png';

function drawMilkTea(){
//   // img3.addEventListener("load", () => {
     ctx3.drawImage(img3, 0, 0);
     addTea("milk_tea");


}

let img4 = document.createElement("img");
img4.src = '../static/assets/tea_green.png';

function drawGreenTea(){
    ctx3.drawImage(img4, 0, 0);
    addTea("green_tea");
    // console.log(Object.values(drink));
}

let img5 = document.createElement("img");
img5.src = '../static/assets/tea_taro.png';

function drawTaroTea(){
    ctx3.drawImage(img5, 0, 0);
    addTea("taro");
}

let img6 = document.createElement("img");
img6.src =  '../static/assets/tea_oolong.png';

function drawOolongTea(){
    ctx3.drawImage(img6, 0, 0);
    addTea("oolong_tea");
}


// topping functions

function addTopp(topping){
  if (drink["topp1"] === null){
    drink["topp1"] = topping;}
  else{
    drink["topp2"] = topping;}
  }


let img7 = document.createElement("img");
img7.src = '../static/assets/topping_lychee.png'

function drawLycheeJelly(){
    ctx4.drawImage(img7, 0, 0);
    addTopp("lychee_jelly");
}

let img8 = document.createElement("img");
img8.src = '../static/assets/topping_tapioca.png'

function drawTapioca(){
    ctx4.drawImage(img8, 0, 0);
    addTopp("tapioca");
}

let img9 = document.createElement("img");
img9.src = '../static/assets/topping_redbean.png'

function drawRedBean(){
    ctx4.drawImage(img9, 0, 0);
    addTopp("red_bean");
}

let img10 = document.createElement("img");
img10.src = '../static/assets/topping_milkfoam.png'

function drawMilkFoam(){
    ctx4.drawImage(img10, 0, 0);
    addTopp("milk_foam");
}

let img11 = document.createElement("img");
img11.src = '../static/assets/topping_grassjelly.png'

function drawGrassJelly(){
    ctx4.drawImage(img11, 0, 0);
    addTopp("grass_jelly");
}

function clearDrink(){
  console.log("clearing drink");
    ctx3.clearRect(0, 0, c3.width, c3.height);
    ctx4.clearRect(0, 0, c3.width, c3.height);
    // ctx3.drawImage(img0, 0, 0)
    drink = {'tea':null, 'topp1':null, 'topp2':null};
    teaSet = false;
    toppSet = 0;
}

function saveDrink(){
  //jquery and ajax for saving drink
  // $(function() {
    // $('a#saveBtn').bind('click', function() {
      console.log(drink.topp2);
      console.log(JSON.stringify(drink));
      drink_json = JSON.stringify(drink);
      $.ajax({

        data : JSON.stringify({
          "tea" : drink.tea,
          "topp1" : drink.topp1,
          "topp2" : drink.topp2,
        }),
        contentType: "application/json",
        dataType : 'application/json',
        type : 'POST',
        url : '/save_drink'

      })
      .done(function(data){

      });
    // });
  // });
}

$(document).ready(function(data) {
  $.getJSON('/load_kit_save', function(data) { //send data back to python file
    //do nothing
  })
  .done(function(data){
    // console.log(data.tea);
    tea = data.tea;
    topp1 = data.topp1;
    topp2 = data.topp2;
    console.log(tea);
    console.log(topp1);
    console.log(topp2);

    load_save(tea, topp1, topp2);


  });
  return false;
});


var load_save = (tea, topp1, topp2) => {
  if (tea === "taro") {
    drawTaroTea();
    teaSet = true;
  } else if (tea === "milk_tea") {
    drawMilkTea();teaSet = true;
  } else if (tea === "oolong_tea") {
    drawOolongTea();teaSet = true;
  } else if (tea === "green_tea") {
    drawGreenTea();teaSet = true;
  } else {

  }
  console.log("topp1 " + topp1);
  if (topp1 === "tapioca") {
    drawTapioca();toppSet = 1;
  } else if (topp1 === "grass_jelly") {
    drawGrassJelly();toppSet = 1;
  } else if (topp1 === "lychee_jelly") {
    drawLycheeJelly();toppSet = 1;
  } else if (topp1 === "red_bean") {
    drawRedBean();toppSet = 1;
  } else if (topp1 === "milk_foam") {
    drawMilkFoam();toppSet = 1;
  } else {

  }
  console.log("topp2 " + topp2);
  if (topp2 === "tapioca") {
    drawTapioca();toppSet = 2;
  } else if (topp2 === "grass_jelly") {
    drawGrassJelly();toppSet = 2;
  } else if (topp2 === "lychee_jelly") {
    drawLycheeJelly();toppSet = 2;
  } else if (topp2 === "red_bean") {
    drawRedBean();toppSet = 2;
  } else if (topp2 === "milk_foam") {
    drawMilkFoam();toppSet = 2;
  }

}


// testing

var draw = (e) => {

  var mouseX = e.offsetX
  var mouseY = e.offsetY
  console.log("mouseclick registered at ", mouseX, mouseY);

  // TEAS

  // if tea is not set yet
  if (teaSet === false) {
    if (mouseY <= 390 && mouseY >= 350 && mouseX <= 120 && mouseX >= 40){
      drawMilkTea();
      teaSet = true;
    }
    else if (mouseY <= 390 && mouseY >= 350 && mouseX <= 215 && mouseX >= 140){
      drawGreenTea();
      teaSet = true;
    }
    else if (mouseY >= 300 && mouseY <= 340 && mouseX <= 130 && mouseX >= 50){
      drawTaroTea();
      teaSet = true;
    }
    else if (mouseY >= 300 && mouseY <= 340 && mouseX <= 225 && mouseX >= 150){
      drawOolongTea();
      teaSet = true;
    }
    // stops user trying to choose a topping before a tea (ex: milk foam floating in midair)
    else if ((mouseY <= 285 && mouseY >= 200 && mouseX <= 280 && mouseX >= 210) ||
             (mouseY <= 270 && mouseY >= 230 && mouseX <= 440 && mouseX >= 340) ||
             (mouseY <= 330 && mouseY >= 290 && mouseX <= 415 && mouseX >= 315) ||
             (mouseY <= 390 && mouseY >= 355 && mouseX <= 390 && mouseX >= 290) ||
             (mouseY <= 270 && mouseY >= 230 && mouseX <= 585 && mouseX >= 485))
      alert("You need to add a tea before adding any toppings!");

  }

  // if tea is set
  else if (teaSet === true) {
    // stops alert from showing if you click outside hitbox
    if ((mouseY <= 390 && mouseY >= 350 && mouseX <= 120 && mouseX >= 40) ||
        (mouseY <= 390 && mouseY >= 350 && mouseX <= 215 && mouseX >= 140) ||
        (mouseY >= 300 && mouseY <= 340 && mouseX <= 130 && mouseX >= 50) ||
        (mouseY >= 300 && mouseY <= 340 && mouseX <= 225 && mouseX >= 150))
    alert("You have already chosen a tea type! \nRestart your drink to choose a different tea.")

    // if only zero or one topping is set
    if (toppSet === 0 || toppSet === 1){
      if (mouseY <= 285 && mouseY >= 200 && mouseX <= 280 && mouseX >= 210){
        drawMilkFoam();
        toppSet += 1;
      }
      else if (mouseY <= 270 && mouseY >= 230 && mouseX <= 440 && mouseX >= 340){
        drawLycheeJelly();
        toppSet += 1;
      }
      else if (mouseY <= 330 && mouseY >= 290 && mouseX <= 415 && mouseX >= 315){
        drawGrassJelly();
        toppSet += 1;
      }
      else if (mouseY <= 390 && mouseY >= 355 && mouseX <= 390 && mouseX >= 290){
        drawTapioca();
        toppSet += 1;
      }
      else if (mouseY <= 270 && mouseY >= 230 && mouseX <= 585 && mouseX >= 485){
        drawRedBean();
        toppSet += 1;
      }
    }
    // stops alert from showing if you click outside hitbox
    else if (toppSet === 2){
      if ((mouseY <= 285 && mouseY >= 200 && mouseX <= 280 && mouseX >= 210) ||
          (mouseY <= 270 && mouseY >= 230 && mouseX <= 440 && mouseX >= 340) ||
          (mouseY <= 330 && mouseY >= 290 && mouseX <= 415 && mouseX >= 315) ||
          (mouseY <= 390 && mouseY >= 355 && mouseX <= 390 && mouseX >= 290) ||
          (mouseY <= 270 && mouseY >= 230 && mouseX <= 585 && mouseX >= 485))
        alert("You have already chosen two toppings! \nRestart your drink to choose a different combination of toppings.")
    }}}

    // if click on save button
    $("#topping").click(function(e){
      var mouseX = e.offsetX
      var mouseY = e.offsetY
      console.log("mouseclick registered at ", mouseX, mouseY);
    if (mouseY <= 515 && mouseY >= 470 && mouseX <= 150 && mouseX >= 20){
      // saveDrink();
      // $("#topping").click(function(e){
        // var mouseX = e.offsetX
        // var mouseY = e.offsetY
        // console.log("mouseclick registered at ", mouseX, mouseY);

        // if (mouseY <= 515 && mouseY >= 470 && mouseX <= 150 && mouseX >= 20){
          saveDrink();
          console.log("saved");
        // }
      }
    // };

    // if click on restart button
    if (mouseY <= 515 && mouseY >= 470 && mouseX <= 940 && mouseX >= 820){
      clearDrink();
      console.log("drink cleared");
    }})
  console.log(Object.values(drink));


c4.addEventListener("click", draw);
