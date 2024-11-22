class ReviewItem
{
    constructor(name, date, rating, message) {
        this.name = name;
        this.date = date;
        this.rating = rating;
        this.message = message;
    }
};


const reviewList = document.getElementById("review-list");
const reviewFilter = document.getElementsByClassName("reviews-filter-bar")[0];

const defaultReviews =
[
    new ReviewItem("Steven Hill", "6/11/2023", 5, `These burgers are the best
    I've ever had. I've heard they were great but now I think that's an
    understatement. If you've never been to Nick's Bar and Grill, you NEED to
    go.`),
    new ReviewItem("Jessica Smith", "9/23/2024", 5, `Oh my this food tastes
    amazing. There's so many great food options to pick from and I want to try
    them all. Each time I try a new food, it tastes better than the last. `),
    new ReviewItem("Jack Stevens", "5/30/2023", 5, `I was hungry and found this
    place and now I don't know how I lived without it. The food, drinks, and
    service were all incredible. Their spicy burger is 100% my favorite. `),
    new ReviewItem("Harald Ulterfill", "5/23/2024", 4, `I've heard all the hype
    of this place and was super excited to try it. It was good, but I definitely
    isn't as good as it is hyped to be. Overall, still great food, but not
    absured.`),
    new ReviewItem("Amy Davidson", "6/04/2024", 2, `The food was good, but I had
    a bad impression of the staff. It took a while for me to get my food, they
    kept interupting me, and they got my order wrong. Hopefully, this is a one
    off experience and maybe they were having a rough day, but it doesn't change
    the fact it was bad service`),
];

if (localStorage.getItem("reviews") === null)
    localStorage.setItem("reviews", JSON.stringify(defaultReviews));

let reviews = JSON.parse(localStorage.getItem("reviews"));

// adds all the items to the html
for (let review of reviews)
{
    reviewList.innerHTML += genReviewHtml(review);
}


function genReviewHtml(obj)
{
    let reviewsStars = ``;
    for (let stars = 1; stars <= 5; ++stars) 
    {
        if (stars <= obj.rating)
            reviewsStars += `<ion-icon name="star" class="orange-star"></ion-icon>\n`;
        else
            reviewsStars += `<ion-icon name="star"></ion-icon>\n`;
    }

    return `
        <li class="rate-${obj.rating}">
            <div class="reviews-info">
                <p class="reviews-name"><strong>${obj.name}</strong></p>
                <p class="reviews-date">${obj.date}</p>
                <div class="reviews-stars">
                    ${reviewsStars}
                </div>
            </div>

            <q>${obj.message}</q>
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
        else
            li.style.display = "none";
    } 
}