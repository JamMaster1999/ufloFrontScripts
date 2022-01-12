function createLessons(chapterID){
    currentLessons = lessonsWrapper.querySelector(".grid-auto-row")
    if (currentLessons.children.length > 0){
        currentLessons.innerHTML = ''
    }
    lessons = chapters.find(obj => obj.id == chapterID).lesson_of_chapter
    console.log(lessons)
    lessonEl = document.createElement("lesson")
    lessonEl.classList.add("section_folders_item", "is--border")
    var lessonHTML = '<div class="lesson_tag-grid"><div class="small_tag is--text-color is--solid-border is--weight700 is--right-margin"><div>#1</div></div><div class="small_tag is--text-color is--solid-border is--weight700" ><div>-----</div></div></div><div class="lesson_points-grid"><div class="text is--highlighted is--text-color is--center is--border is--weight700">---</div><div class="text is--text-color is--right-margin is--left-margin is--weight700">/</div><div class="text is--highlighted is--text-color is--center is--border is--weight700">--- pts</div></div><div class="icon-w"><img src="https://assets.website-files.com/61365f53652529080f68048b/61365fad80031d116b44d128_visibility.svg" loading="lazy" alt="visible icon" class="icon-img is--xsmall is--right-margin"><div class="text is--text-color">Mon, Nov 2</div></div><h5 class="is--text-color is--weight400">Chapter 1: Waves and Optics Chapter 1: Waves and Optics </h5>'
    lessonEl.innerHTML = lessonHTML
    if (lessons.length != 0){
        lessons.forEach(function (lesson){
        console.log("lesson name: " + lesson.title)
        lessonEl.children[3].textContent = lesson.title
        lessonEl.children[2].children[1].textContent = visibility(lesson.startTime, lesson.endTime)
        lessonEl.setAttribute("comp-type","lesson")
        lessonEl.setAttribute("compID",lesson.id)
        lessonEl.setAttribute("chapterID",chapterID)
        lessonsWrapper.querySelector(".grid-auto-row").appendChild(lessonEl.cloneNode(true))
        })
        var lessonSortable = lessonsWrapper.querySelector(".grid-auto-row")
        new Sortable(lessonSortable, {
            group:"lesson",
            animation: 250,
            ghostClass: 'blue-background-class',
            //forceFallback: true
        });
    } else {
        emptyState(lessonsWrapper)
    }
}