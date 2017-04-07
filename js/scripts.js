// BACK END

function Order() {
  this.pizzaArr = [];
}

Order.prototype.totalOrderCost = function() {

  return orderCost;
}

function Pizza() {
  this.toppingsArr = [];
  this.sizeStr = "";
}

Pizza.prototype.addTopping = function(tmpTopp) {

  return 0;
}

Pizza.prototype.pizzaCost = function() {

  return pizzaCost;
}


// FRONT END
$(document).ready(function() {

  $("#pizza-form").submit(function(event) {
    event.preventDefault();
    console.log("form has been submitted");

    var userTopping1 = $("#pizza-topping1 option:selected").val();
    var userPizzaSize = $("#pizza-size option:selected").val();

    // display pizza summary
    $("#pizza-summary-topping1").text("");
    $("#pizza-summary-topping1").append(userTopping1);
    $("#pizza-summary-size").text("");
    $("#pizza-summary-size").append(userPizzaSize);
    $("#pizza-summary-area").show();

    // reset input dropdowns
    $("#pizza-topping1").prop('selectedIndex', 0);
    $("#pizza-size").prop('selectedIndex', 0);
  });

});
