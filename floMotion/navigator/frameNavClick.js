function frameNavClick(path){
    for (element of path){
        if (element.hasAttribute("compID")){
            if (element.getAttribute("comp-type") === "frame-nav"){
                var url = new URL("https://flomotion-final.webflow.io/student-lobj-copy-2?chapter=" + chapterParam + "&lesson=" + lessonParam + "&lobj=" + lobjParam  + "#frameID" + element.getAttribute("compID"))
                //window.open(url, '_blank');
                window.location.href = url
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
//
//https://flomotion-final.webflow.io/student-lobj-copy-2?chapter=4&lesson=2&lobj=1