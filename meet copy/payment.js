// function update_hello(total_final) {
//     console.log(total_final);
//     // console.log(price_change);
// }

var total = 0;
var products = 0;
const fun = ()=>{
    var obj = JSON.parse(localStorage.getItem('myStorage'));
    total = obj.Total;
    products = obj.products;
    console.log(obj.Total);
    // console.log(obj.products)
}

fun();
const price_change = document.getElementById('total_final');
price_change.innerText = '$' + total;

const products_number = document.getElementById('total_products');
products_number.innerText = products;