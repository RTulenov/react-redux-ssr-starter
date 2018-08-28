import FontFaceObserver from 'fontfaceobserver';

// Observer load fonts
const robotoObserver = new FontFaceObserver('Roboto', {});

robotoObserver.load().then(() => {
    document.body.classList.add('loaded-fonts');
}, () => {
    document.body.classList.remove('loaded-fonts');
});
