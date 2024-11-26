class MenuItem 
{
    constructor(name, desc, price, img, catagory) {
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.img = img;
        this.catagory = catagory;
    }
}

let menuList = document.getElementsByClassName("menu-items")[0];
let menuSortElem = document.getElementsByClassName("menu-sort")[0];

let loggedInEmail = localStorage.getItem("loggedIn") !== null ?
                    localStorage.getItem("loggedIn") : "";

const managerObj = {
    "firstName": "Nick",
    "lastName": "Bar",
    "password": "password",
    "email": "nick@manager.com"
};

const defaultMenuItems = 
[
    // entrees
    new MenuItem("Basic Burger", "Classic taste of Nick's first burger", 
    "8.50", "http://127.0.0.1:5500/images/menu_items/basic_burger.png", "entree"),
    new MenuItem("Chicken Burger", "You can never go wrong with a chicken burger", 
    "9.00", "http://127.0.0.1:5500/images/menu_items/chicken_burger.png", "entree"),
    new MenuItem("Pizza Burger", "First of it's kind", 
    "10.00", "http://127.0.0.1:5500/images/menu_items/pizza_burger.png", "entree"),
    new MenuItem("Spicy Burger", "Nick's classic spicy burger", 
    "8.50", "http://127.0.0.1:5500/images/menu_items/spicy_burger.png", "entree"),
    new MenuItem("Basic Hotdog", "Classic taste of Nick's first hotdog", 
    "6.50", "http://127.0.0.1:5500/images/menu_items/basic_hotdog.png", "entree"),
    new MenuItem("Grilled Hotdog Sandwich", "A delicious grilled hotdog and cheese sandwich", 
    // sides        
    "8.50", "http://127.0.0.1:5500/images/menu_items/grilled_hotdog.png", "entree"),
    new MenuItem("Fries", "Some good 'ol fries", 
    "3.00", "http://127.0.0.1:5500/images/menu_items/fries.png", "side"),
    new MenuItem("Chips and Salsa", "High quality chips with fresh salsa", 
    "3.00", "http://127.0.0.1:5500/images/menu_items/chips_and_salsa.png", "side"),
    new MenuItem("Water", "Nick's great water", 
    // drinks
    "0.00", "http://127.0.0.1:5500/images/menu_items/water.png", "drink"),
    new MenuItem("Lemonade", "Made with fresh lemons", 
    "3.50", "http://127.0.0.1:5500/images/menu_items/lemonade.png", "drink"),
    new MenuItem("Blueberry Lemonade", "Made with fresh blueberries and lemons", 
    "3.50", "http://127.0.0.1:5500/images/menu_items/blueberry_lemonade.png", "drink"),
    new MenuItem("Coke", "Coca-Cola can", 
    "2.50", "http://127.0.0.1:5500/images/menu_items/coke.png", "drink"),
    new MenuItem("Sprite", "Sprite can", 
    "2.50", "http://127.0.0.1:5500/images/menu_items/sprite.png", "drink"),
    new MenuItem("Root Beer", "Mug root beer", 
    "2.50", "http://127.0.0.1:5500/images/menu_items/root_beer.png", "drink"),
    new MenuItem("Dr. Pepper", "Dr. Pepper can", 
    "2.50", "http://127.0.0.1:5500/images/menu_items/dr_pepper.png", "drink"),
    new MenuItem("Nick's Liquid Gold", "Nick's classic yellow beer with premium taste", 
    // alcohol        
    "4.50", "http://127.0.0.1:5500/images/menu_items/liquid_gold.png", "alcohol"),
    new MenuItem("Nick's Nectar", "Nick's special extra foamy and creamy beer", 
    "5.50", "http://127.0.0.1:5500/images/menu_items/nectar.png", "alcohol"),
    new MenuItem("Nick's Blackout Stout", "Nick's classic high alcohol content beer WARNING: HIGH ALCOHOL CONTENT", 
    "8.50", "http://127.0.0.1:5500/images/menu_items/blackout_stout.png", "alcohol"),
    new MenuItem("Vanilla Milkshake", "Delicious vanilla milkshake made with premium ice cream", 
    // desert
    "5.00", "http://127.0.0.1:5500/images/menu_items/vanilla_milkshake.png", "desert"),
    new MenuItem("Chocolate Cake Slice", "Fresh made creamy and delicious chocolate cake slice", 
    "6.00", "http://127.0.0.1:5500/images/menu_items/chocolate_cake.png", "desert"),
];

// sets the local storage item to default if it doesn't exist
if (localStorage.getItem("menuItems") === null)
    localStorage.setItem("menuItems", JSON.stringify(defaultMenuItems));

// gets the menu items from the local storage's json
let menuItems = JSON.parse(localStorage.getItem("menuItems"));

// adds all the items to the html
for (let item of menuItems)
{
    menuList.innerHTML += genMenuHtml(item);
}

// Checks if manager is not signed in and hides all manager buttons
if (localStorage.getItem("loggedIn") !== managerObj.email)
{
    for (let elem of document.getElementsByClassName("manager"))
    {
        elem.style.display = "none";
    }
}


