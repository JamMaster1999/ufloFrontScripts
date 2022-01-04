function frameNavClick(path){
    for (element of path){
        if (element.hasAttribute("compID")){
            if (element.getAttribute("comp-type") === "frame-nav"){
                window.location.href = "https://flomotion-final.webflow.io/student-lobj-copy#frameID" +  element.getAttribute("compID") 
                document.getElementById("frameNavTrigger").click()
                break;
            }
        }
        if (element.classList.contains("button")){
            createFrame(frameLOBJID(element), element.parentElement)
            break;
        }
    }
}

function frameLOBJID(frame){
    var lobjID = frame.parentNode.getAttribute("lobjID")
    return lobjID
}