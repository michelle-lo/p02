// HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
// SoftDev pd2
// P02: Four Toppings Boba Shop
// 2022-03-09

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
