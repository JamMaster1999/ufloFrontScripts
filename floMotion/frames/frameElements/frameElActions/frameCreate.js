
function createFrame(lobjID, lobjEl){
    var frameData = []
    var frameObj = {}
    var formAction = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/frame"
    var order = lobjEl.querySelector(".grid-auto-row").children.length + 1
    frameObj.title = "New Frame " + order 
    frameObj.order = order
    frameObj.lobj_id = lobjID
    frameObj.frame = true

    requestPanel()
    var addResponse;
    fetch(formAction, 
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(frameObj)
    })
    .then(res => res.json())
    .then(data => addResponse = data)
    .then(() => createFrameDone(addResponse, lobjEl))
    .catch((error) => {
    console.error('Error:', error);
    responsePanel("error")
    });

}

function createFrameDone(response, lobjEl){
    var frameData = []
    frameData.push(response)
    createFrameNav(frameData,lobjEl)
    renderFrame(frameData, true)
    responsePanel("success")
}

