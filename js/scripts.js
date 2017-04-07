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
  if (tmpTopp !== "none") {
    this.toppingsArr.push(tmpTopp);
  } else {
    console.log("wth?");
  }
  // return this.toppingsArr;
}

Pizza.prototype.pizzaCost = function() {
  return pizzaCost;
}


// FRONT END
$(document).ready(function() {

  // FORM SUBMIT EVENT
  $("#pizza-form").submit(function(event) {
    event.preventDefault();

    var userPizza = new Pizza();

    userPizza.addTopping($("#pizza-topping1 option:selected").val());
    userPizza.addTopping($("#pizza-topping2 option:selected").val());
    userPizza.addTopping($("#pizza-topping3 option:selected").val());
    userPizza.addTopping($("#pizza-topping4 option:selected").val());
    userPizza.size = $("#pizza-size option:selected").val();

    // console.log();

    // display pizza summary
    $("#pizza-summary-size").text("");
    $("#pizza-summary-size").text(userPizza.size);
    $("#pizza-summary-toppings").text("");
    $("#pizza-summary-toppings").append(userPizza.toppingsArr.toString());
    $("#pizza-summary-area").show();

    // reset input dropdowns
    $(".alloptions select").each(function() {
      $(this).prop('selectedIndex', 0);
    });

  }); //  END form submit


  // START OVER BUTTON EVENT
  $("#startover").click(function() {
    location.reload();
  });




}); // END document ready
