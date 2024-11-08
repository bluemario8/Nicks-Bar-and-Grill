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

  // Creating a class allows you to store related variables in one single variable
  class User {
    // These are the 4 paramaters of "User" you have them in the constructor so you can reuse them throughout the code
    constructor(firstName, lastName, password, email) {
      // "this.firstName" sets "firstName" as the parameters value for this instance 
      this.firstName = firstName;
      this.lastName = lastName;
      this.password = password;
      this.email = email;
    }
  }

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

    // 'numbers.some' looks through all the elements in the numbers array, 'num' is whatever 'numbers.some' is we point to 'password.includes(num)' to then check password to see if it containers any of those specific numbers
    const numCheck = numbers.some(num => password.includes(num));
    const specialCharCheck = specialChars.some(specChar => password.includes(specChar));

    if (password.length < 8) {
      alert('Your password must be a length of 8 characters or greater');
      return;
      // "/" these slashes make it a regular expression, "[a-zA-Z]" this is a character class and matches everything that falls in the expression
    } else if (!/[a-zA-Z]/.test(password)) { 
      alert('Your password must contain at least one letter');
      return;
    } else if (!numCheck) {
      alert('Your password must contain at least one number');
      return;
    } else if (!specialCharCheck) {
      alert('Your password must contain at least one special character: "!", "@", "#", "$", "%"');
      return;
    }
    
    // Creates a new variable with the Class "User". It also gets its parameters which are now what ever the users input was for each specific field
    const user = new User(firstName, lastName, password, email);
    // Stores the variable user which contains all the info of the account creation into the local storage. It has the email as the key 
    // and "JSON.stringify(user)" converts the user variable to a JSON allowing us the store things in the local storage similar to an array, with 
    // the email being the array name and all the constructor parameters being the content of that array
    localStorage.setItem(email, JSON.stringify(user));
    // Takes you to home page and you are signed in
    location.href="index.html";
  }
}
