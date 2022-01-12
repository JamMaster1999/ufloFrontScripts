function setState(edit){
    //modify: text comp and latex comp
    if (edit){
        console.log("edit mode")
        frameWrapper.addEventListener("contextmenu", contextMenuTarget)
        lobjListEl.addEventListener("contextmenu", contextMenuTarget)
        var addFrameCompState = 'block'
        var sortDisable = false
    } else if (window.location.href.substring(8).split("/")[1].split("?")[0] == 'presentation') {
        console.log("read-only mode")
        lobjListEl.removeEventListener("contextmenu", contextMenuTarget)
        var addFrameCompState = 'none'
        var sortDisable = true
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
        contentEditable(frame.querySelector(".grid-auto-row"), edit)
        frame.querySelector(".addframecomp").style.display = addFrameCompState
        editableStyle(frame.children[1],edit)
    }
}
