function contextCoordinate(event){
    event.preventDefault()
    coordinate.x = event.clientX + "px"
    coordinate.y = event.clientY + "px"
}

function contextMenuTrigger(el){
    menuItems = [{}]
    removeContextMenu()
    if (el.getAttribute("comp-type") != null) {
        console.log(el.getAttribute("comp-type"))
        if (el.getAttribute("comp-type") != "tag" & el.getAttribute("comp-type") != "framenav"){
            frameCompContextBasic()
        }
        var funcName = el.getAttribute("comp-type") + "ContextMenu"
        if (typeof window[funcName] === "function"){
            window[funcName]()
        }
        createContext(el)
        letBodyScroll(true)
    }
    
}