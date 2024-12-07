const checkoutItemsElem = document.getElementById("checkout-items");
let userEmail = localStorage.getItem("loggedIn");
let deliveryVisible = false;
let paymentVisible = true;

if (!userEmail)
{ 
    window.location.href = "login.html";
}

// Remove items that have no quantity
for (let i = 0; i < cart.length; i++)
{
    if (cart[i].quantity === 0)
    {
        cart.splice(i, 1);
        i--;
    }
}
// Update local storage after removing the items
localStorage.setItem("inCart", JSON.stringify(cart));

const checkoutInfoElem = document.getElementsByClassName("checkout-info")[0];
const checkoutInfoInputs = checkoutInfoElem.getElementsByTagName("input");
const checkoutError = document.getElementsByClassName("checkout-error")[0]

addItemsToCheckout(cart);
updateCosts("checkout");
autoFillDetails();


// for (let elem of checkoutInfoInputs)
// {
//     elem.addEventListener("change", () => {
//         let inputted = true;

//         for (let elem of checkoutInfoInputs)
//         {
            
//         }
//     })
// }


function autoFillDetails()
{
    for (let elem of checkoutInfoInputs)
    {
        if (userData[elem.id])   
        {
            elem.value = userData[elem.id];
        }
    }
}

function addItemsToCheckout(cartObj) 
{
    for (let item of cartObj)
    {
        checkoutItemsElem.innerHTML += genCheckoutItems(item);
    }
}

function genCheckoutItems(itemObj) 
{
    return `
        <li>
            <div class="checkout-img-div flex">
                <img src="${itemObj.img}" class="checkout-item-img">
            </div>
            <div class="flex column">
                <p class="checkout-name">${itemObj.name}</p>
            </div>
            <div class="checkout-quantity-div flex column">
                <p class="checkout-price">Price: $${itemObj.price}</p>
                <p class="checkout-quantity">Quantity: ${itemObj.quantity}</p>
            </div>
        </li>
    `;
}

function deliveryVisibility(data)
{
    const deliveryDiv = document.getElementsByClassName("checkout-delivery-hide")[0];

    deliveryDiv.style.display = data.checked ? "" : "none";
    deliveryVisible = data.checked;
    updateCosts("checkout");
}

function paymentVisibility(data)
{
    const deliveryDiv = document.getElementsByClassName("checkout-payment-hide")[0];

    deliveryDiv.style.display = !data.checked ? "" : "none";
    paymentVisible = !data.checked;
    updateCosts("checkout");
}

function isValidNum(num) { return !isNaN(num) && Number.isInteger(Number(num)) }

