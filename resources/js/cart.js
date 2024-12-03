function displayCart() {
  const checkLogged = localStorage.getItem('loggedIn');
  let cartRewardsHtml = '';

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
          <h5 class="left-cart center-item">My Order (0)</h5>
          <a href="menu.html" class="right-cart center-item">Add more</a>
        </div>
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
                <div class="flex">$0.00</div>
              </div>
              <div class="flex row-1">
                <div class="flex box-1">Taxes</div>
                <div class="flex">$0.00</div>
              </div>
              <div class="flex row-1 total">
                <div class="flex box-1"><p><b>Total</b></p></div>
                <div class="flex"><p><b>$0.00</b></p></div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-cart flex">
          <button onclick="" id="checkout-btn" disabled>
            <b>Continue</b> $0.00
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
              <p>100pts</p> <!-- Make this current points -->
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

  const cartRewards = document.getElementById('rewards-cart');
  cartRewards.innerHTML = cartRewardsHtml;

  // We have a delay so it can load the transition properly
  setTimeout(() => {
    document.getElementById('cart-page').classList.add('active');
    document.getElementById('cart-buy').classList.add('active');
    document.body.classList.add('static');
  }, 10);
}

function closeCart() {
  document.getElementById('cart-page').style.zIndex = 3;
  document.getElementById('cart-page').classList.remove('active');
  document.getElementById('cart-buy').classList.remove('active');
  document.body.classList.remove('static');
  setTimeout(() => { document.getElementById('cart-page').style.zIndex = 0 }, 1000);

}

const cart = JSON.parse(localStorage.getItem('inCart')) || []; // Initialize cart from localStorage or start empty

function addCart(data) {
  const item = data.parentNode.parentNode.id;

  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i]['name'] === item) {
      // Check if the item already exists in the cart
      const existingItem = cart.find(cartItem => cartItem.name === item);

      if (existingItem) {
        // Update quantity if item exists
        existingItem.quantity += 1;
      } else {
        // Add new item to the cart
        const price = menuItems[i]['price'];
        const img = menuItems[i]['img'];
        const name = menuItems[i]['name'];
        const quantity = 1;

        class ItemValues {
          constructor(name, price, img, quantity) {
            this.name = name;
            this.price = price;
            this.img = img;
            this.quantity = quantity;
          }
        }
        cart.push(new ItemValues(name, price, img, quantity));
      }

      // Update localStorage
      localStorage.setItem('inCart', JSON.stringify(cart));
      return; // Exit the function after processing
    }
  }
}
