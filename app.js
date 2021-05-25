const preWorkoutPrice = 10;
const taxRate = 0.08;
var date = new Date();
var today = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
var quantity = [10, 50, 100, 200, 500, 1000];
var discountPercent = [.05, .07, .1, .12, .15, .2];
var percentArrayLength = discountPercent.length;
var numQuantity = quantity.length;
var discountAmount,
    discountFound,
    discountApplied,
    normalPricing,
    discountPricing,
    strDiscountPricing,
    shippingValue;



/*Makes shipping selection from radio buttons*/
function getRadioSelection() {
    var selection = document.getElementsByTagName('input');
    shippingValue = document.getElementsByName(shippingValue).value;
    for (i = 0; i < selection.length; i++) {
        if (selection[i].checked) {
            shippingValue = selection[i].value;
        }
    }
}

/*Toggle discount pricing table*/
var x = document.getElementById('qtyPricing');
x.style.display = "none";

function toggleDiscountTable() {

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

/* Calculates discount pricing based on quantity ordered by user*/
function calculateDiscount() {
    let i = 0;
    let found = false;
    while (i < numQuantity && !found) {
        if (prodQuantity < quantity[0]) {
            discountApplied = 0;
            found = true;
        } else if (prodQuantity >= quantity[i] && prodQuantity < quantity[i + 1]) {
            discountFound = discountPercent[i];
            discountApplied = discountFound * 100;
            found = true;
        } else if (prodQuantity >= quantity[5]) {
            discountFound = discountPercent[5];
            discountApplied = discountFound * 100;
            found = true;
        } else {
            i++;
        }
    }
    if (prodQuantity >= 10) {
        normalPricing = preWorkoutPrice * prodQuantity;
        discountAmount = discountFound * normalPricing;
        discountPricing = normalPricing - discountAmount;
    } else {
        discountPricing = preWorkoutPrice * prodQuantity;
    }
}

/*-------------- Renders receipt ----------------*/
function processOrder() {
    txtName = document.getElementById('txtName').value;
    prodQuantity = document.getElementById('prodQuantity').value;

    calculateDiscount();
    getRadioSelection();

    var preworkoutTotal = preWorkoutPrice * prodQuantity;
    var subtotal = discountPricing;
    var tax = subtotal * taxRate;
    var balance = tax + subtotal;


    if (discountApplied > 0) {
        document.getElementById('requiredMsg').innerHTML = '';
        document.getElementById('receipt').innerHTML = txtName + ', thank you for your order of ' + prodQuantity + ' pre workouts!' + "<br/>" + prodQuantity + ' pre workouts - $' + preWorkoutPrice.toFixed(2) + ' each = $' + preworkoutTotal.toFixed(2) + "<br/>" + 'Subtotal: $' + subtotal.toFixed(2) + '**quantity discount ' + discountApplied.toFixed(0) + '% applied**' + "<br/>" + 'Tax: $' + tax.toFixed(2) + "<br/>" + 'Shipping Fee: $' + shippingValue + "<br/>" + 'Total Balance: $' + balance.toFixed(2) + ' + shipping' + "<br/>" + today;
    } else {
        document.getElementById('requiredMsg').innerHTML = '';
        document.getElementById('receipt').innerHTML = txtName + ', thank you for your order of ' + prodQuantity + ' pre workouts!' + "<br/>" + prodQuantity + ' pre workouts - $' + preWorkoutPrice.toFixed(2) + ' each = $' + discountPricing.toFixed(2) + "<br/>" + 'Subtotal: $' + subtotal.toFixed(2) + "<br/>" + 'Tax: $' + tax.toFixed(2) + "<br/>" + 'Shipping Fee: $' + shippingValue + "<br/>" + 'Total Balance: $' + balance.toFixed(2) + ' + shipping' + "<br/>" + today;
    }

    /*----------Input validation---------*/
    let textboxes = document.getElementsByClassName('required');
    let totalQuantity = 0;
    for (let i = 0; i < textboxes.length; i++) {
        let quantity = parseInt(textboxes[i].value);
        if (quantity >= 0) {
            totalQuantity += quantity;
        } else if (textboxes[i].value < 0 || textboxes[i].value == "" || textboxes[i].value == "REQUIRED!") {
            document.getElementById('requiredMsg').innerHTML = "* indicates a required field";
            document.getElementById('receipt').innerHTML = "<span style='color: red;'>Order could not be processed due to missing information. Please fill out all required fields.</span>";
            document
            textboxes[i].value = 'REQUIRED!';
            textboxes[i].select();
        }
    }
}

document.getElementById("btnProcess").addEventListener("click", processOrder);
document.getElementById("discountPricingTable").addEventListener("click", toggleDiscountTable);