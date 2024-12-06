// Initialize cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem('inCart')) || []; 
const percentTax = 0.06;

function updateCartPoints() {
  const cartPoints = document.getElementById('rewards-points-cart');
  cartPoints.textContent = userData.points;
}

function displayCart() {
  if (window.location.pathname === "/checkout.html")
    window.location.href = "menu.html";

  const checkLogged = localStorage.getItem('loggedIn');

  const cartHtml = `
    <div id="cart-page" onclick="closeCart(event, this)">  
      <div id="cart-buy">
        <div class="top-cart flex"> 
          <div class="flex">
            <ion-icon name="close-outline" class="pointer" id="close-cart" onclick="closeCart(event, this, true)"></ion-icon>
          </div>
          <div class="flex" id="cart-title">
            <h2 class="weight-9">Cart</h2>
          </div>
        </div>
        <div id="rewards-cart" class="rewards-cart flex"></div>
        <div class="delivery-pickup-cart flex">
          <div class="flex column">
            <h5>In Store Pickup</h5>
            <h7>2456 Nick's Boulevard, Lancaster, PA 17062</h7>
          </div>
          <div class="center-item">
            <a id="delivery-click" href="#">Delivery</a>
          </div>
        </div>
        <div class="my-order-cart flex">
          <h5 class="left-cart center-item">My Order (<a class="my-order">${cart.length}</a>)</h5>
          <a href="menu.html" class="right-cart center-item">Add more</a>
        </div>
        <ul id="cart-items">
        </ul>
        <div class="body-cart"> 
          <div id="cart-body-desc">
            <img src="images/basic/food-plate.avif" alt="" id="food-plate-rendering">
            <p class="size-3 center-item">Still Hungry?</p>
            <p class="size-2 center-item">Let's find something you'll love!</p>
            <button id="keep-ordering" class="center-item">Keep Ordering</button>
          </div>
          <div class="flex space-between wrapper-cart-body">
            <p><b>Summary</b></p>
            <div class="flex column" id="order-summary">
              <div class="flex row-1">
                <div class="flex box-1">Subtotal</div>
                <div class="flex">$<a id="cart-subtotal">0.00</a></div>
              </div>
              <div class="flex row-1">
                <div class="flex box-1">Taxes</div>
                <div class="flex">$<a id="cart-taxes">0.00</a></div>
              </div>
              <div class="flex row-1 total">
                <div class="flex box-1"><p><b>Total</b></p></div>
                <div class="flex"><p><b>$<a id="cart-total">0.00</a></b></p></div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-cart flex">
          <button onclick="window.location.href = 'checkout.html'" id="checkout-btn" class="btn" disabled>
            <b>Continue</b> $<a id="cart-to-checkout">0.00</a>
          </button>
        </div>
      </div>
    </div>
  `;

  switch (checkLogged) {
    case 'guest':
      cartRewardsHtml = `
        <div class="rewards-cart-split column">
          <div class="rewards-cart-header">
            <div class="flex">
              <img src="images/basic/logo-no-background.png" id="cart-logo">
            </div>
            <div class="flex column align-items-center">
              <h5>Nick's Points & Rewards!</h5>
              <p class="size-4">Sign up and get <b>200 points</b> for free!</p>
            </div>
          </div>
            <div class="rewards-cart-body column">
              <p class="size-2">To gain points on every purchase, <b>Login</b> or <b>Sign Up</b>! Points can be redeemed for <b>money off your order</b>!</p>
              <p class="size-0 weight-9"><b>NOTE: While loged in as Guest no points will be gained upon purchase(s)</b></p>
            </div>
        </div>
        <div class="rewards-cart-login flex column">
          <button onclick="window.location.href='signUp.html';" class="cart-sign-up pointer roboto-slab">Join</button>
          <a onclick="window.location.href='login.html'" class="cart-login weight-5 pointer roboto-slab">Sign In</a>
        </div>
      `;

      cartLocationHtml = `
      
      `;
      break;
    case null:
      console.log('not signed in');
      cartRewardsHtml = `
        <div class="rewards-cart-split column">
          <div class="rewards-cart-header">
            <div class="flex">
              <img src="images/basic/logo-no-background.png" id="cart-logo">
            </div>
            <div class="flex column align-items-center">
              <h5>Nick's Points & Rewards!</h5>
              <p class="size-4">Sign up and get <b>200 points</b> for free!</p>
            </div>
          </div>
          <div class="rewards-cart-body">
            <p class="size-2">To gain points on every purchase, <b>Login</b> or <b>Sign Up</b>! Points can be redeemed for <b>money off your order</b>!</p>
          </div>
        </div>
        <div class="rewards-cart-login flex column">
          <button onclick="window.location.href='signUp.html';" class="cart-sign-up pointer roboto-slab">Join</button>
          <a onclick="window.location.href='login.html'" class="cart-login weight-5 pointer roboto-slab">Sign In</a>
        </div>
      `;

      cartLocationHtml = `
      
      `;
      break;
    default:
      console.log('signed in');
      cartRewardsHtml = `
        <div class="rewards-cart-split column">
          <div class="rewards-cart-header">
            <div class="flex">
              <img src="images/basic/logo-no-background.png" id="cart-logo">
            </div>
            <div class="flex column algin-items-center">
              <h5>Nick's Points & Rewards!</h5>
              <p class="size-4"><b>200 aditional points</b> on your next purchase!</p>
            </div>
          </div>
          <div class="rewards-cart-body column">
            <p class="size-2">Your points are displayed on the right</b>. Points can be redeemed for <b>money off your order</b>!</p>
          </div>
        </div>
        <div class="rewards-cart-login flex column">
          <div class="cart-points-outer flex">
            <div class="cart-points-inner flex">
              <p id="rewards-points-cart"></p> <!-- Make this current points -->
            </div>
          </div>
        </div>
      `;

      cartLocationHtml = `
      
      `;
      break;
  }

  const page = document.getElementById('cart');
  page.innerHTML = cartHtml;

  const cartItems = document.getElementById("cart-items");
  const cartRewards = document.getElementById('rewards-cart');
  cartRewards.innerHTML = cartRewardsHtml;

  for (let i = 0; i < cart.length; i++) {
    cartItems.innerHTML += genCartItem(cart[i]);
  }

  if (cart.length > 0) {
    document.getElementById("cart-body-desc").style.display = "none";
  }

  for (let input of document.getElementById("cart-items").getElementsByTagName("input")) {
    if (input.type === "number") {
      input.addEventListener("keypress", (e) => {
        console.log(input)
        if (isNaN(e.key)) 
          e.preventDefault();
      });
    }
  }

  updateCosts("cart");
  updateCartPoints();

  // We have a delay so it can load the transition properly
  setTimeout(() => {
    document.getElementById('cart-page').classList.add('active');
    document.getElementById('cart-buy').classList.add('active');
    document.body.classList.add('static');
  }, 10);
}

