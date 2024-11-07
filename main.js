function getForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const reEnterPassword = document.getElementById('re-password').value;
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;

  const checkNull = [
    email,
    password,
    reEnterPassword,
    firstName,
    lastName
  ];

  if (checkNull.some(fieldInput => fieldInput === "")) {
    alert('Please fill in all fields');
    return;
  } else if (localStorage.getItem("email") !== null) {
    alert('This email is already in use');
  } else {
    localStorage.setItem('email', email);
  } 
}