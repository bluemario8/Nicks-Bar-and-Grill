let headerHtml = `
    <nav class="nav-bar flex">
        <div class="flex flex-left">
            <a href="index.html"><img class="nav-logo" src="images/basic/logo-no-background.png" alt="Nick's Bar and Grill Logo"></a>
            <h2>Nick's Bar and Grill</h2>
        </div>

        <div class="flex-right">
            <ul class="nav-items flex flex-right">
                <li>
                    <a class="nav-link" href="index.html">
                        <ion-icon class="nav-icon" name="home-outline"></ion-icon>
                    </a>
                </li>
                <li>
                    <a class="nav-link" href="#">
                        <ion-icon class="nav-icon" name="ribbon-outline"></ion-icon>
                    </a>
                </li>
                <li>
                    <a class="nav-link" href="menu.html">
                        <ion-icon class="nav-icon" name="fast-food-outline"></ion-icon>
                    </a>
                </li>
                <li>
                    <a class="nav-link pointer" onclick="displayCart()">
                        <ion-icon class="nav-icon" name="cart-outline"></ion-icon>
                    </a>
                </li>
                <li>
                    <a class="nav-link" href="#">
                        <ion-icon class="nav-icon" name="person-circle-outline"></ion-icon>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    <div id="login-bar" class="flex">
        <a class="login-bar-link btn" href="login.html">Login / Sign Up</a>
    </div>
`;


document.getElementById("header").innerHTML = headerHtml;

if (localStorage.getItem("loggedIn") !== null && localStorage.getItem("loggedIn") !== "") {
    document.getElementById("login-bar").style.display = "none";
}