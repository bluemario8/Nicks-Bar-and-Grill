function displayCart() {
  const cartHtml = `
  <div id="cart-page">     
    <div id="cart-buy"></div>
  </div>
  `;

  const page = document.getElementById('cart');

  page.innerHTML = cartHtml;
  page.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
}

