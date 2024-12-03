// Check if "points" exists in localStorage, initialize if missing
if (localStorage.getItem('points') === null) {
  localStorage.setItem('points', JSON.stringify(0)); // Default to 0 points
}

// Function to modify points
function updatePoints(newPoints) {
  let points = JSON.parse(localStorage.getItem('points')); // Get current points
  points += newPoints; // Update points
  localStorage.setItem('points', JSON.stringify(points)); // Save back to localStorage
}

// Example usage
updatePoints(10); // Adds 10 points
updatePoints(-5); // Subtracts 5 points