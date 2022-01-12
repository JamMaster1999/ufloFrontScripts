function selectedLesson(event){
    for (var i=0; i<event.length-1; i++){
        if (event[i].hasAttribute("compID")){
            requestPanel()
            var allLessons = lessonsWrapper.querySelector(".grid-auto-row").children
            for (lesson of allLessons){if (lesson.classList.contains("is--theme")){lesson.classList.remove("is--theme")}}
            event[i].classList.add("is--theme")
            selectedLessonID = event[i].getAttribute("compID")
            lessonRequest(event[i].getAttribute("compID"))
            break
        }
    }
}

function selectedLessonAuto(lessonID){
    var allLessons = lessonsWrapper.querySelector(".grid-auto-row").children
    for (lesson of allLessons){
        if (lesson.classList.contains("is--theme")){lesson.classList.remove("is--theme")}
        if (lesson.getAttribute("compID") === lessonID){lesson.classList.add("is--theme")}
    }
    lessonRequest(lessonID)
}