function closeCart(event, data, bypass) {
  if (bypass !== true && data !== event.target)
    return;

  document.getElementById('cart-page').style.zIndex = 3;
  document.getElementById('cart-page').classList.remove('active');
  document.getElementById('cart-buy').classList.remove('active');
  document.body.classList.remove('static');
  setTimeout(() => { document.getElementById('cart-page').style.zIndex = -1 }, 500);

}

function genCartItem(itemValues) {
  return `
    <li>
      <div class="cart-img-div flex">
        <img src="${itemValues.img}" class="cart-item-img">
      </div>
      <div class="flex column">
        <h4>${itemValues.name}</h4>
        <p class="menu-desc">${itemValues.desc}</p>
      </div>
      <div class="cart-quantity-div flex">
        <button onclick="removeCart(this)" class="btn btn-selected cart-remove">Remove</button>
        <p class="cart-price">$${itemValues.price}</p>
        <input type="number" value="${itemValues.quantity}" onInput="updateQuantity(this)" class="quantity cart-quantity" min="0" max="100" step="1">
      </div>
    </li>`;
}


class ItemValues {
  constructor(name, desc, price, img, quantity) {
      this.name = name;
      this.desc = desc;
      this.price = price;
      this.img = img;
      this.quantity = quantity;
  }
}

