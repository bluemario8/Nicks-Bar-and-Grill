var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialChars = ["!", "@", "#", "$", "%"];
const managerObj = {
    "firstName": "Nick",
    "lastName": "Bar",
    "password": "password",
    "email": "nick@manager.com"
};

// Getting the password id (This will contain the value of the password/what the password is)
const passwordId = document.getElementById("password");
// Gets the ids for each visual password requirment check
const passChangeText1 = document.getElementById("pass-change-text-1");
const passChangeImg1 = document.getElementById("pass-change-img-1");
const passChangeText2 = document.getElementById("pass-change-text-2");
const passChangeImg2 = document.getElementById("pass-change-img-2");
const passChangeText3 = document.getElementById("pass-change-text-3");
const passChangeImg3 = document.getElementById("pass-change-img-3");
const passChangeText4 = document.getElementById("pass-change-text-4");
const passChangeImg4 = document.getElementById("pass-change-img-4");

// If statements check to make sure that you are on the sign up page so this even listener does not create issues when on other pages
if (window.location.pathname === "/signUp.html") {
  // Adds an event listener to password this means that whenever something is typed into password this function will trigger
  passwordId.addEventListener("input", function () {
    // Gets the value of the password from the passwordId
    const passwordValue = passwordId.value;

    // Checks if these requirments are true or false, which ever they are that is then what the variable will equal
    const lengthCheck = passwordValue.length >= 8;
    const letterCheck = /[a-zA-Z]/.test(passwordValue);
    const numCheck = numbers.some((num) => passwordValue.includes(num));
    const specialCharCheck = specialChars.some((specChar) =>
      passwordValue.includes(specChar)
    );

    // Shorthand if else statements, if "lengthCheck" is true green is activated and if its false red is
    passChangeText1.style.color = lengthCheck ? "green" : "red";
    passChangeImg1.src = lengthCheck
      ? "images/login/green-check.png"
      : "images/login/red-x.png";

    passChangeText2.style.color = letterCheck ? "green" : "red";
    passChangeImg2.src = letterCheck
      ? "images/login/green-check.png"
      : "images/login/red-x.png";

    passChangeText3.style.color = numCheck ? "green" : "red";
    passChangeImg3.src = numCheck
      ? "images/login/green-check.png"
      : "images/login/red-x.png";

    passChangeText4.style.color = specialCharCheck ? "green" : "red";
    passChangeImg4.src = specialCharCheck
      ? "images/login/green-check.png"
      : "images/login/red-x.png";
  });
}

// Function handeling logic of account creation
function getForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const reEnterPassword = document.getElementById("re-password").value;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;

  const checkNull = [email, password, reEnterPassword, firstName, lastName];

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

  if (checkNull.some((fieldInput) => fieldInput === "")) {
    invalidSignUp("empty field");
  } else if (localStorage.getItem(email) !== null || 
            email === managerObj.email) {
    invalidSignUp("email used");
  } else if (password !== reEnterPassword) {
    invalidSignUp("pass dont match");
  } else {
    // 'numbers.some' looks through all the elements in the numbers array, 'num' is whatever 'numbers.some' is we point to 'password.includes(num)' to then check password to see if it containers any of those specific numbers
    const numCheck = numbers.some((num) => password.includes(num));
    const specialCharCheck = specialChars.some((specChar) =>
      password.includes(specChar)
    );

    if (password.length < 8) {
      invalidSignUp("length of 8");
      // "/" these slashes make it a regular expression, "[a-zA-Z]" this is a character class and matches everything that falls in the expression
    } else if (!/[a-zA-Z]/.test(password)) {
      invalidSignUp("1 letter");
    } else if (!numCheck) {
      invalidSignUp("1 number");
    } else if (!specialCharCheck) {
      invalidSignUp("1 special char");
    } else {
      // Creates a new variable with the Class "User". It also gets its parameters which are now what ever the users input was for each specific field
      const user = new User(firstName, lastName, password, email);
      /* Stores the variable user which contains all the info of the account creation into the local storage. It has the email as the key 
      and "JSON.stringify(user)" converts the user variable to a JSON allowing us the store things in the local storage similar to an array, with 
      the email being the array name and all the constructor parameters being the content of that array */
      localStorage.setItem(email, JSON.stringify(user));
      localStorage.setItem("loggedIn", email);
      // Takes you to home page and you are signed in
      location.href = "index.html";
    }
  }
}

// Logs in the user as a guest
function loginGuest() {
  localStorage.setItem("loggedIn", "guest");
  location.href = "index.html";
}

// Function to toggle password shown and unshown for signup
function showPasswordSignUp() {
  const showPass = document.getElementById("password");
  const showRePass = document.getElementById("re-password");
  const checkBox = document.getElementById("show-pass");

  // "isChecked" will be true or false, if its checked it will be true if not it will be false
  const isChecked = checkBox.checked;

  // Shorthand if else statement
  showPass.type = isChecked ? "text" : "password";
  showRePass.type = isChecked ? "text" : "password";
}

// Function to toggle password shown and unshown for signup
function showPasswordLogin() {
  const showPass = document.getElementById("password-login");
  const checkBox = document.getElementById("show-pass-login");

  const isChecked = checkBox.checked;
  showPass.type = isChecked ? "text" : "password";
}

// Function to display error messages for incorrect/invalid fields
function invalidSignUp(errorType) {
  let errorText = "";
  switch (errorType) {
    case "empty field":
      errorText = "Please fill in all fields";
      break;
    case "email used":
      errorText = "Email is already in use";
      break;
    case "pass dont match":
      errorText = "Passwords do not match";
      break;
    case "length of 8":
      errorText = "Passwords must be a length of atleast 8 characters";
      break;
    case "1 letter":
      errorText = "Passwords must contain at least 1 letter";
      break;
    case "1 number":
      errorText = "Passwords must contain at least 1 number";
      break;
    case "1 special char":
      errorText = 'Passwords must contain at least 1: "!", "@", "#", "$", "%"';
      break;
    case "incorrect":
      errorText = "Incorrect password or email entered";
      break;
  }
  const invalidSignUpLocation = document.getElementById(
    "invalid-signup-popup-loc"
  );
  const content = document.getElementById("invalid-signup-ptag");
  invalidSignUpLocation.style.display = "flex";
  content.innerText = errorText;
}

// function getJSON(file) {
//   fetch(file)
//     .then((res) => res.json())
//     .then((text) => {
//       console.log(text);
//       return text;
//     });
// }

// Function handeling login logic
function login() {
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;

  const checkEmail = localStorage.getItem(email);

  if (checkEmail) {
    // Makes the JSON string back into objects
    const userInfo = JSON.parse(checkEmail);
    // ".password" is in object that was in the JSON that is now a property that contains the emails password
    const checkPassword = userInfo.password;
    // Shorthand else if, if "checkPassword" and "password" equal eachother the first statement is executed if it is not the second is
    if (checkPassword === password) {
      localStorage.setItem("loggedIn", email);
      location.href = "index.html";
    } else {
      invalidSignUp("incorrect");
    }
  } else if (email === managerObj.email && password === managerObj.password) {
    localStorage.setItem("loggedIn", managerObj.email);
    location.href = "index.html";
  } else {
    invalidSignUp("incorrect");
  }
}