function placeOrder() 
{
    let valid = true;
    let showError = (input) => { 
        let errorElem = input.parentNode.getElementsByClassName("error-message")[0];
        console.log("this is the error", input);
        valid = false;
        if (errorElem)
            errorElem.style.display = "block";
    }
    let hideError = (input) => {
        let errorElem = input.parentNode.getElementsByClassName("error-message")[0];
        if (errorElem)
            errorElem.style.display = "none";
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    let yearElem = document.getElementById("year");
    let expirationYear = Number(yearElem.value);
    let expirationMonth = Number(document.getElementById("month").value);

   
    for (let input of checkoutInfoInputs)
    {
        if (input.hasAttribute("required") && input.value === "")
        {
            if ( !((input.classList.contains("delivery") && !deliveryVisible) ||
                   (input.classList.contains("payment") && !paymentVisible)) )
                showError(input);
        }
        else
            hideError(input);
        // check for specific inputs to find if they are valid
        if (input.id === "card-number")
            if (paymentVisible && ( input.value.length < 13 || 19 < input.value.length || !isValidNum(input.value)) )
                showError(input);
            else
                hideError(input);

        if (input.id === "cvc")
            if (paymentVisible && ( input.value.length !== 3 || !isValidNum(input.value)) )
                showError(input);
            else
                hideError(input);

        if (input.id === "zip-code")
            if (paymentVisible && (input.value.length < 5 || 9 < input.value.length || !isValidNum(input.value))
            )
                showError(input);
            else
                hideError(input);
        if (input.id === "zipCode")
            if (deliveryVisible && (input.value.length < 5 || 9 < input.value.length || !isValidNum(input.value))
            )
                showError(input);
            else
                hideError(input);
    }

    // Check expiration date
    if (paymentVisible && ( expirationYear < currentYear || 
        (expirationYear === currentYear && expirationMonth <= currentMonth) )
    )
    {
        showError(yearElem);
    }
    else
    {
        hideError(yearElem);
    }


    if (valid)
    {
        const totalLoc = document.getElementById('checkout-total');
        const total = totalLoc.innerText;
        calculatePoints(total);
        checkoutError.style.display = "";
        localStorage.removeItem("inCart");
        displayreceipt();
    }
    else
    {
        checkoutError.style.display = "block";
    }
}

function displayreceipt() 
{
    let popupElemExist = document.getElementsByClassName("popup-home");
    let popupElem = document.createElement("div");

    if (popupElemExist.length >= 1)
        return;

    popupElem.classList = "popup-home flex";

    let receiptStr = "";
    let receiptPopup = () => { return `
        <div class="popup-home flex">
            <div class="popup-box flex">
                <h3 class="checkout-popup-h">Order Placed. Here is your receipt:</h3>
                <div class="receipt-container flex column">
                    ${receiptStr}
                </div>
                <a href="index.html" class="btn large-text">Home</a>
            </div>
        </div>`; }

    // for (let input of checkoutInfoInputs)
    // {
    //     if ((!input.classList.contains("delivery") || deliveryVisible) && input.type === "text")
    //         receiptStr += `<p>${input.parentElement.getElementsByTagName("label")[0].innerText.replace("*", "")}: ${input.value}</p>`;
    // }

    receiptStr += `<p>First Name: ${document.getElementById("firstName").value}</p>`;
    receiptStr += `<p>Last Name: ${document.getElementById("lastName").value}</p>`;
    let date = new Date();
    receiptStr += `<p>Date of purchase: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>`;

    for (let item of cart)
    {
        receiptStr += `<p>Item: ${item.name}, Quantity: ${item.quantity}, Item(s) Price: $${item.quantity * item.price}</p>`;
    }

    receiptStr += `<p>Payment Method: ${paymentVisible ? "Card" : "Cash"}</p>`;
    receiptStr += `<p>Subtotal: $${document.getElementById("checkout-subtotal").innerText}</p>`;
    receiptStr += `<p>Delivery: $${document.getElementById("checkout-delivery").innerText}</p>`;
    receiptStr += `<p>Taxes: $${document.getElementById("checkout-taxes").innerText}</p>`;
    receiptStr += `<p>Tip: ${document.getElementById("checkout-tip").value}%</p>`;
    receiptStr += `<p>Total: $${document.getElementById("checkout-total").innerText}</p>`;
    receiptStr += `<p>Points Earned: ${Math.round(document.getElementById("checkout-total").innerText * 100)}</p>`;


    popupElem.innerHTML = receiptPopup();
    document.body.prepend(popupElem);
    document.getElementsByClassName("popup-home")[0].getElementsByTagName("a")[0].focus();
}

function calculatePoints(total) {
    let userEmail = localStorage.getItem("loggedIn");
    let userData = JSON.parse(localStorage.getItem(userEmail));
  
    if (userData.points === undefined) {
      userData.points = 0;
    }

    if (total === 0) return;

    points = total * 100;
    points = Number(points.toFixed(0));
  
    // updateCartPoints(points);
    updatePoints(points);
  }

function verifyTip(data) 
{
    let value = data.valueAsNumber;

    if (isNaN(value))
        value = 10;
    else if (value < 0)
        value = 0;
    else if (value > 100)
        value = 100;

    data.value = value;

    updateCosts("checkout");
}