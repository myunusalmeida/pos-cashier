function searchProducts() {
  var input, filter, products, product, productName, i, value;

  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  products = document.getElementsByClassName("products");
  product = document.getElementsByClassName("product-items");

  for (i = 0; i < product.length; i++) {
    productName = product[i].getElementsByClassName("product-title")[0];
    value = productName.textContent || productName.innerText;

    if (value.toUpperCase().indexOf(filter) > -1) {
      product[i].style.display = "";
    } else {
      product[i].style.display = "none";
    }
  }
}
