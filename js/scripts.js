//------------
// BACK END
//------------

function Order() {
  this.pizzaArr = [];
  this.price = 0;
}

Order.prototype.addPizzaToOrder = function(tmpPizza) {
  this.pizzaArr.push(tmpPizza);
}

Order.prototype.calcOrderPrice = function() {
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

  // create new order
  var userOrder = new Order();


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

    // update output fields
    $("#no-size").text("");
    $("#pizza-summary-size").text("");
    $("#pizza-summary-size").text(userPizza.size);
    $("#pizza-summary-toppings").text("");
    $("#pizza-summary-toppings").append(userPizza.toppingsArr.toString());
    $("#pizza-summary-price").text("");
    $("#pizza-summary-price").append("$" + userPizza.calcPizzaPrice());

    // check for no size selected before revealing output area
    if ($("#pizza-size option:selected").val() === "none") {
        $("#no-size").append(" ** Please select a pizza size. **");
        // delete current working pizza
        userPizza = null;
    } else {
      // add pizza to order
      userOrder.addPizzaToOrder(userPizza);
      // display pizza summary
      // add pizza link to list area below buttons
      $("ul#pizza-list").append("<li class='pizza-li'><span>" + "Pizza " + userOrder.pizzaArr.length + "</span></li>");
      $("#pizza-list-area").show();
      // reset all input dropdowns
      $(".alloptions select").each(function() {
        $(this).prop('selectedIndex', 0);
      });
    }

    $("li").last().click(function() {
      $("#summary2").show();
    });

  }); //  END form submit

  // START OVER BUTTON
  $("#startover").click(function() {
    location.reload();
  });


}); // END document ready
