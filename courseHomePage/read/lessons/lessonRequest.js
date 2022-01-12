function lessonRequest(lessonID){
    var route = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/lesson/" + lessonID
    $.when($.get(route)).then(function(data,status){
        console.log(status)
        console.log(data)
        lessonDetail = data.lesson
        lobjData = lessonDetail.lobj_of_lesson
        responsePanel("success")
        //$chapters = $response.chapter_of_course
        lessonDetails(lessonDetail, lobjData)
    
    }) 
}

function lessonDetails(content, lobjs){
    lessonWrapper.children[0].textContent = content.title
    lessonWrapper.children[1].textContent = content.desc
    createLOBJs(lobjs)
}