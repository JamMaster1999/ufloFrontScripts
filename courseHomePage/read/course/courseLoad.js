courseSelect.onchange = function() {
    requestPanel()
    courseID = parseInt(this.value)
    courseLoad(courseID);
}

function courseLoad(courseID){
    var requestURL = hostURL + 'course/' + courseID
    $.when($.get(requestURL)).then(function(data,status){
        responsePanel("success")
        console.log(status)
        $response = data
        chapters = $response.chapter_of_course
        createChapters(chapters)
        if (selectedChapterID != undefined) {
            selectedChapterAuto(selectedChapterID)
            console.log("formSuccess > selectedChapterID", selectedChapterID)
            if (selectedLessonID != undefined) {
                selectedLessonAuto(selectedLessonID)
                console.log("formSuccess > selectedLessonID", selectedLessonID)
            }
        }
    })
}