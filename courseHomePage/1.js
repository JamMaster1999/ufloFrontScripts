var selectComp = {}
var chapterWrapper = document.querySelector("#chaptersWrapper")
var chapterEl = chapterWrapper.children[1].children[0].cloneNode(true)
var lessonsWrapper = document.querySelector("#lessonsWrapper")
var lessonWrapper = document.querySelector("#lobjWrapper")
var chapters
var lessons
var currentLessons
var chapterID
var lessonEl
var lessonDetail
var lobjData
var courseID
var courseList
var courseSelect = document.querySelector("#courseList")
var hostURL = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/"
var selectedChapterID
var selectedLessonID

$.ajaxSetup({
    error: function(xhr, status, error) {
        responsePanel("error")
        //alert("error")
    }
});

$.when($.get(hostURL + 'user/2/courses')).then(function(data,status){
    console.log("$.when > data", data)
    responsePanel("success")
    console.log(status)
    courseList(data[0].course_id)
})

requestPanel()

