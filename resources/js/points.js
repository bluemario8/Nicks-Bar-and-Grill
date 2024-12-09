const email = localStorage.getItem('loggedIn'); // Gets the user who is logged in
let userData = JSON.parse(localStorage.getItem(email)); // Gets the logged-in user's data in JSON

// Check if user data exists
if (userData) {
  // Initialize points if they don't exist
  if (userData.points === undefined) {
    userData.points = 0;
  }

  // Initialize coupons if they don't exist
  if (!userData.coupons) {
    userData.coupons = {
      moneyoff: 'not active',
      bigbucks: 'not active',
      '15bucks': 'not active',
      '25more': 'not active',
      bigsavings: 'not active',
    };
    localStorage.setItem(email, JSON.stringify(userData));
  }

  // Function to update points
  function updatePoints(newPoints) {
    userData.points += newPoints; // Update points
    localStorage.setItem(email, JSON.stringify(userData)); // Save updated data back to localStorage
    checkPoints(); // Check which buttons should be enabled
    updatePointsDisplay(); // Update the displayed points
  }

  // Function to update the points display on the screen
  function updatePointsDisplay() {
    const points = userData.points; // Get current points from userData
    const pointsDisplay = document.getElementById('update-points'); // Select the display element
    if (pointsDisplay) {
      pointsDisplay.textContent = points; // Update the text content
    }
  }

  // Function to check and enable/disable buttons based on points
  function checkPoints() {
    const points = userData.points; // Get current points from userData

    const buttonConfig = [
      { id: 'btn-2500', pointsRequired: 2500 },
      { id: 'btn-7500', pointsRequired: 7500 },
      { id: 'btn-15000', pointsRequired: 15000 },
      { id: 'btn-25000', pointsRequired: 25000 },
      { id: 'btn-50000', pointsRequired: 50000 },
    ];

    buttonConfig.forEach(({ id, pointsRequired }) => {
      const button = document.getElementById(id);
      if (button) {
        if (points >= pointsRequired) {
          button.style.backgroundColor = 'var(--winner-green)';
          button.style.cursor = 'pointer';
          button.disabled = false;
        } else {
          button.style.backgroundColor = 'var(--error-red)';
          button.style.cursor = 'not-allowed';
          button.disabled = true;
        }
      }
    });
  }

  // Function to handle redeeming points for a coupon
  function checkRedeemable(data) {
    let btnValue = Number(data.value);
    let moneyOff = 0;
    let couponCode = '';

    switch (btnValue) {
      case 2500:
        moneyOff = 2.50;
        couponCode = 'moneyoff';
        break;
      case 7500:
        moneyOff = 7.50;
        couponCode = 'bigbucks';
        break;
      case 15000:
        moneyOff = 15.00;
        couponCode = '15bucks';
        break;
      case 25000:
        moneyOff = 25.00;
        couponCode = '25more';
        break;
      case 50000:
        moneyOff = 50.00;
        couponCode = 'bigsavings';
        break;
    }

    // Getting related ids
    const redeemPopUpLoc = document.getElementById('redeem-pop-up');
    const couponPopUpLoc = document.getElementById('coupon-code-pop-up');
    const yesBtn = document.getElementById('green-btn');
    const couponMsg = document.getElementById('coupon-code-msg');
    const closeBtn = document.getElementById('close-btn');
    const pointsDisplay = document.getElementById('redeem-points-msg');
    const infoMsg = document.getElementById('custom-p');
    const noBtn = document.getElementById('red-btn');
    const overlay = document.getElementById('overlay');

    overlay.style.display = 'block'; 
    setTimeout(() => overlay.classList.add('active'), 10); // Activates the transition

    // Check if the coupon is already active
    if (userData.coupons[couponCode] === 'active') {
      pointsDisplay.textContent = `"${couponCode}" coupon is already active. Use it before redeeming this again.`;
      redeemPopUpLoc.style.display = 'block';
      yesBtn.style.display = 'none';
      infoMsg.style.display = 'none';
      noBtn.textContent = 'Close pop up';
      return;
    }

    moneyOff = moneyOff.toFixed(2); // Ensure two decimal points
    pointsDisplay.textContent = `Would you like to redeem ${btnValue}pts for a $${moneyOff} coupon code?`;
    redeemPopUpLoc.style.display = 'block';
    yesBtn.style.display = 'block';
    infoMsg.style.display = 'flex';
    noBtn.textContent = 'Still thinking';

    yesBtn.addEventListener('click', () => {
      redeemPopUpLoc.style.display = 'none';
      couponPopUpLoc.style.display = 'block';

      // Update coupon status to active
      userData.coupons[couponCode] = 'active';
      localStorage.setItem(email, JSON.stringify(userData));
      // Updates points
      userData.points -= btnValue;
      localStorage.setItem(email, JSON.stringify(userData));

      couponMsg.textContent = `Code: ${couponCode}`;

      closeBtn.addEventListener('click', () => {
        couponPopUpLoc.style.display = 'none';
        overlay.classList.remove('active'); // Remove the active class to trigger fade out
        setTimeout(() => {
          overlay.style.display = 'none'; // Hide the element after the transition
        }, 500); 
        window.location.reload(); // Refresh the page
      });
    });
  }

  // Close popup function
  function closePopUp() {
    const popUpLoc = document.getElementById('redeem-pop-up');
    if (popUpLoc) {
      popUpLoc.style.display = 'none';
      overlay.classList.remove('active'); // Remove the active class to trigger fade out
      setTimeout(() => {
        overlay.style.display = 'none'; // Hide the element after the transition
      }, 500); 
    }
  }

  // Initialize the display when the page loads
  updatePointsDisplay();
  checkPoints();
}