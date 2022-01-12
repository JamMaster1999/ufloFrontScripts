function addChapter(){
    formMethod = "POST"
    formAction = hostURL + "chapter"
    formBody.course_id = courseID 
    formBody.order = chapterWrapper.querySelector(".grid-auto-row").children.length
}