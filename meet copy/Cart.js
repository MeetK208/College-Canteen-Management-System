/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 0.00; 
var fadeTime = 300;
var total_products = 0;

const prod1 = document.getElementById('prod1');
const prod2 = document.getElementById('prod2');
const prod3 = document.getElementById('prod3');
const prod4 = document.getElementById('prod4');
const prod5 = document.getElementById('prod5');
const prod6 = document.getElementById('prod6');
const prod7 = document.getElementById('prod7');
const prod8 = document.getElementById('prod8');

console.log(prod1.value);
console.log(prod2.value);
console.log(prod3.value);
console.log(prod4.value);
console.log(prod5.value);
console.log(prod6.value);
console.log(prod7.value);
console.log(prod8.value);


/* Assign actions */
$('.product-quantity input').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });
  
  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });


  var total_products = Number(prod1.value) + Number(prod2.value) + Number(prod3.value) + Number(prod4.value) + Number(prod5.value) + Number(prod6.value) + Number(prod7.value) + Number(prod8.value);
  console.log(total_products);


  var obj = { "Total": total,"products": total_products };
  localStorage.setItem('myStorage', JSON.stringify(obj));
  fun();

}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  
  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}