import * as basicLightbox from 'basiclightbox';

function showLightbox(photoRef) {
    const lightbox = basicLightbox.create(`<img src="${photoRef}" width="800" height="600"></img> `,
        {
        visible: true,
        });
    lightbox.show();
};

export default showLightbox;




