console.log("popup.js is loaded")

function popup(str)
{
    // let popupElem = document.getElementsByClassName("popup-home-hidden")[0];
    let popupElem = document.createElement("div");

    popupElem.classList = "popup-home flex";
    popupElem.innerHTML = `
        <div class="popup-box flex">
            <h3>${str}</h3>
            <a href="index.html" class="btn large-text">Home</a>
        </div>`;

    document.body.prepend(popupElem);
}