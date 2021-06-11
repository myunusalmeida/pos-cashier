var shoppingCart = (function () {
  cart = [];

  function Item(name, price, image, count) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.count = count;
  }

  function saveCart() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  //   LOAD CART
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
  }

  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  //   PUBLIC METHODS AND PROPERTIES
  var obj = {};

  //   ADD TO CART
  obj.addItemToCart = function (name, price, image, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, image, count);
    cart.push(item);
    saveCart();
  };

  //   SET COUNT FROM ITEM
  obj.setCountForItem = function (name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };

  //   REMOVE ITEM FROM CART
  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  //   REMOVE ALL ITEMS FROM CART
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  //   CLEAR CART
  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  //   TOTAL CART
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart).toFixed(3);
  };

  //   LIST CART
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(3);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };

  return obj;
})();

// TRIGGER / EVENTS

// ADD ITEM
$(".product-items").click(function (event) {
  event.preventDefault();
  var name = $(this).data("name");
  var price = $(this).data("price");
  var image = $(this).data("image");

  shoppingCart.addItemToCart(name, price, image, 1);
  displayCart();
});

// CLEAR ITEMS
$(".btn-clear").click(function () {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var cartItem = "";

  for (var i in cartArray) {
    cartItem +=
      "<div class='cart-items'>" +
      "<img src='./images/" +
      cartArray[i].image +
      "' alt='Cart Images' class='cart-image'>" +
      "<h2 class='cart-product-title'>" +
      cartArray[i].name +
      "</h2>" +
      "<div class='cart-quantity'>" +
      "<span class='quantity-button minus-item' data-name='" +
      cartArray[i].name +
      "'><i class='bx bx-minus'></i></span>" +
      "<p class='quantity-number'>" +
      cartArray[i].count +
      "</p>" +
      "<span class='quantity-button plus-item' data-name='" +
      cartArray[i].name +
      "'><i class='bx bx-plus'></i></span>" +
      "</div>" +
      "<p class='count-items'>Rp. " +
      cartArray[i].total +
      "</p>" +
      "<button class='btn-clear btn-delete' data-name='" +
      cartArray[i].name +
      "'><i class='bx bx-trash'></i></button>" +
      "</div>";
  }

  $(".cart-body").html(cartItem);
  $(".cart-total").html("Rp. " + shoppingCart.totalCart());
}

// DELETE ITEM BUTTON
$(".cart-body").on("click", ".btn-delete", function (event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

// -1
$(".cart-body").on("click", ".minus-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCart(name);
  displayCart();
});
// +1
$(".cart-body").on("click", ".plus-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.addItemToCart(name);
  displayCart();
});

displayCart();
