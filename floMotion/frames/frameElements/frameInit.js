function frameInit(){
    responsePanel('success')
    console.log(status)
    lobj = response.lobj
    document.querySelector("#lobjID").setAttribute("lobjID",lobj.id)
    document.querySelector("#lobjID").textContent = "LOBJ" + lobj.order
    document.querySelector("#lessonID").setAttribute("lessonID",lobj.lesson_id)
    document.querySelector("#lessonID").textContent = "Lesson" + lobj.lesson_id
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
}