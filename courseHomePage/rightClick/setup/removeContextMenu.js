
function removeContextMenu(){
    if (document.querySelector(".right-click_menu") != null){
        document.querySelector(".right-click_menu").remove()
        letBodyScroll(false)
    }
}