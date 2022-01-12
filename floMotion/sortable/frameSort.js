var debugSortEvent
function frameSort(event){
    
    debugSortEvent = event
    if (event.from != event.to){
        return;
    } else {
        console.log("new index is" + event.newIndex)
        var frameNavEl = event.item
        var frameID = frameNavEl.getAttribute("compID")
        var frameEl = document.querySelector("#frameID" + frameID)
        if (frameWrapper.children.length-1 == event.newIndex){
            console.log("sorting frames2")
            frameWrapper.insertBefore(frameEl, frameWrapper.children[event.newIndex].nextSibling);
        } else {
            frameEl.remove()
            console.log("sorting frames3")
            frameWrapper.insertBefore(frameEl, frameWrapper.children[event.newIndex] )
        }
        frameIndexRename()
    }
}

function frameIndexRename(){
    for (frame of frameWrapper.children){
        var currentTitle = frame.querySelector("h5").textContent.split(".")
        currentTitle[0] = getChildElementIndex(frame) + 1
        frame.querySelector("h5").textContent = currentTitle.join(".")
        console.log("newTitle" + currentTitle.join("."))
        //currentTitle.subString(currentTitle)
    }
}