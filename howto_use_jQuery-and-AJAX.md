# how-to :: use jQuery and AJAX
---
## Overview
jQuery is a JavaScript library that handles a bunch of cool events for HTML
elements without having to refresh the page. This library is especially useful
for sending data to a server or JSON file and processing it through JavaScript
to constantly save and update the current page with variables listed in the JSON
file. jQuery functions can be placed within and outside of JavaScript functions
to utilize when each action should happen.

AJAX is another JavaScript library that allows you to asynchronously update pages without having to reload the page. It will allow you to send data to a web server to be used in your python files as well as receive data from the web server.

The below tutorial demonstrates a basic program in which, upon clicking a button, the javascipt will receive a JSON object from the provided flask url.

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

3. Lets say you want to send data back to the python file to save into a database or edit an HTML element. We'll use JSON to pass variables to and from our python file
```
$.getJSON('/process', function(data)) {})
```
`'/process'` references to the Flask app route you route to that has all your python functions (our '/process' pushes the current order and creates a new order for the user to fulfill)

4. After '/process' finishes changing the variables you needed to change on-screen, you need to tell jQuery to run the actual updating when it's done using .done.
```
.done(function(data){
    $("#balance").text("Balance: " + data.balance); //updates balance div element with the data sent from init file
    $("#order").text(data.order);
    order_ticket = data.order;
    customer_id = data.customer;
});
```
In `data.[variable]`, the variable is referenced in the JSON file that is created when '/process' is run from `__init__.py`.

5. Close all your statements with correct `;` after each complete line

6. The end result should be:
```
$(function() {
  $('a#sellBtn').bind('click', function() {
    $.getJSON('/process', function(data) {})
    .done(function(data){
        $("#balance").text("Balance: " + data.balance);
        $("#order").text(data.order);
        order_ticket = data.order;
        customer_id = data.customer;
    });
  });
});
```

### Resources
* https://jquery.com/
* https://api.jquery.com/jquery.ajax/
* https://api.jquery.com/category/selectors/
* https://api.jquery.com/category/events/event-object/

---

Accurate as of (last update): 2022-03-23

#### Contributors:
Annabel Zhang, pd2  
Michelle Lo, pd2
