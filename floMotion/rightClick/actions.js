
//delete,copy,paste,duplicate,sort frame
//unique right click for components + copy/paste/duplicate/delete

//contextMenu target: determines if right click is supported
//contextMenu trigger: if supported, unique menu is generated 
//createsContext
//context item is clicked




function copyContextClicked(element){
    if (element.getAttribute("comp-type") != "frame-nav"){duplicateFrameComp(element)}
    else if (element.getAttribute("comp-type") === "frame-nav"){
        deleteAPI(element.getAttribute("compID"))
        document.getElementById("deleteConfirm").classList.remove("is--hidden")
    }
}
function pasteContextClicked(element){
    document.getElementById("createChapter").classList.remove("is--hidden")
}

//function frameLOBJID(frame){
    //     var lobjID = frame.parentNode.getAttribute("lobjID")
    //     return lobjID
    // }





//type of form submission
var formSubmissionType
//right click menu items
var menuItems = [{}]
//where to send the form to
var hostURL = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/"
var formAction = hostURL
//POST or DELETE
var formMethod
//Data embedded in the form
var formData = {}
//body of the form
var formBody = {}
//header of the form
var formHeader


//submitRequest()
function setupBody(data){
    for (i = 0; i < data.length; i++) {
        var name = data[i].name
        var value = data[i].value
        console.log(name, value)
        formBody[name] = value
    }
}


