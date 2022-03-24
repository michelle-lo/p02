// HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
// SoftDev pd2
// P02: Four Toppings Boba Shop
// 2022-03-09

tea_list = ["milkTea", "greenTea", "taro", "oolongTea"]
topping_list = ["tapioca", "grassJelly", "lycheeJelly", "redBean", "milkFoam"]

//milk tea

$(function() {
  $('a#milkTea').bind('click', function() {
    $.ajax({
      data : JSON.stringify({
        "item" : "milkTea",
      }),

      contentType: "application/json",
      dataType : 'application/json',
      type : 'POST',
      url : '/shop_process'

    })
    return false;
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
    return false;
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
    return false;
  });
});
