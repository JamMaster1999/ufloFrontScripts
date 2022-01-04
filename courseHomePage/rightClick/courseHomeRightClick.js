
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() { return this.charAt(0).toUpperCase() + this.slice(1);},
    enumerable: false
});



function frameCompContextBasic(){
    menuItems.push({name:"edit", shortcut:"A", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/61671779d468842516fde279_icons8-edit.svg"})
    menuItems.push({name:"copy", shortcut:"C", icon:"https://assets.website-files.com/61365f53652529080f68048b/6178128dc47739483610cc7f_icons8-copy-to-clipboard-3.svg"})
    menuItems.push({name:"paste", shortcut:"V", icon:"https://assets.website-files.com/61365f53652529080f68048b/6178131ed84892069a25c131_icons8-paste-as-text-2.svg"})
    menuItems.push({name:"duplicate", shortcut:"D", icon:"https://assets.website-files.com/61365f53652529080f68048b/6167170a2f04aa0e4dc1726d_icons8-duplicate.svg"})
    menuItems.push({name:"delete", shortcut:"⌫", icon:"https://assets.website-files.com/61365f53652529080f68048b/616719015d15295a1716c870_icons8-empty-trash.svg"})
}

function contextClicked(){
    document.getElementById("popupTrigger").click()
    removeContextMenu()
}

// function addContextClicked(element){
//     var actionType = element.getAttribute("comp-type")
//     var frameID = element.parent.parent.getAttribute("compID")
//     addAPI(actionType)
//     actionType = actionType.capitalize()
//     document.getElementById("create"+actionType).classList.remove("is--hidden")
//     document.getElementById("create"+actionType).querySelector(".w-form").getElementsByTagName('input')[0].focus()
// }

// function addFrameCompContextClicked(element){
//     var frameID = element.parent.parent.getAttribute("compID")
//     addAPI(actionType)
//     actionType = actionType.capitalize()
//     document.getElementById("create"+actionType).classList.remove("is--hidden")
//     document.getElementById("create"+actionType).querySelector(".w-form").getElementsByTagName('input')[0].focus()
// }

function addAPI(type){
    formMethod = "POST"
    formAction = hostURL + type
    formBody.course_id = courseID 
    formBody.order = chapterWrapper.querySelector(".grid-auto-row").children.length
}

function addLesson(){
    formMethod = "POST"
    formAction = hostURL + 'lesson'
    formBody.chapter_id = selectedChapterID 
    formBody.order = lessonsWrapper.querySelector(".grid-auto-row").children.length
}


function deleteContextClicked(element){
    document.getElementById("deleteConfirm").classList.remove("is--hidden")
    deleteAPI(element.getAttribute("comp-type"),element.getAttribute("compID"))
    //element.remove()
}

function deleteAPI(type, id){
    if (type === "frame-nav"){ type = 'frame'}
    formMethod = "DELETE"
    formAction += type + "/" + id
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


function copyContextClicked(element){
    document.getElementById("createChapter").classList.remove("is--hidden")
}
function pasteContextClicked(element){
    document.getElementById("createChapter").classList.remove("is--hidden")
}

function duplicateContextClicked(element){
    document.getElementById("createChapter").classList.remove("is--hidden")
}







