const body = document.body;
function letBodyScroll(bool) {
    if (bool) {
            body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

function removeContextMenu(){
    if (document.querySelector(".right-click_menu") != null){
        document.querySelector(".right-click_menu").remove()
        letBodyScroll(false)
    }
}