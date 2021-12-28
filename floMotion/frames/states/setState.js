function setState(edit){
    //modify: sortable; ContentEditable; expandable; tag visibility; no right click; no add frame comp
    if (edit){
        console.log("edit mode")
        frameWrapper.addEventListener("contextmenu", contextMenuTarget)
        lobjListEl.addEventListener("contextmenu", contextMenuTarget)
        var addFrameCompState = 'block'
        var sortDisable = false
    } else {
        console.log("read-only mode")
        frameWrapper.removeEventListener("contextmenu", contextMenuTarget)
        lobjListEl.removeEventListener("contextmenu", contextMenuTarget)
        var addFrameCompState = 'none'
        var sortDisable = true
    }
    sortableStatus(sortDisable)
    expandEditable(edit)
    var frameList = document.querySelectorAll(".frame-w")
    for (frame of frameList){
        contentEditable(frame, edit)
        frame.querySelector(".addframecomp").style.display = addFrameCompState
    }
}