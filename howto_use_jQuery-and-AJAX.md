# how-to :: use jQuery and AJAX
---
## Overview
jQuery is a JavaScript library that handles a bunch of cool events for HTML
elements without having to refresh the page. This library is especially useful
for sending data to a server or JSON file and processing it through JavaScript
to constantly save and update the current page. jQuery functions can be
placed within and outside of JavaScript functions to utilize when each action
should happen.

### Estimated Time Cost: 20 minutes

### Prerequisites:

- Have a JavaScript file linked to a corresponding HTML file
- Reference the jQuery library in your HTML file
  - To reference a downloaded jQuery library (download [here](https://jquery.com/download/)):
  ```
  <head>
  <script src="jquery-3.6.0.min.js"></script>
  </head>
  ```
  - To reference it as a CDN in your HTML file (no download needed):
  ```
  <head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  </head>
  ```
- Open all the Resources links below to make sure you understand jQuery syntax as you go through our how-to

1. Initiate your jQuery function with
```
$(function() {
```

2. Start by telling your function what HTML element to select and what action to take
```
$('a#sellBtn').bind('click', function() {
```
The `#` indicates that you are referring to an element with an id (in this case, id="sellBtn").
`'click'` indicates the action you want that element to react on (in this case, clicking on the element).

3.


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



### Resources
* https://jquery.com/
* https://api.jquery.com/jquery.ajax/
* https://api.jquery.com/category/selectors/
* https://api.jquery.com/category/events/event-object/

---

Accurate as of (last update): 2022-03-23

#### Contributors:
Annabel Zhang, pd2
