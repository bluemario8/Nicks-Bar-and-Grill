const checkoutItemsElem = document.getElementById("checkout-items");
let userEmail = localStorage.getItem("loggedIn");
let deliveryVisible = false;

if (!userEmail)
{ 
    window.location.href = "login.html";
}

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

function placeOrder() 
{
    let valid = true;

    for (let input of checkoutInfoInputs)
    {
        if (input.hasAttribute("required") && input.value === "")
        {
            if (!input.classList.contains("delivery") || deliveryVisible)
                valid = false;
        }
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
                <h3>Order Placed. Here is your receipt:</h3>
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

    receiptStr += `<p>Subtotal: $${document.getElementById("checkout-subtotal").innerText}</p>`;
    receiptStr += `<p>Delivery: $${document.getElementById("checkout-delivery").innerText}</p>`;
    receiptStr += `<p>Taxes: $${document.getElementById("checkout-taxes").innerText}</p>`;
    receiptStr += `<p>Tip: ${document.getElementById("checkout-tip").value}%</p>`;
    receiptStr += `<p>Total: $${document.getElementById("checkout-total").innerText}</p>`;


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
  
    updateCartPoints(points);
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