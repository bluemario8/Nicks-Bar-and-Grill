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
  } else if (localStorage.getItem(email) !== null) {
    alert('This email is already in use');
    return;
  } else if (password !== reEnterPassword) {
    alert('The passwords do not match');
    return;
  } else {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const specialChars = ['!', '@', '#', '$', '%'];

    const numCheck = numbers.some(num => password.includes(num));
    const specialCharCheck = specialChars.some(specChar => password.includes(specChar));

    if (!/[a-zA-Z]/.test(password)) {
      alert('Your password must contain atleast one letter');
      return;
    } else if (!numCheck) {
      alert('Your password must contain atleast one number');
      return;
    } else if (!specialCharCheck) {
      alert('Your password must contain at least one special character: "!", "@", "#", "$", "%"');
      return;
    } else if (password.length < 8) {
      alert('Your password must be a length of 8 characters or greater');
      return;
    }
    
    localStorage.setItem(email, email);
  }
}
