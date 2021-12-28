function frameInv(frameEl){
    var frameObj = {}
    frameObj.title = frameEl.querySelector("h5").textContent
    frameObj.order = [...frameEl.parentElement.children].indexOf(frameEl)
    frameObj.id = frameEl.id.substring(7)
    frameObj.tag_id = tagInv(frameEl.querySelector(".tag-w").children)
    frameObj.lobj_id = document.querySelector("#lobjID").getAttribute("lobjID")
    frameObj.lesson_id = document.querySelector("#lessonID").getAttribute("lessonID")
    frameObj.frame = true
    frameObj.content = compInv(frameEl.querySelector(".grid-auto-row").children)
    return frameObj
}