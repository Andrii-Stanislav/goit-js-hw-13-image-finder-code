import input from "../templates/input-img.hbs";
import photoItems from "../templates/item-photo.hbs";
import showMoreBtn from "../templates/show-more-btn.hbs"

document.body.insertAdjacentHTML("afterBegin", input());
document.body.insertAdjacentHTML("beforeEnd", showMoreBtn());


const photoList = document.querySelector('.gallery');

const createMarkup = {
    photoList(arrayPhoto) {
        arrayPhoto.map((photo) => { photoList.insertAdjacentHTML("beforeEnd", photoItems(photo)) });
    },
    
    showMoreBtn() {
        document.querySelector('.show-more').style.display = 'block';
    },

    closeShowMoreBtn() {
        document.querySelector('.show-more').style.display = 'none';
    },
};

export default createMarkup;