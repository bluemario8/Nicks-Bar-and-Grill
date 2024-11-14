function displayCart() {
  // This is the HTML that will be inserted into the code when the cart btn is clicked
  const cartHtml = `
    <!-- All content of the cart page -->
    <div id="cart-page">  
      <!-- Just the right side container of the cart -->   
      <div id="cart-buy">
        <!-- Header of the cart -->
        <div class="top-cart flex"> 
          <div class="flex">
            <ion-icon name="close-outline" class="pointer" id="close-cart" onclick="closeCart()"></ion-icon>
          </div>
          <div class="flex" id="cart-title">
            <h2 class="weight-9">Cart</h2>
          </div>
        </div>
        <!-- Rewards of the cart -->
        <div class="rewards-cart flex">
          <p>rewards</p>
        </div>
        <!-- Pickup/delivery of the cart -->
        <div class="delivery-pickup-cart">
          <p>get type</p>
        </div>
        <!-- My order of the cart -->
        <div class="my-order-cart flex">
          <p>my order</p>
        </div>
        <!-- Body of the cart -->
        <div class="body-cart flex"> 
          <p>body</p>
        </div>
        <!-- Total & to checkout part of the cart -->
        <div class="footer-cart flex">
          <button onclick="" id="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  `;

  // This gets the cart element location to insert the code
  const page = document.getElementById('cart');
  // This inserts the code
  page.innerHTML = cartHtml;

  /* "setTimeout" is a built in js function, this function will delay when the function is called
  Delaying the function is necessary so the page can fully load the function in time */
  setTimeout(() => {
    // This code toggles the transition and activates it when the "displayCart" function is called
    document.getElementById('cart-page').classList.add('active');
    document.getElementById('cart-buy').classList.add('active');
  }, 10); // This delays the function by 10 milliseconds
}

function closeCart() {
  document.getElementById('cart-page').classList.remove('active');
  document.getElementById('cart-buy').classList.remove('active');

}
