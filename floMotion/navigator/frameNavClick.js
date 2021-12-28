function frameNavClick(path){
    for (element of path){
        if (element.hasAttribute("compID")){
            if (element.getAttribute("comp-type") === "frame-nav"){
                console.log("frame Nav clicked")
                window.location.href = "https://flomotion-final.webflow.io/student-lobj-copy#frameID" +  element.getAttribute("compID") 
                document.getElementById("frameNavTrigger").click()
                break;
            }
        }
        if (element.classList.contains("button")){
            var lobjID = element.parentNode.getAttribute("lobjID")
            console.log("create button", lobjID)
            createFrame(lobjID, element.parentElement)
            break;
        }
    }
}