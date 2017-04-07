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

    var userTopping1 = $("#topping1 option:selected").val();
    var userPizzaSize = $("#size option:selected").val();

    $("#pizza-summary-topping1").text("");
    $("#pizza-summary-topping1").append(userTopping1);
    $("#pizza-summary-size").text("");
    $("#pizza-summary-size").append(userPizzaSize);
    $("#pizza-summary-area").show();
  });

});
