filterSelection("all");

function filterSelection(choice) {
  var product, i;
  product = document.getElementsByClassName("product-items");
  if (choice == "all") choice = "";
  for (i = 0; i < product.length; i++) {
    productRemoveClass(product[i], "show");
    if (product[i].className.indexOf(choice) > -1)
      productAddClass(product[i], "show");
  }
}

function productAddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function productRemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i], 1));
    }
  }
  element.className = arr1.join(" ");
}

var category = document.getElementsByClassName("category-item");

for (var i = 0; i < category.length; i++) {
  category[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
