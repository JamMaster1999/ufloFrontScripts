//right click triggered
function contextMenuTrigger(el){
    menuItems = [{}]
    removeContextMenu()
    if (el.getAttribute("comp-type") != null) {
        console.log(el.getAttribute("comp-type"))
        if (window.location.href.substring(8).split("/")[1].split("?")[0] == 'presentation'){
            presentationModeRightClock()
        }
        else if (el.getAttribute("comp-type") != "tag" & el.getAttribute("comp-type") != "framenav"){
            frameCompContextBasic()
            var funcName = el.getAttribute("comp-type") + "ContextMenu"
            if (typeof window[funcName] === "function"){
                window[funcName]()
            }
        }
        createContext(el)
        letBodyScroll(true)
    }
}