function createLOBJs(lobjList){
    //empty all current elements
    var selectedLesson = lessonWrapper.querySelector(".grid-auto-row")
    if (selectedLesson.children.length > 0){
        selectedLesson.innerHTML = ''
    }
    if (lobjList.length > 0){
        lobjList.forEach(function (lobj){
            var lobjEl = document.createElement("div")
            lobjEl.classList.add("lobj-grid","is--border")
            var lobjHTML = '<div class="lobj-numbers"><div class="icon_wrapper"><div class="icon_wrapper"><img src="https://assets.website-files.com/61365f53652529080f68048b/6149f9445288582cdd4a4739_icons8-ranking.svg" alt="" class="icon-img is--xsmall is--right-margin" style="filter: invert(100%);"><div class="text is--text-color" style="color: rgb(0, 0, 0);">---&nbsp; / --- pts</div></div></div><div class="icon_wrapper"><img src="https://assets.website-files.com/61365f53652529080f68048b/6149c5de0e3c32876ed77a41_icons8-content-2.svg" alt="" class="icon-img is--xsmall is--right-margin" style="filter: invert(100%);"><div class="text is--text-color" style="color: rgb(0, 0, 0);">10 Frames</div></div><div class="heightline"></div><div class="icon_wrapper"><img src="https://assets.website-files.com/61365f53652529080f68048b/6149c582e966ca33b609fa09_icons8-clock.svg" alt="" class="icon-img is--xsmall is--right-margin" style="filter: invert(100%);"><div class="text is--text-color" style="color: rgb(0, 0, 0);">25 Mins</div></div><div class="heightline"></div><div class="icon_wrapper"><img src="https://assets.website-files.com/61365f53652529080f68048b/6149c66b330febec5b46dcc2_icons8-ask-question.svg" alt="" class="icon-img is--xsmall is--right-margin" style="filter: invert(100%);"><h6 class="is--text-color is--weight400" style="color: rgb(0, 0, 0);">0 Q</h6></div></div><h4 style="color: rgb(0, 0, 0);" class="is--text-color">What is statistics</h4><div class="paragraph is--text-color" style="color: rgb(0, 0, 0);">Statistics is the study of different disciplines to understand hwo they realte to each each other thorugh numbers.fsdfsdf</div>'
            lobjEl.innerHTML = lobjHTML
            console.log("frame count" + lobj.frame_of_lobj.length)
            lobjEl.querySelector(".lobj-numbers").children[1].children[1].textContent = lobj.frame_of_lobj.length + " Frames"
            lobjEl.querySelector(".lobj-numbers").children[3].children[1].textContent = lobj.timeExp + " Mins"
            lobjEl.children[1].textContent = lobj.title
            lobjEl.children[2].textContent = lobj.desc
            lobjEl.setAttribute("comp-type","lobj")
            lobjEl.setAttribute("compID",lobj.id)
            lobjEl.setAttribute("lessonID",selectedLessonID)
            lobjEl.setAttribute("chapterID",selectedChapterID)
            selectedLesson.appendChild(lobjEl)
            if (lobj.frame_of_lobj.length > 0){
                //createFrames(lobj.frame_of_lobj)
            } else {
                //emptyState(lobjEl)
            }
        })
        var lobjSortable = lessonWrapper.querySelector(".grid-auto-row")
        new Sortable(lobjSortable, {
            group:"lobj",
            animation: 250,
            ghostClass: 'blue-background-class',
            //forceFallback: true
        }); 
    } else {
        emptyState(lessonWrapper)
    }
}