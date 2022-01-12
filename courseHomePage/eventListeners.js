document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        removeContextMenu();
    }
};

$("[comp-type='cancel-modal']").click(function (event) {
    removeModal()
})

document.getElementById("popupForm").addEventListener("click", function(e) {
    if(e.target === e.currentTarget){
        removeModal()
    }
})


//on cancel, empty out the variables for form. 12asdf
document.getElementById("chapterBtn").addEventListener("click", function(event){
    //event.preventDefault() is it working
    document.getElementById("createChapter").classList.remove("is--hidden")
    document.getElementById("popupTrigger").click()
    addChapter()
})

document.getElementById("lessonBtn").addEventListener("click", function(event){
    //event.preventDefault()  
    document.getElementById("createLesson").classList.remove("is--hidden")
    document.getElementById("popupTrigger").click()
    addLesson()
})

document.getElementById("lobjBtn").addEventListener("click", function(event){
    //event.preventDefault()
    document.getElementById("createLOBJ").classList.remove("is--hidden")
    document.getElementById("popupTrigger").click()
    addLOBJ();
})

chapterWrapper.addEventListener("click", function (event){
    console.log("clicked")
    eventPath = event.path
    chapterID = selectedChapter(eventPath)
    
})

lessonsWrapper.addEventListener("click", function (event){
    console.log("clicked")
    eventPath = event.path
    lessonID = selectedLesson(eventPath)
})

lessonWrapper.addEventListener("click", function (event){
    console.log("clicked")
    eventPath = event.path
    selectedLOBJ(eventPath)
})

document.querySelector(".section_dashboard").addEventListener("contextmenu", function(event){
    contextMenuTarget(event)
})
