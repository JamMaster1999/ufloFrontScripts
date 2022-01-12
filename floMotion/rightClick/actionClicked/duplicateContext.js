function duplicateContextClicked(element){  
    if (element.getAttribute("comp-type") != "frame-nav"){
        element.parentNode.appendChild(element.cloneNode(true))
    } else if (element.getAttribute("comp-type") === "frame-nav"){
        duplicateFrame(element.getAttribute("compid"), element.parentNode.parentNode.getAttribute("lobjID"))
    }
}
var copyEl
function copyContextClicked(element){
    if (element.getAttribute("comp-type") != "frame-nav"){copyEl = element.cloneNode(true)}
    else if (element.getAttribute("comp-type") === "frame-nav"){
        copyEl = element.getAttribute("compid")
    }
}
function pasteContextClicked(element){
    if (element.getAttribute("comp-type") != "frame-nav"){element.parentNode.appendChild(copyEl)}
    else if (element.getAttribute("comp-type") === "frame-nav"){duplicateFrame(copyEl, element.parentNode.parentNode.getAttribute("lobjID"))}
}
//sorting frames updates their location in the page
var fetchHeaders =  {'Accept': 'application/json','Content-Type': 'application/json'}
var formResponse
function duplicateFrame(frameID, lobjDest){
    formBody = {}
    formMethod = "POST"
    formAction = hostURL + "duplicate/frame"
    formBody.frame_id = frameID
    formBody.lobj_id = lobjDest
    formBody = JSON.stringify(formBody)
    requestPanel()
    fetch(formAction, 
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: formMethod,
            body: formBody
        })
        .then(res => res.json())
        .then(data => addResponse = data)
        .then(() => duplicateFrameDone(addResponse, lobjDest))
        .catch((error) => {
        console.error('Error:', error);
        responsePanel("error")
        });
}

function duplicateFrameDone(response, lobjID){
    var lobjIDAtt = '[lobjID="' + lobjID + '"' + ']'
    var lobjEl = lobjListEl.querySelector(lobjIDAtt)
    var frameData = []
    frameData.push(response)
    responsePanel("success")
    formAction = hostURL
    createFrameNav(frameData,lobjEl)
    console.log("rendering navigator" + lobjID )
    //becomes dynamic based on query parameters
    if (lobjID === lobjParam){
    console.log("rendering frame"); 
    renderFrame(frameData, true)
    frameCompSortable(document.getElementById("frameID" + response.id).querySelector(".grid-auto-row"))
    }   
}