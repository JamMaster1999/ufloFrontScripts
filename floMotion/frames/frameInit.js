function frameInit(){
    responsePanel('success')
    console.log(status)
    lobj = response.lobj
    document.querySelector("#lobjID").setAttribute("lobjID",lobj.id)
    document.querySelector("#lobjID").textContent = "LOBJ:" + lobj.order
    document.querySelector("#lessonID").setAttribute("lessonID",lobj.lesson_id)
    document.querySelector("#lessonID").textContent = "Lesson:" + lobj.lesson_id
    document.querySelector("#chapterID").textContent = "Chapter:" + chapterParam
    document.querySelector("#chapterID").setAttribute("chapterID",chapterParam)
    //testTag = $frames[0].tag_id
    //frames get rendered
    renderFrame(lobj.frames,"true")
    //lobjs in navigator are created
    createLOBJs(response.lobjs)
    //quill is initialized
    quillInit(false)
    //videos become response
    reframe(document.querySelectorAll('.respVideo'))
    //expandable is initialized
    expandableInit()
    //latex is initialized
    latexInit()
    //responsive text size for 
    ResponsiveText()
    sortableInit(true)
    initObservation(true)
    if (window.location.href.substring(8).split("/")[1].split("?")[0] == 'presentation') {setState(false)}
    mode(false)
    theme("peace")
}