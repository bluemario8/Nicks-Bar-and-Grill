

function genReviewHtml(obj)
{
    return `
        <li>
            <div class="reviews-info">
                <p class="reviews-name"><strong>Harry Smith</strong></p>
                <p class="reviews-date">11/20/2024</p>
                <div class="reviews-stars">
                    <ion-icon name="star" class="orange-star"></ion-icon> 
                    <ion-icon name="star" class="orange-star"></ion-icon> 
                    <ion-icon name="star" class="orange-star"></ion-icon> 
                    <ion-icon name="star" class="orange-star"></ion-icon> 
                    <ion-icon name="star" class="orange-star"></ion-icon> 
                </div>
            </div>

            <q>Got recommended this place by family and loved it.
                The chicken burger was surprisingly my favorite.
            </q>
        </li> `
}