function genMenuHtml(obj) 
{ 
    return `
        <li class="${obj.catagory}" id="${obj.name}">
            <button class="menu-x-btn manager" onclick="removeItem(this)">
                <ion-icon class="menu-x" name="close-outline"></ion-icon>
            </button>
            <div style="display: none" class="menu-input-cata-div">
                <a class="nunito-sans">Catagory: </a>
                <input class="menu-input-cata" value="${obj.catagory}">
            </div>
            <div class="menu-img-div">
                <img src="${obj.img}">
                <input style="display: none" class="menu-input-img" type="text" value="${obj.img}">
            </div>
            <div class="menu-title-div">
                <h4>${obj.name}</h4>
                <input style="display: none" class="menu-input-title" type="text" value="${obj.name}">
            </div>
            <div class="menu-items-p">
                <p>${obj.desc}</p>
                <textarea style="display: none" class="menu-textarea-desc">${obj.desc}</textarea>
            </div>
            <div class="menu-price large-text">$
                <a class="menu-price-num">${obj.price}</a>
                <input style="display: none" class="menu-input-price" type="text" value="${obj.price}">
            </div>
            <div>
                <button class="btn" onclick="addCart(this)">Add to Cart</button>
                <input type="number" value="0" class="quantity">
                <button class="btn btn-selected manager" onclick="editItem(this)">Edit</button>
            </div>
        </li>`;
}

function menuSort(catagory, data) 
{
    for (let btn of menuSortElem.children)
    {
        if (btn == data)
            btn.classList = "btn btn-selected";
        else
            btn.classList = "btn";
    }

    for (let li of menuList.children)
    {
        if (catagory == "all")
            li.style.display = "";
        else if (li.classList[0] == catagory)
            li.style.display = "";
        else
            li.style.display = "none";
    }

}

function addItem(data) 
{

    if (localStorage.getItem("loggedIn") !== managerObj.email)
        return "Manager not signed in";

    const form = data.parentNode;
    let filledOut = true;
    const item = new MenuItem(
        document.getElementById("iname").value,
        document.getElementById("idesc").value,
        document.getElementById("iprice").value,
        document.getElementById("iurl").value,
        document.getElementById("icata").value.toLowerCase()
    );
    
    if (item.catagory.toLowerCase() === "entrée")
        item.catagory = "entree";

    for (let [key, value] of Object.entries(item)) 
    {
        if (value === "")
        {
            filledOut = false;
            break;
        }
    }

    if (filledOut)
    {
        // add the item at the start of that catagory
        for (let i in menuItems)
        {
            if (menuItems[i].catagory === item.catagory)
            {
                menuItems.splice(i, 0, item);
                localStorage.setItem("menuItems", JSON.stringify(menuItems));
                location.reload();
                break;
            }
        }
    }
}

function removeItem(data)
{
    if (localStorage.getItem("loggedIn") !== managerObj.email)
        return "Manager not signed in";

    const li = data.parentNode;

    for (let i in menuItems)
    {
        if (menuItems[i].name === li.id)
        {
            menuItems.splice(i, 1); 
            break;
        }
    }

    localStorage.setItem("menuItems", JSON.stringify(menuItems));
   
    li.remove();
}

function editItem(data)
{
    const baseLi = data.parentNode.parentNode;
    const baseId = baseLi.id;
    const cataDiv = baseLi.getElementsByClassName("menu-input-cata-div")[0];
    const divs = 
    { 
        imgDiv: baseLi.getElementsByClassName("menu-img-div")[0], 
        titleDiv: baseLi.getElementsByClassName("menu-title-div")[0], 
        descDiv: baseLi.getElementsByClassName("menu-items-p")[0], 
        priceDiv: baseLi.getElementsByClassName("menu-price")[0]
    };
    // editing true if title h4 is displayed
    let editing = ( divs.titleDiv.children[0].style.display === "" ) ? true : false;

    for (let index in divs)
    {
        divs[index].children[0].style.display = !editing ? "" : "none";
        divs[index].children[1].style.display = editing ? "" : "none";
    }
    cataDiv.style.display = editing ? "" : "none";
    
    // change edit button text to confirm when editing
    data.innerText = editing ? "Confirm" : "Edit";

    // just stopped editing
    if (!editing) 
    {
        // make the normal text have the values of the text inputs
        for (let index in divs)
        {
            divs[index].children[0].innerText = divs[index].children[1].value;
        }
        divs.imgDiv.children[0].src = divs.imgDiv.children[1].value;
        baseLi.classList = cataDiv.children[1].value;

        // change the menuItem and JSON to save changes on refresh
        for (let index in menuItems)
        {
            if (menuItems[index].name === baseId)
            {
                menuItems[index].name = divs.titleDiv.children[1].value;
                menuItems[index].desc = divs.descDiv.children[1].value;
                menuItems[index].price = divs.priceDiv.children[1].value;
                menuItems[index].img = divs.imgDiv.children[1].value;
                menuItems[index].catagory = cataDiv.children[1].value;

                localStorage.setItem("menuItems", JSON.stringify(menuItems));
                break;
            }
        }
        
        
    }

}

function showAddBox()
{
    let box = document.getElementsByClassName("manager-add-box")[0];

    box.style.display = box.style.display === "none" ? "" : "none";
}
