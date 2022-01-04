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


//on cancel, empty out the variables for form. 
document.getElementById("chapterBtn").addEventListener("click", function(event){
    //event.preventDefault()
    document.getElementById("createChapter").classList.remove("is--hidden")
    document.getElementById("popupTrigger").click()
    addAPI("chapter")
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
    addAPI("lobj")
})

function removeModal(){
    var forms = document.getElementById("popupForm").querySelectorAll(".section_popup-form")
    for (var i = 0; i < forms.length; i++) {
        if (forms[i].classList.contains("is--hidden")){
            console.log("hidden modal")
            continue;
        } else {
            forms[i].classList.add("is--hidden")
            console.log("active modal")
        }
    }
    document.getElementById("popupTrigger").click()
    console.log(".done > popupTrigger")
}

