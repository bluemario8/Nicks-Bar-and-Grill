class ReviewItem
{
    constructor(name, date, rating, message, email) {
        this.name = name;
        this.date = date;
        this.rating = rating;
        this.message = message;
        this.email = email;
    }
};


const reviewList = document.getElementById("review-list");
const reviewFilter = document.getElementsByClassName("reviews-filter-bar")[0];
const loggedInUser = localStorage.getItem("loggedIn");
// const userData = JSON.parse(localStorage.getItem(loggedInUser));
let createReviewRating = 5;

const defaultReviews =
[
    new ReviewItem("Jessica Smith", "9/23/2024", 5, `Oh my this food tastes
    amazing. There's so many great food options to pick from and I want to try
    them all. Each time I try a new food, it tastes better than the last. `),
    new ReviewItem("Amy Davidson", "6/04/2024", 2, `The food was good, but I had
    a bad impression of the staff. It took a while for me to get my food, they
    kept interupting me, and they got my order wrong. Hopefully, this is a one
    off experience and maybe they were having a rough day, but it doesn't change
    the fact it was bad service`),
    new ReviewItem("Harald Ulterfill", "5/23/2024", 4, `I've heard all the hype
    of this place and was super excited to try it. It was good, but I definitely
    isn't as good as it is hyped to be. Overall, still great food, but not
    absured.`),
    new ReviewItem("Steven Hill", "6/11/2023", 5, `These burgers are the best
    I've ever had. I've heard they were great but now I think that's an
    understatement. If you've never been to Nick's Bar and Grill, you NEED to
    go.`),
    new ReviewItem("Jack Stevens", "5/30/2023", 5, `I was hungry and found this
    place and now I don't know how I lived without it. The food, drinks, and
    service were all incredible. Their spicy burger is 100% my favorite. `),
];

if (localStorage.getItem("reviews") === null)
    localStorage.setItem("reviews", JSON.stringify(defaultReviews));

let reviews = JSON.parse(localStorage.getItem("reviews"));

// adds all the items to the html
for (let review of reviews)
{
    reviewList.innerHTML += genReviewHtml(review);
}

updateOverallRating();


function updateOverallRating()
{
    const overallRatingElem = document.getElementsByClassName("overall-rating")[0];
    const overallStarsElem = document.getElementsByClassName("overall-stars")[0];
    const reviewsNumberElem = 
        document.getElementsByClassName("reviews-number")[0].getElementsByTagName("a")[0];
    let reviewCount = 0;
    let totalReviewStars = 0;
    let overallRating = 0;
    let stars = 0;

    for (let i in reviews)
    {
        totalReviewStars += reviews[i].rating;
        reviewCount++;
    }
    overallRating = Math.round((totalReviewStars / reviewCount + Number.EPSILON) * 100) / 100;

    stars = Math.round(overallRating);
    console.log(genStars(stars));

    overallRatingElem.innerText = overallRating;
    overallStarsElem.innerHTML = genStars(stars);
    reviewsNumberElem.innerText = reviewCount;
}

function genStars(starNum)
{
    let starsHtml = ``;
    for (let stars = 1; stars <= 5; ++stars) 
    {
        if (stars <= starNum)
            starsHtml += `<ion-icon name="star" class="orange-star"></ion-icon>\n`;
        else
            starsHtml += `<ion-icon name="star"></ion-icon>\n`;
    }

    return starsHtml;
}

function genReviewHtml(obj)
{
    let reviewsStars = genStars(obj.rating);
    let userReview = loggedInUser === obj.email

    return `
        <li class="rate-${obj.rating}">
            <div class="reviews-info">
                <p class="reviews-name"><strong>${obj.name}</strong></p>
                <p class="reviews-date">${obj.date}</p>
                <div class="reviews-stars">
                    ${reviewsStars}
                </div>
                ${userReview
                    ? '<button class="btn btn-selected review-delete" onclick="deleteReview(this)">Delete'
                    : ""
                }
                </button>
            </div>

            ${obj.message !== "" ? "<q>" + obj.message + "</q>" : ""}
        </li> `
}

