function createChapters(chapterList){
    chapterWrapper.children[1].innerHTML = ''
    if (chapterList.length > 0){
        chapterList.forEach(function (chapter){
            chapterEl.children[0].textContent = chapter.order + ". " + chapter.title
            chapterEl.setAttribute("comp-type","chapter")
            chapterEl.setAttribute("compID",chapter.id)
            chapterWrapper.querySelector(".grid-auto-row").appendChild(chapterEl.cloneNode(true))
        })
        var chapterSortable = chapterWrapper.querySelector(".grid-auto-row")
        new Sortable(chapterSortable, {
            group:"chapter",
            animation: 250,
            ghostClass: 'blue-background-class',
            //forceFallback: true
        });
    } else {
        emptyState(chapterWrapper)
    }
}