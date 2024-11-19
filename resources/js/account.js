const tableElem = document.getElementsByClassName("account-table")[0];
let inputs = tableElem.getElementsByTagName("input");
let selects = tableElem.getElementsByTagName("select");
// const allInputs = Object.assign({}, inputs, selects);
const allInputs = [ ...inputs, ...selects ];
const email = localStorage.getItem("loggedIn");

let userData = JSON.parse(localStorage.getItem(email));

console.log(allInputs)
console.log(userData)

// Insert all the values that are in local storage already as default values
for (let i in allInputs) 
{
    if (userData[allInputs[i].id] !== undefined && userData[allInputs[i].id] !== "") 
    {
        allInputs[i].value = userData[allInputs[i].id];
        console.log(`Filled in ${allInputs[i].value}`)
    }
}


function updateAccountInfo(data) 
{
    for (let i in allInputs)
    {
        userData[allInputs[i].id] = allInputs[i].value;
    }
    console.log(userData)

    localStorage.setItem(email, JSON.stringify(userData));
}