function updateQuantity(data) {
  const li = data.parentElement.parentElement;
  const itemName = li.getElementsByTagName("h4")[0].innerText;
  let index = 0;


  for (let i in cart) {
    if (cart[i]["name"] === itemName) {
      index = i;
      break;
    }
  }

  data.value = parseInt(data.value);

  if (data.valueAsNumber >= 100)
    data.value = 100;

  if (data.valueAsNumber < 0 || isNaN(data.valueAsNumber))
    data.value = 0;

  if (cart.length > 0)
    cart[index]["quantity"] = data.valueAsNumber;
  localStorage.setItem("inCart", JSON.stringify(cart));

  updateMenuQuantity();
}

function addCart(data) {
  const item = data.parentNode.parentNode.id;
  const quantityElem = data.parentElement.getElementsByClassName("quantity")[0];
  console.log(quantityElem);

  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i]['name'] === item) {
      // Check if the item already exists in the cart
      const existingItem = cart.find(cartItem => cartItem.name === item);

      if (existingItem) {
        // Update quantity if item exists
        quantityElem.valueAsNumber++;
      } else {
        // Add new item to the cart
        const desc = menuItems[i]['desc'];
        const price = menuItems[i]['price'];
        const img = menuItems[i]['img'];
        const name = menuItems[i]['name'];
        const quantity = 1;

        quantityElem.valueAsNumber++;
        cart.push(new ItemValues(name, desc, price, img, quantity));
      }

      // Update localStorage
      localStorage.setItem('inCart', JSON.stringify(cart));
      updateQuantity(quantityElem);

      return; // Exit the function after processing
    }
  }
}

function removeCart(data) {
  const name = data.parentElement.parentElement.getElementsByTagName("h4")[0].innerText;

  for (let i in cart) {
    if (cart[i]["name"] === name)
      cart.splice(i, 1);    
  }
  localStorage.setItem("inCart", JSON.stringify(cart));
  data.parentElement.parentElement.remove();

  document.getElementsByClassName("my-order")[0].innerText--;

  if (cart.length <= 0)
    document.getElementById("cart-body-desc").style.display = "block";


  updateMenuQuantity();
}

function formatCostToStr(num) { return (Math.round(num*100) / 100).toFixed(2); }

function updateCosts(type) {
  let subtotalElem;
  let taxesElem;
  let totalElem;
  let deliveryElem;
  let tipElem;

  let subtotal = 0;
  let taxes = () => { return Math.round(subtotal * percentTax * 100) / 100 };
  let delivery = 0;
  let tip = 0;
  let total = () => { return (subtotal + taxes() + delivery) * (tip / 100 + 1) };

  if (type === "cart") {
    subtotalElem = document.getElementById("cart-subtotal");
    taxesElem = document.getElementById("cart-taxes");
    totalElem = document.getElementById("cart-total");
  }
  else if (type === "checkout") {
    subtotalElem = document.getElementById("checkout-subtotal");
    deliveryElem = document.getElementById("checkout-delivery");
    taxesElem = document.getElementById("checkout-taxes");
    totalElem = document.getElementById("checkout-total");
    tipElem = document.getElementById("checkout-tip");
    if (document.getElementById("delivery-checkbox").checked)
      delivery = 10;
    tip = tipElem.valueAsNumber;
  }


  for (let item of cart) {
    subtotal += Number(item["price"]) * item["quantity"];
  }
   
  subtotalElem.innerText = formatCostToStr(subtotal); 
  taxesElem.innerText = formatCostToStr(taxes()); 
  totalElem.innerText = formatCostToStr(total()); 

  if (type === "cart")
    enableToCheckout(total());
  else if (type === "checkout") {
    deliveryElem.innerText = formatCostToStr(delivery); 
  }
}

function enableToCheckout(total) {
  const checkoutBtnElem = document.getElementById("checkout-btn");
  const toCheckoutElem = document.getElementById("cart-to-checkout");
  toCheckoutElem.innerText = formatCostToStr(total); 

  if (total > 0)
    checkoutBtnElem.removeAttribute("disabled");
  else
    checkoutBtnElem.setAttribute("disabled", "");
}

