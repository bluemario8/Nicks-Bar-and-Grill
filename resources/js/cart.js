function displayCart() {
  const checkLogged = localStorage.getItem('loggedIn');
  let cartRewardsHtml = ''; // Default to an empty string to avoid errors

  // Base cart HTML structure
  const cartHtml = `
    <div id="cart-page">  
      <div id="cart-buy">
        <div class="top-cart flex"> 
          <div class="flex">
            <ion-icon name="close-outline" class="pointer" id="close-cart" onclick="closeCart()"></ion-icon>
          </div>
          <div class="flex" id="cart-title">
            <h2 class="weight-9">Cart</h2>
          </div>
        </div>
        <div id="rewards-cart" class="rewards-cart flex"></div>
        <div class="delivery-pickup-cart"><p>get type</p></div>
        <div class="my-order-cart flex"><p>my order</p></div>
        <div class="body-cart flex"><p>body</p></div>
        <div class="footer-cart flex">
          <button onclick="" id="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  `;

  // Determine the rewards content based on login status
  switch (checkLogged) {
    case 'guest':
      console.log('signed in as guest');
      cartRewardsHtml = `<p class="size-4">Welcome Guest! Enjoy browsing our store.</p>`;
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
      break;
    default:
      console.log('signed in');
      cartRewardsHtml = `<p class="size-4">You're signed in. Earn rewards with every purchase!</p>`;
      break;
  }

  // Insert the main cart structure into the page
  const page = document.getElementById('cart');
  page.innerHTML = cartHtml;

  // Now safely set the rewards content
  const cartRewards = document.getElementById('rewards-cart');
  cartRewards.innerHTML = cartRewardsHtml;

  // Add the active class with a slight delay for transitions
  setTimeout(() => {
    document.getElementById('cart-page').classList.add('active');
    document.getElementById('cart-buy').classList.add('active');
  }, 10);
}

function closeCart() {
  document.getElementById('cart-page').classList.remove('active');
  document.getElementById('cart-buy').classList.remove('active');
}
