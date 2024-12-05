// Check if "points" exists in localStorage, initialize if missing
if (localStorage.getItem('points') === null) {
  localStorage.setItem('points', JSON.stringify(0)); // Default to 0 points
}

// Function to update points
function updatePoints(newPoints) {
  let points = JSON.parse(localStorage.getItem('points')); // Get current points
  points += newPoints; // Update points
  localStorage.setItem('points', JSON.stringify(points)); // Save back to localStorage
  updatePointsDisplay(); // Update the displayed points
}

// Function to update the points display on the screen
function updatePointsDisplay() {
  const points = JSON.parse(localStorage.getItem('points')); // Get current points
  const pointsDisplay = document.getElementById('update-points'); // Select the display element
  pointsDisplay.textContent = points; // Update the text content
}

// Initialize the display when the page loads
updatePointsDisplay();

