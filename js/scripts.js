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
  var workingPrice;
  pizzaArr.forEach(function() {

  });
  return workingPrice;
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

  var clearAllSpans = function() {
    $("#no-size").text("");
    $("#pizza-summary-size").text("");
    $("#pizza-summary-toppings").text("");
    $("#pizza-summary-price").text("");
  };

  var clearAllSelects = function() {
    $(".alloptions select").each(function() {
      $(this).prop('selectedIndex', 0);
    });
  };

  // create new order object
  var userOrder = new Order();

  // FORM SUBMIT BUTTON
  $("#pizza-form").submit(function(event) {
    event.preventDefault();

    // create new pizza object
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

    // check for no size selected before revealing output area
    if ($("#pizza-size option:selected").val() === "none") {
        $("#no-size").append(" ** Please select a pizza size. **");
        // delete current working pizza
        userPizza = null;
    } else {
      userOrder.addPizzaToOrder(userPizza);
      // add pizza link to list area below buttons
      $("ul#pizza-list").append("<li value='" + userOrder.pizzaArr.length + "' class='pizza-li'><span>" + "Pizza " + userOrder.pizzaArr.length + "</span></li>");
      $("#pizza-list-area").show();
      clearAllSelects();
    }

    $("li").last().click(function() {
      $("#summary2").show();
      // update output fields
      clearAllSpans();
      $("#pizza-summary-size").text(userPizza.size);
      $("#pizza-summary-toppings").append(userPizza.toppingsArr.toString());
      $("#pizza-summary-price").append("$" + userPizza.calcPizzaPrice());
      $("#summary2 #pizza-num").text($(this).val());
      console.log("this li val: " , $(this).val());
      console.log("userOrder.pizzaArr.length : " , userOrder.pizzaArr.length);
    });

  }); //  END form submit

  // START OVER BUTTON
  $("#startover").click(function() {
    location.reload();
  });

}); // END document ready
