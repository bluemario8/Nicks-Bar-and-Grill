const listElem = document.getElementsByClassName("account-list")[0];
const errorElem = document.getElementById("account-invalid-fields");
let inputs = listElem.getElementsByTagName("input");
let selects = listElem.getElementsByTagName("select");
const allInputs = [ ...inputs, ...selects ];

let email = localStorage.getItem("loggedIn");
let userData = JSON.parse(localStorage.getItem(email));


if (email === null || email === "")
{
    window.location.replace("login.html");
}

// Insert all the values that are in local storage already as default values
for (let i in allInputs) 
{
    if (userData[allInputs[i].id] !== undefined && userData[allInputs[i].id] !== "") 
    {
        allInputs[i].value = userData[allInputs[i].id];
        console.log(`Filled in ${allInputs[i].value}`)
    }
}

// update password length and required characters
showPasswordRequirements(passwordId.value);

function containsValidChar(password)
{
    return specialChars.some((specChars) => password.includes(specChars));
}

function validEmail(fieldEmail)
{
    if (!fieldEmail.includes("@"))
        return "Invalid email";
    else if (fieldEmail !== email && 
            (localStorage.getItem(fieldEmail) !== null || fieldEmail === managerObj.email)
    )
        return "Email already taken";

    return true;
}

function validPassword(password) 
{
    if (password.length < 8 || !/[a-zA-Z]/.test(password) ||
        !/[0-9]/.test(password) || !containsValidChar(password)
    )
        return false;

    return true;
}

function updateInvalidField(str)
{
    if (str === "")
        errorElem.style.backgroundColor = "transparent";
    else
        errorElem.style.backgroundColor = "var(--error-red)";

    errorElem.innerText = str;
}

function updateAccountInfo(data) 
{
    const emailBox = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (validEmail(emailBox) !== true)
    {
        updateInvalidField(validEmail(emailBox));
        return false;
    }
    else if (!validPassword(password)) 
    {
        updateInvalidField("Invalid password entered");
        return false;
    }
    else
        updateInvalidField("");

    for (let i in allInputs)
    {
        userData[allInputs[i].id] = allInputs[i].value;
    }
    console.log(userData)

    if (email !== emailBox)
    {
        localStorage.removeItem(email);
        email = emailBox;
    }

    localStorage.setItem(email, JSON.stringify(userData));
    popup("Success. Account information updated!");
}