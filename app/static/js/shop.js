// HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
// SoftDev pd2
// P02: Four Toppings Boba Shop
// 2022-03-09

tea_list = ["milkTea", "greenTea", "taro", "oolongTea"]
topping_list = ["tapioca", "grassJelly", "lycheeJelly", "redBean", "milkFoam"]

var total_balance;
var total_milkTeaInven;
var total_greenTeaInven;
var total_taroTeaInven;
var total_oolongTeaInven;
var total_tapiocaInven;
var total_grassJellyInven;
var total_lycheeJellyInven;
var total_redBeanInven;
var total_milkFoamInven;

$(document).ready(function(data) {
  $.getJSON('/shop_balance', function(data) { //send data back to python file

  })
  .done(function(data){
    total_balance = data.balance;
    total_milkTeaInven = data.milkTea;
    total_greenTeaInven = data.greenTea;
    total_taroTeaInven = data.taroTea;
    total_oolongTeaInven = data.oolongTea;
    total_tapiocaInven = data.tapioca;
    total_grassJellyInven = data.grassJelly;
    total_lycheeJellyInven = data.lycheeJelly;
    total_redBeanInven = data.redBean;
    total_milkFoamInven = data.milkFoam;

  });

})


$(function() {
  $('a#milkTea').bind('click', function() {
    $.ajax({
      data : JSON.stringify({
        "item" : "milkTea"
      }),

      contentType: "application/json",
      dataType : 'application/json',
      type : 'POST',
      url : '/shop_process',

    })
    .always(function(){
      if (total_balance >= 1.0) {
        total_balance -= 1.0;
        total_milkTeaInven += 1;
      } else {
        alert("Insufficient funds");
      }
      console.log("new balance: " + total_balance);
      console.log("milk tea inventory: " + total_milkTeaInven);
      $("#balance").text("Balance: $" + (Math.round(total_balance * 100) / 100));
      $("#milkTeaInven").text(total_milkTeaInven);

    });

  });
});

//green tea
$(function() {
  $('a#greenTea').bind('click', function() {
    $.ajax({
      data : JSON.stringify({
        "item" : "greenTea",
      }),

      contentType: "application/json",
      dataType : 'application/json',
      type : 'POST',
      url : '/shop_process'

    })
    .always(function(){
      if (total_balance >= 1.0) {
        total_balance -= 1.0;
        total_greenTeaInven += 1;
      } else {
        alert("Insufficient funds");
      }
      console.log("new balance: " + total_balance);
      $("#balance").text("Balance: $" + (Math.round(total_balance * 100) / 100));
      $("#greenTeaInven").text(total_greenTeaInven);
    });
  });
});

//taro
$(function() {
  $('a#taroTea').bind('click', function() {
    $.ajax({
      data : JSON.stringify({
        "item" : "taro",
      }),

      contentType: "application/json",
      dataType : 'application/json',
      type : 'POST',
      url : '/shop_process'

    })
    .always(function(){
      if (total_balance >= 1.0) {
        total_balance -= 1.0;
        total_taroTeaInven += 1;
      } else {
        alert("Insufficient funds");
      }
      console.log("new balance: " + total_balance);
      $("#balance").text("Balance: $" + (Math.round(total_balance * 100) / 100));
      $("#taroTeaInven").text(total_taroTeaInven);
    });
    return false;
  });
});

//oolong
$(function() {
  $('a#oolongTea').bind('click', function() {
    $.ajax({
      data : JSON.stringify({
        "item" : "oolongTea",
      }),

      contentType: "application/json",
      dataType : 'application/json',
      type : 'POST',
      url : '/shop_process'

    })
    .always(function(){
      if (total_balance >= 1.0) {
        total_balance -= 1.0;
        total_oolongTeaInven += 1;
      } else {
        alert("Insufficient funds");
      }
      console.log("new balance: " + total_balance);
      $("#balance").text("Balance: $" + (Math.round(total_balance * 100) / 100));
      $("#oolongTeaInven").text(total_oolongTeaInven);
    });
    return false;
  });
});

//tapioca
$(function() {
  $('a#tapioca').bind('click', function() {
    $.ajax({
      data : JSON.stringify({
        "item" : "tapioca",
      }),

      contentType: "application/json",
      dataType : 'application/json',
      type : 'POST',
      url : '/shop_process'

    })
    .always(function(){
      if (total_balance >= 0.2) {
        total_balance -= 0.2;
        total_tapiocaInven += 1;
      } else {
        alert("Insufficient funds");
      }
      console.log("new balance: " + total_balance);
      console.log("new tapioca: " + total_tapiocaInven);
      $("#balance").text("Balance: $" + (Math.round(total_balance * 100) / 100));
      $("#tapiocaInven").text(total_tapiocaInven);

    });
    return false;
  });
});

//grass jelly
$(function() {
  $('a#grassJelly').bind('click', function() {
    $.ajax({
      data : JSON.stringify({
        "item" : "grassJelly",
      }),

      contentType: "application/json",
      dataType : 'application/json',
      type : 'POST',
      url : '/shop_process'

    })
    .always(function(){
      if (total_balance >= 0.2) {
        total_balance -= 0.2;
        total_grassJellyInven += 1;
      } else {
        alert("Insufficient funds");
      }
      console.log("new balance: " + total_balance);
      $("#balance").text("Balance: $" + (Math.round(total_balance * 100) / 100));
      $("#grassJellyInven").text(total_grassJellyInven);

    });
    return false;
  });
});

//lychee Jelly
$(function() {
  $('a#lycheeJelly').bind('click', function() {
    $.ajax({
      data : JSON.stringify({
        "item" : "lycheeJelly",
      }),

      contentType: "application/json",
      dataType : 'application/json',
      type : 'POST',
      url : '/shop_process'

    })
    .always(function(){
      if (total_balance >= 0.2) {
        total_balance -= 0.2;
        total_lycheeJellyInven += 1;
      } else {
        alert("Insufficient funds");
      }
      console.log("new balance: " + total_balance);
      $("#balance").text("Balance: $" + (Math.round(total_balance * 100) / 100));
      $("#lycheeJellyInven").text(total_lycheeJellyInven);

    });
    return false;
  });
});

//red bean
$(function() {
  $('a#redBean').bind('click', function() {
    $.ajax({
      data : JSON.stringify({
        "item" : "redBean",
      }),

      contentType: "application/json",
      dataType : 'application/json',
      type : 'POST',
      url : '/shop_process'

    })
    .always(function(){
      if (total_balance >= 0.2) {
        total_balance -= 0.2;
        total_redBeanInven += 1;
      } else {
        alert("Insufficient funds");
      }
      console.log("new balance: " + total_balance);
      $("#balance").text("Balance: $" + (Math.round(total_balance * 100) / 100));
      $("#redBeanInven").text(total_redBeanInven);

    });
    return false;
  });
});

//milk foam
$(function() {
  $('a#milkFoam').bind('click', function() {
    $.ajax({
      data : JSON.stringify({
        "item" : "milkFoam",
      }),

      contentType: "application/json",
      dataType : 'application/json',
      type : 'POST',
      url : '/shop_process'

    })
    .always(function(){
      if (total_balance >= 0.2) {
        total_balance -= 0.2;
        total_milkFoamInven += 1;
      } else {
        alert("Insufficient funds");
      }
      console.log("new balance: " + total_balance);
      $("#balance").text("Balance: $" + (Math.round(total_balance * 100) / 100));
      $("#milkFoamInven").text(total_milkFoamInven);

    });
    return false;
  });
});
