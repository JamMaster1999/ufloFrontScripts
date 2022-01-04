// //assigning right click event listener
frameWrapper.addEventListener("contextmenu", contextMenuTarget)
//searching for desired component
frameCompSearch.querySelector("input").addEventListener('input', function(e) {
    frameCompSearchFunc(e.target.value.toUpperCase())
    //console.log("e.target.value.toUpperCase()", e.target.value.toUpperCase())
})

document.getElementsByClassName("frame_comp-list")[0].addEventListener("click", createFrameComp)
//for detecting when expandable, lock or addframecomp has been clicked on
document.querySelector("#framesWrapper").addEventListener("click", function(event){
    eventPath = event.path
    for (var i=0; i<eventPath.length-3; i++){
        if (eventPath[i].classList.contains("frame_expand-btn")){
            expandableOpen(eventPath[i].nextSibling.outerHTML)
            break;
        } else if (eventPath[i].classList.contains("frame_lock-btn")){
            lock(eventPath[i].parentElement.outerHTML)
            break;
        } else if (eventPath[i].classList.contains("addframecomp")){
            addFrameCompMenu(eventPath[i].parentElement)
            break;
        }
    }
})

//on keydown event listener for flomotion page
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        document.querySelector("#frameLockClose").click()
        document.querySelector("#frameExpandClose").click()
        removeContextMenu();
    }
    if (evt.keyCode == 90) {
        document.getElementById("frameNavTrigger").click()
    };
}

lobjListEl.addEventListener("contextmenu", contextMenuTarget)


lobjListEl.addEventListener("click", function(e){
    frameNavClick(e.path)
})
//save events listener
document.getElementById("saveFrame").addEventListener("click", function(){
    allFrameData = []
    var frameList = document.querySelectorAll(".frame-w")
    for (frame of frameList){
        saveFrame(frameInv(frame))
    }
})
//modal event listener
document.querySelectorAll("[comp-type='cancel-modal']")[0].addEventListener("click", function (event) {
    removeModal()
})
document.getElementById("popupForm").addEventListener("click", function(e) {
    if(e.target === e.currentTarget){
        removeModal()
    }
})