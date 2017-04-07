//------------
// BACK END
//------------

function Order() {
  this.pizzaArr = [];
  this.totalPrice = 0;
}

Order.prototype.orderPrice = function() {
  return orderCost;
}

function Pizza() {
  this.toppingsArr = [];
  this.optionValuesArr = [];
  this.sizeStr = "";
  this.price = 0;
}

Pizza.prototype.saveToppingName = function(toppName) {
  if (toppName !== "select") {
    this.toppingsArr.push(toppName);
  } else {
  }
}

Pizza.prototype.saveOptionValues = function(toppVal) {
  this.optionValuesArr.push(toppVal);
}

// saves pizza price to pizza object, and returns price as number
Pizza.prototype.calcPizzaPrice = function() {
  var workingPrice = 0.00;
  this.optionValuesArr.forEach(function(index) {
    workingPrice += parseFloat(pizzaItemPriceList[index]);
    console.log("item price : " , parseFloat(pizzaItemPriceList[index]));
  });
  this.price = workingPrice.toFixed(2);
  return this.price;
}

// define the prices for each pizza option
const pizzaItemPriceList = {
  0: 0.00, 1: 1.00, 2: 1.25,
  3: 1.50, 4: 0.75, 5: 0.75,
  6: 1.25, none: 0.00, S: 8.25,
  M: 10.50, L: 14.75, XL: 18.50
}

//-------------
// FRONT END
//--------------
$(document).ready(function() {

  // FORM SUBMIT BUTTON
  $("#pizza-form").submit(function(event) {
    event.preventDefault();

    var userPizza = new Pizza();

    // save pizza toppings to pizza
    $(".options1 select option:selected").each(function() {
      userPizza.saveToppingName($(this).text());
    });
    // save size to pizza
    userPizza.size = $("#pizza-size option:selected").text();

    // save pizza options values to pizza
    $(".alloptions select option:selected").each(function() {
      userPizza.saveOptionValues($(this).val());
    });

    // display pizza summary
    $("#pizza-summary-size").text("");
    $("#pizza-summary-size").text(userPizza.size);
    $("#pizza-summary-toppings").text("");
    $("#pizza-summary-toppings").append(userPizza.toppingsArr.toString());
    $("#pizza-summary-price").append("$" + userPizza.calcPizzaPrice());
    $("#pizza-summary-area").show();

    // reset all input dropdowns
    $(".alloptions select").each(function() {
      $(this).prop('selectedIndex', 0);
    });
  }); //  END form submit

  // START OVER BUTTON
  $("#startover").click(function() {
    location.reload();
  });

}); // END document ready
