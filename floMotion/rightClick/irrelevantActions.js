
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() { return this.charAt(0).toUpperCase() + this.slice(1);},
    enumerable: false
});







function addContextClicked(element){
    var frameID = element.parent.parent.getAttribute("compID")
    addAPI(actionType)
    actionType = actionType.capitalize()
    document.getElementById("create"+actionType).classList.remove("is--hidden")
    document.getElementById("create"+actionType).querySelector(".w-form").getElementsByTagName('input')[0].focus()
}

function addFrameCompContextClicked(element){
    var frameID = element.parent.parent.getAttribute("compID")
    addAPI(actionType)
    actionType = actionType.capitalize()
    document.getElementById("create"+actionType).classList.remove("is--hidden")
    document.getElementById("create"+actionType).querySelector(".w-form").getElementsByTagName('input')[0].focus()
}

function addAPI(type){
    formMethod = "POST"
    formAction += type
    formBody.course_id = courseID 
    formBody.order = chapterWrapper.querySelector(".grid-auto-row").children.length
}


function editContextClicked(element){
    var actionType = element.getAttribute("comp-type")
    editAPI(actionType)
    actionType = actionType.capitalize()
    document.getElementById("create"+actionType).classList.remove("is--hidden")
}

function editAPI(type){
    formMethod = "POST"
    formAction += type
    formBody.course_id = courseID 
    formBody.order = chapterWrapper.children[1].children.length
}