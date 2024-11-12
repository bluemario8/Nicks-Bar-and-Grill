let menuList = document.getElementsByClassName("menu-items")[0];
let menuSortElem = document.getElementsByClassName("menu-sort")[0];

function menuSort(catagory, data) 
{
    console.log(catagory);
    console.log(data)

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