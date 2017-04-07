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
  this.toppingsArr.push(tmpTopp);
  return ;
}

Pizza.prototype.pizzaCost = function() {
  return pizzaCost;
}


// FRONT END
$(document).ready(function() {


  $("#pizza-form").submit(function(event) {
    event.preventDefault();

    var userPizza = new Pizza();

    userPizza.addTopping($("#pizza-topping1 option:selected").val());
    userPizza.size = $("#pizza-size option:selected").val();

    // console.log();

    // display pizza summary
    $("#pizza-summary-topping1").text("");
    $("#pizza-summary-topping1").append(userPizza.toppingsArr);
    $("#pizza-summary-size").text("");
    $("#pizza-summary-size").append(userPizza.size);
    $("#pizza-summary-area").show();

    // reset input dropdowns
    $("#pizza-topping1").prop('selectedIndex', 0);
    $("#pizza-size").prop('selectedIndex', 0);
  });

});