function filterReviews(rating)
{
    for (let li of reviewList.children)
    {
        if (rating === "all")
            li.style.display = "";
        else if (li.classList[0] === `rate-${rating}`)
            li.style.display = "";
        else if (rating === "pos")
        {
            if (li.classList[0] === `rate-5` || li.classList[0] === `rate-4`)
                li.style.display = "";
            else
                li.style.display = "none";
        }
        else if (rating === "crit")
        {
            if (li.classList[0] === `rate-1` || li.classList[0] === `rate-2`)
                li.style.display = "";
            else
                li.style.display = "none";
        }
        else
            li.style.display = "none";
    } 
}

function createReview()
{
    console.log("Creating Review!");

    if (!loggedIn)
    {
        window.location.href = "login.html";
        return;
    }
    if (loggedInUser === "guest")
    {
        window.location.href = "account.html";
        return;
    }

    let reviewElemExist = document.getElementsByClassName("reviews-popup");
    let reviewElem = document.createElement("div");

    if (reviewElemExist.length >= 1)
        return;

    reviewElem.classList = "popup-home flex";
    reviewElem.innerHTML = `
        <ul class="popup-box reviews-popup flex">
            <ion-icon name="close-outline" class="pointer close-x reviews-fixed-x" onclick="closeReview()"></ion-icon>
            <h3>Create a Review!</h3>
            <li>
                <label for="rating">Rating: </label>
                <div class="flex">
                    <button class="star-btn" onclick="updateStarCount(this, 1)">
                        <ion-icon name="star"></ion-icon>
                        </button>
                    <button class="star-btn" onclick="updateStarCount(this, 2)">
                        <ion-icon name="star"></ion-icon>
                    </button>
                    <button class="star-btn" onclick="updateStarCount(this, 3)">
                        <ion-icon name="star"></ion-icon>
                    </button>
                    <button class="star-btn" onclick="updateStarCount(this, 4)">
                        <ion-icon name="star"></ion-icon>
                    </button>
                    <button class="star-btn selected" onclick="updateStarCount(this, 5)">
                        <ion-icon name="star"></ion-icon>
                    </button>
                </div>
            </li>
            <li>
                <label for="comment">Comment (optional): </label>
                <textarea class="reviews-textarea" id="comment" name="comment" rows="10" cols="50" maxlength="500"></textarea>
            </li>
            <a onclick="submitReview(this)" class="btn large-text">Submit Review</a>
        </ul>`;

    document.body.prepend(reviewElem);

    document.getElementsByClassName("reviews-popup")[0].getElementsByClassName("star-btn")[0].focus()
}

function updateStarCount(data, num)
{
    const btnDiv = data.parentNode.children;
    console.log(btnDiv);
    let foundSelected = false;
    createReviewRating = num;

    for (let i = 0; i < btnDiv.length; i++)
    {
        if (i+1 === num)
        {
            btnDiv[i].classList = "star-btn selected";
            btnDiv[i].style.color = "var(--orange)";
            foundSelected = true;
        }
        else
        {
            btnDiv[i].classList = "star-btn";
            btnDiv[i].style.color = !foundSelected ? "var(--orange)" : "var(--black)";
        }
    }
}

function submitReview(data)
{
    if (!loggedIn)
        return;

    const date = new Date;
    // review has name, date, rating, comment, and email
    const review = new ReviewItem(
        userData["firstName"] + ' ' +  userData["lastName"],
        `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
        createReviewRating,
        document.getElementById("comment").value,
        loggedInUser
    );

    // console.log("Rating is: " + createReviewRating);
    // console.log("Name is: " + name);
    // console.log("Comment is: " + comment);
    // console.log("Date is: " + formattedDate);

    console.log(review);

    reviews.unshift(review);

    localStorage.setItem("reviews", JSON.stringify(reviews));

    window.location.href = "reviews.html";
}

function closeReview()
{
    document.getElementsByClassName("popup-home")[0].remove();
}

function deleteReview(data)
{
    let parent = data.parentNode.parentNode;
    let thisComment = parent.getElementsByTagName("q").length > 0
        ? parent.getElementsByTagName("q")[0].innerText
        : "";
    let thisReview = new ReviewItem(
        parent.getElementsByClassName("reviews-name")[0].innerText,
        parent.getElementsByClassName("reviews-date")[0].innerText,
        parseInt(parent.className.replace("rate-", "")),
        thisComment,
        loggedInUser,
    );

    // Remove the review from local storage
    for (let i in reviews)
    {
        if (JSON.stringify(reviews[i]) === JSON.stringify(thisReview))
        {
            console.log("They are equal", reviews[i]);
            reviews.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("reviews", JSON.stringify(reviews));
    window.location.href = "";
}