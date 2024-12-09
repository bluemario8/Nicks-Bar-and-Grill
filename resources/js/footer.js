let footerHtml = `
    <div class="flex row">
        <ul class="footer-list flex flex-left">
            <li>
                <a href="menu.html">Menu</a>
            </li>
            <li>
                <a href="rewards.html">Rewards</a>
            </li>
            <li>
                <a href="reviews.html">Reviews</a>
            </li>
        </ul>
        <ul class="footer-list flex flex-right">
            <li>
                <a href="https://youtu.be/uHgt8giw1LY">
                    <ion-icon name="logo-youtube"></ion-icon>
                </a>
            </li>
            <li>
                <a href="https://x.com">
                    <ion-icon name="logo-twitter"></ion-icon>
                </a>
            </li>
            <li>
                <a href="https://instagram.com">
                    <ion-icon name="logo-instagram"></ion-icon>
                </a>
            </li>
            <li>
                <a href="https://facebook.com">
                    <ion-icon name="logo-facebook"></ion-icon>
                </a>
            </li>
        </ul>
    </div>
`;

// let footerElem = document.getElementById("footer");
document.getElementById("footer").innerHTML = footerHtml;
document.getElementById("footer").classList = "section nunito-sans";

