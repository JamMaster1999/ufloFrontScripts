function selectedChapter(event){
    for (var i=0; i<event.length-1; i++){
        if (event[i].getAttribute("compID") != null){
            var allChapters = chapterWrapper.querySelector(".grid-auto-row").children
            for (chapter of allChapters){if (chapter.classList.contains("is--theme")){chapter.classList.remove("is--theme")}}
            event[i].classList.add("is--theme")
            createLessons(event[i].getAttribute("compID"))
            selectedChapterID = event[i].getAttribute("compID")
            break
        }
    }
}
function selectedChapterAuto(chapterID){
    var allChapters = chapterWrapper.querySelector(".grid-auto-row").children
    for (chapter of allChapters){
        if (chapter.classList.contains("is--theme")){chapter.classList.remove("is--theme")}
        if (chapter.getAttribute("compID") === chapterID){chapter.classList.add("is--theme")}
    }
    createLessons(chapterID)
}
