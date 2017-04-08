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
  var workingPrice = 0.00;
  this.pizzaArr.forEach(function(tmpPizza) {
    workingPrice += parseFloat(tmpPizza.price);
  });
  return workingPrice.toFixed(2);
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
    $("#pizza-summary-size").text("");
    $("#pizza-summary-toppings").text("");
    $("#pizza-summary-price").text("");
    $("#pizza-total").text("");
    $("#price-total").text("");
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

    $("#no-size").text("");

    // create new pizza object
    var userPizza = new Pizza();

    // save pizza toppings to pizza, size to pizza
    $(".options1 select option:selected").each(function() {
      userPizza.saveToppingName($(this).text());
    });
    userPizza.size = $("#pizza-size option:selected").text();

    // save pizza options values to pizza
    $(".alloptions select option:selected").each(function() {
      userPizza.saveOptionValues($(this).val());
    });

    // stop all processes if a pizza size has been selected!!
    if ($("#pizza-size option:selected").val() === "none") {
        $("#no-size").append(" ** Please select a pizza size. **");
        userPizza = null;  // delete current working pizza
    } else {
      userOrder.addPizzaToOrder(userPizza);
      $("#summary3").hide();
      // add pizza link to list area below buttons
      $("ul#pizza-list").append("<li value='" + userOrder.pizzaArr.length + "' class='pizza-li'><span>" + "Pizza " + userOrder.pizzaArr.length + "</span></li>");
      $("#pizza-list-area").show();
      clearAllSelects();
      // li click event must be here to safeguard against the function attaching to the wrong li
      $("li").last().click(function() {
        $("#summary2").show();
        // update output fields
        clearAllSpans();
        $("#pizza-summary-size").text(userPizza.size);
        $("#pizza-summary-toppings").append(userPizza.toppingsArr.toString());
        $("#pizza-summary-price").append("$" + userPizza.calcPizzaPrice());
        $("#summary2 #pizza-num").text($(this).val());
      });
    }
  }); //  END form submit

  // SUBMIT ORDER BUTTON
  $("#submit-order").click(function() {
    $("#pizza-total").text(userOrder.pizzaArr.length);
    // console.log("userOrder.calcOrderPrice()" ,userOrder.calcOrderPrice() );
    $("#price-total").append("$" , userOrder.calcOrderPrice());
    $("#summary3").show();
  });

  // START OVER BUTTON
  $("#start-over").click(function() {
    location.reload();
  });

}); // END document ready
