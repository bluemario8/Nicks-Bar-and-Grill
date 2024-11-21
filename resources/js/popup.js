console.log("popup.js is loaded")

function popup(str)
{
    let popupElemExist = document.getElementsByClassName("popup-home");
    let popupElem = document.createElement("div");

    if (popupElemExist.length >= 1)
        return;

    popupElem.classList = "popup-home flex";
    popupElem.innerHTML = `
        <div class="popup-box flex">
            <h3>${str}</h3>
            <a href="index.html" class="btn large-text">Home</a>
        </div>`;

    document.body.prepend(popupElem);

    document.getElementsByClassName("popup-home")[0].getElementsByTagName("a")[0].focus();
}