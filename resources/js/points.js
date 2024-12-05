const email = localStorage.getItem('loggedIn'); // Gets the user who is logged in
let userData = JSON.parse(localStorage.getItem(email)); // Gets the logged-in user's data in JSON

// Check if the data exists
if (userData) {
  // If the points property doesn't exist, initialize it
  if (userData.points === undefined) {
    userData.points = 0; 
  }
  
  // Function to update points
  function updatePoints(newPoints) {
    userData.points += newPoints; // Update points
    localStorage.setItem(email, JSON.stringify(userData)); // Save updated data back to localStorage
    console.log("Updated points:", userData.points);

    checkPoints(); // Check which buttons should be enabled
    updatePointsDisplay(); // Update the displayed points
  }
}

// Function to update the points display on the screen
function updatePointsDisplay() {
  const points = userData.points; // Get current points from userData
  const pointsDisplay = document.getElementById('update-points'); // Select the display element
  pointsDisplay.textContent = points; // Update the text content
}

function checkPoints() {
  const points = userData.points; // Get current points from userData

  // Button ids declaration
  const btn2500 = document.getElementById('btn-2500');
  const btn7500 = document.getElementById('btn-7500');
  const btn15000 = document.getElementById('btn-15000');
  const btn25000 = document.getElementById('btn-25000');
  const btn50000 = document.getElementById('btn-50000');

  if (points >= 2500) {
    btn2500.style.backgroundColor = 'var(--winner-green)';
    btn2500.style.cursor = 'pointer';
    btn2500.disabled = false; 
  } else {
    btn2500.style.backgroundColor = 'var(--error-red)';
    btn2500.style.cursor = 'not-allowed';
    btn2500.disabled = true;
  }
  if (points >= 7500) {
    btn7500.style.backgroundColor = 'var(--winner-green)';
    btn7500.style.cursor = 'pointer';
    btn7500.disabled = false;
  } else {
    btn7500.style.backgroundColor = 'var(--error-red)';
    btn7500.style.cursor = 'not-allowed';
    btn7500.disabled = true;
  }
  if (points >= 15000) {
    btn15000.style.backgroundColor = 'var(--winner-green)';
    btn15000.style.cursor = 'pointer';
    btn15000.disabled = false;
  } else {
    btn15000.style.backgroundColor = 'var(--error-red)';
    btn15000.style.cursor = 'not-allowed';
    btn15000.disabled = true;
  }
  if (points >= 25000) {
    btn25000.style.backgroundColor = 'var(--winner-green)';
    btn25000.style.cursor = 'pointer';
    btn25000.disabled = false;
  } else {
    btn25000.style.backgroundColor = 'var(--error-red)';
    btn25000.style.cursor = 'not-allowed';
    btn25000.disabled = true;
  }
  if (points >= 50000) {
    btn50000.style.backgroundColor = 'var(--winner-green)';
    btn50000.style.cursor = 'pointer';
    btn50000.disabled = false;
  } else {
    btn50000.style.backgroundColor = 'var(--error-red)';
    btn50000.style.cursor = 'not-allowed';
    btn50000.disabled = true;
  }
}

function checkRedeemable(data) {
  const points = userData.points;
  btnValue = data.value;

  alert(btnValue);
}

updatePointsDisplay(); // Initialize the display when the page loads
updatePoints(2500);
