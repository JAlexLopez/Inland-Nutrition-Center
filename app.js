const preWorkoutPrice = 10;
const proteinPrice = 45.50;
const taxRate = 0.08;

var date = new Date();

var today = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();

var shippingValue;

var quantity = [10, 50, 100, 200, 500, 1000];

var discountPercent = [.05, .07, .1, .12, .15, .2];

var percentArrayLength = discountPercent.length;

var numQuantity = quantity.length;

var discountAmount,
    discountFound,
    discountApplied,
    normalPricing,
    discountPricing,
    strDiscountPricing;

/* Makes shipping selection from radio buttons*/
function getRadioSelection() {

    var selection = document.getElementsByTagName('input');
    for (i = 0; i < selection.length; i++) {
        if (selection[i].checked) {
            shippingValue = selection[i].value;
        }
    }
}

/* Calculates discount pricing based on quantity ordered by user*/
function calculateDiscount() {
    let i = 0;
    let found = false;

    while (i < numQuantity && !found) {
        if (txtQ1 < quantity[0]) {
            discountApplied = 0;
            found = true;
        } else if (txtQ1 >= quantity[i] && txtQ1 < quantity[i + 1]) {
            discountFound = discountPercent[i];
            discountApplied = discountFound * 100;
            found = true;
        } else if (txtQ1 >= quantity[5]) {
            discountFound = discountPercent[5];
            discountApplied = discountFound * 100;
            found = true;
        } else {
            i++;
        }
    }
    if (txtQ1 >= 10) {
        normalPricing = preWorkoutPrice * txtQ1;
        discountAmount = discountFound * normalPricing;
        discountPricing = normalPricing - discountAmount;
    } else {
        discountPricing = preWorkoutPrice * txtQ1;
    }


}

/*-------------- Renders receipt ----------------*/

function processOrder() {



    txtName = document.getElementById('txtName').value;
    txtQ1 = document.getElementById('txtQ1').value;
    txtQ2 = document.getElementById('txtQ2').value;

    var preworkoutTotal = preWorkoutPrice * txtQ1;
    var proteinTotal = proteinPrice * txtQ2;
    var subtotal = preworkoutTotal + proteinTotal;
    var tax = subtotal * taxRate;
    var balance = tax + subtotal;

    calculateDiscount();
    getRadioSelection();
    if (discountApplied > 0) {
        document.getElementById('requiredMsg').innerHTML = '';
        document.getElementById('receipt').innerHTML = txtName + ', thank you for your order of ' + txtQ1 + ' pre workouts and ' + txtQ2 + ' protein tubs!' + "<br/>" + txtQ1 + ' pre workouts @' + preWorkoutPrice.toFixed(2) + ' each = $' + discountPricing.toFixed(2) + '**quantity discount ' + discountApplied.toFixed(0) + '% applied**' + "<br/>" + txtQ2 + ' protein tubs @' + proteinPrice.toFixed(2) + ' each = $' + (proteinTotal.toFixed(2)) + "<br/>" + 'Subtotal: $' + subtotal.toFixed(2) + "<br/>" + 'Tax: $' + tax.toFixed(2) + "<br/>" + 'Shipping Fee: $' + shippingValue + "<br/>" + 'Total Balance: $' + balance.toFixed(2) + "<br/>" + today;
    } else {
        document.getElementById('requiredMsg').innerHTML = '';
        document.getElementById('receipt').innerHTML = txtName + ', thank you for your order of ' + txtQ1 + ' pre workouts and ' + txtQ2 + ' protein tubs!' + "<br/>" + txtQ1 + ' pre workouts @' + preWorkoutPrice.toFixed(2) + ' each = $' + discountPricing.toFixed(2) + "<br/>" + txtQ2 + ' protein tubs @' + proteinPrice.toFixed(2) + ' each = $' + (proteinTotal.toFixed(2)) + "<br/>" + 'Subtotal: $' + subtotal.toFixed(2) + "<br/>" + 'Tax: $' + tax.toFixed(2) + "<br/>" + 'Shipping Fee: $' + shippingValue + "<br/>" + 'Total Balance: $' + balance.toFixed(2);
    }

    /*----------Input validation---------*/
    let textboxes = document.getElementsByClassName('required');
    let totQuantity = 0;
    let i;
    for (i = 0; i < textboxes.length; i++) {

        let quantity = parseInt(textboxes[i].value);

        if (quantity >= 0) {

            totQuantity += quantity;
        } else if (textboxes[i].value < 0 || textboxes[i].value == "" || textboxes[i].value == "REQUIRED!") {
            document.getElementById('requiredMsg').innerHTML = "* indicates a required field";
            document.getElementById('receipt').innerHTML = "<span style='color: red;'>Order could not be processed due to missing information. Please fill out all required fields.</span>";
            document
            textboxes[i].value = 'REQUIRED!';
            textboxes[i].select();

        }



    }

}



/*------------- Discount Pricing Table -------------*/
function qtyPricingTable() {

    var heading = document.getElementById('heading').innerHTML = "Quantity Discount Pricing on Pre Workouts";

    var strPricingTable = "<table><tr><th>Quantity</th><th>Normal Pricing</th><th>Discount Pricing</th></tr>";

    for (var i = 0; i < numQuantity; i++) {

        normalPricing = quantity[i] * preWorkoutPrice;

        discountAmount = normalPricing * discountPercent[i];

        discountPricing = normalPricing - discountAmount;

        strDiscountPricing = "$" + discountPricing;

        strPricingTable += '<tr><td>' + quantity[i] + '</td><td>' + '$' + normalPricing + '</td><td>' + strDiscountPricing + '</td></tr>';

    }

    strPricingTable += '</table>';

    document.getElementById('displayQtyPricingTable').innerHTML = strPricingTable;

    return;
}

document.getElementById("btnProcess").addEventListener("click", processOrder);
document.getElementById("qtyPricing").addEventListener("click", qtyPricingTable);