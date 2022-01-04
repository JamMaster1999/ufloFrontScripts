
function frameSort(event){
    if (event.from != event.to){
        return;
    } else {
        var frameNavEl = event.item
        var frameID = frameNavEl.getAttribute("compID")
        var frameEl = document.querySelector("#frameID" + frameID)
        if (frameWrapper.children.length-1 === event.newIndex){
            frameWrapper.insertBefore(frameEl, frameWrapper.children[event.newIndex].nextSibling);
        } else {
        frameWrapper.insertBefore(frameEl, frameWrapper.children[event.newIndex+1] )
        }
    }
}