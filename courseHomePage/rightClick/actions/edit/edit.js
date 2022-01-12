function editContextClicked(element){
    var actionType = element.getAttribute("comp-type")
    console.log("editContextClicked > actionType", actionType)
    var elementID = element.getAttribute("compID")
    console.log("editContextClicked > elementID", elementID)
    var elementIndex = [...element.parentElement.children].indexOf(element);
    elementIndex =+ 1;
    aeditAPI(actionType,elementID,elementIndex);
    actionType = actionType.capitalize()
    editFormSetup(actionType, elementID)
}

function editAPI(type, id, order){
    formMethod = "POST"
    formAction = hostURL + type + "/" + id
    formBody.order = order
    if (type == "chapter"){formBody.course_id = courseID }
    else if (type == "lesson"){formBody.chapter_id = selectedChapterID }
    else if (type == "lobj"){formBody.lesson_id = selectedLessonID }
}
var allInputs = []
var editData
function editFormSetup(type, id){
    allInputs = []
    editData = {}
    var formEl = document.getElementById("create"+type)
    formEl.classList.remove("is--hidden")
    console.log("type",type)
    if (type == "Chapter") {console.log("chapter"); editData = chapters.find(obj => obj.id == id)}
    if (type == "Lesson") {console.log("lesson"); editData = lessons.find(obj => obj.id == id)}
    if (type == "Lobj") {console.log("lobj"); editData = lobjData.find(obj => obj.id == id)}
    var allFormEls = formEl.querySelector(".form_block").children[0].children
    
    for (formEl of allFormEls){
        if (formEl.name != undefined){allInputs.push(formEl)}
        else if (formEl.classList.contains("w-embed")) {allInputs.push(formEl.children[0])}
    }
    allInputs.forEach(function(input){
        var testingSomethingNew
        var inputName = input.name; 
        if (input.type == 'datetime-local'){
            if (editData[inputName] != 0 || editData[inputName] != null){
                var formatDate = new Date(editData[inputName]).toISOString().slice(0,-8)
                input.value = formatDate
            } else {return;}
        } else {input.value = editData[inputName]}
    })
}

