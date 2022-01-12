const body = document.body;
function letBodyScroll(bool) {
    if (bool) {
            body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}