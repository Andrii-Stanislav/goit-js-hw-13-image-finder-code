import debounce from "lodash.debounce";

import fetchPhoto from "./services/axiosApi";
import createMarkup from "./createMarkup";
import showLightbox from "./basicLightbox";

const refs = {
    input: document.querySelector('input[name="query"]'),
    photoList: document.querySelector('.gallery'),
    form: document.querySelector('#search-form'),
}

refs.form.addEventListener('submit', (event) => { 
    event.preventDefault();
})

refs.input.addEventListener('input', makeFirstInput());

let infiniteScroll;

function makeFirstInput() {
    return debounce(() => {
        refs.photoList.innerHTML = '';

        const inputText = refs.input.value;

        if (inputText === "") {
            createMarkup.closeShowMoreBtn();
            return
        };
        
        refs.input.setAttribute('data-search-number', 1);
        
        fetchPhoto(inputText, 1)
            .then(({ data }) => { return data.hits })
            .then((images) => { createMarkup.photoList(images) })
            .catch((error) => { console.log(`Error: ${error}`) });
        
        addShowMoreBtn();

        refs.photoList.addEventListener('click', getLargePhoto);
    }, 500);
};

function addShowMoreBtn() {
    createMarkup.showMoreBtn();
    refs.showMoreBtn = document.querySelector('#show-more')
    refs.showMoreBtn.addEventListener('click', showNextPhotos);
};

function showNextPhotos() {
    const inputText = refs.input.value;

    const page = 1 + Number(refs.input.getAttribute('data-search-number'));
    refs.input.setAttribute('data-search-number', page);

    fetchPhoto(inputText, page)
            .then( ({ data }) => { return data.hits })
            .then( (images) => { createMarkup.photoList(images) })
        .catch((error) => { console.log(`Error: ${error}`) });
    
    // Здійснює прокрутку поки ктопка showMore не буде видно. 
    // І я не маю ніякого уявлення, як зробити, щоб і першого разу прокручувало в самий низ докумнту
    // this.scrollIntoView(top);
    window.scrollBy(0, window.innerHeight);
};

function getLargePhoto(event) {    
    event.preventDefault();
    if (event.target === event.currentTarget) { return };

    const originalPhotoRef = event.target.getAttribute('data-large');
    showLightbox(originalPhotoRef);
};

