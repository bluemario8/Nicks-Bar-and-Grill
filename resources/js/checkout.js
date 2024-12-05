const checkoutItemsElem = document.getElementById("checkout-items");

addItemsToCheckout(cart);


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