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
        receiptStr += `<p>Item: ${item.name}, Quantity: ${item.quantity}, Total Price: $${item.quantity * item.price}</p>`;
    }


    console.log(receiptStr)
    popupElem.innerHTML = receiptPopup();
    console.log(receiptPopup());

    document.body.prepend(popupElem);

    document.getElementsByClassName("popup-home")[0].getElementsByTagName("a")[0].focus();
}