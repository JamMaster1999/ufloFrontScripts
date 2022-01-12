function annotateContextClicked(element){
    annotationTextTest = element
    annotationTest = []
    document.getElementById("frameAnnotateOpen").click()
    if (element.getAttribute("comp-type") == "text"){
        console.log("text annotated")
        var range = Quill.find(element).getSelection();
        testTextRange = range
        if (range) {
        if (range.length == 0) {
            console.log('User cursor is at index', range.index);
        } else {
            var text = Quill.find(element).getText(range.index, range.length);
            console.log('User has highlighted: ', text);
        }
        } else {
        console.log('User cursor is not in editor');
        }
    }
    else {
        console.log(element.getAttribute("comp-type"))
        annotationTest.push(element.getAttribute("comp-type"))
        annotationTest.push(getChildElementIndex(element))
        annotationTest.push(element.parentElement.parentElement.getAttribute("compID"))
    }
}
var annotationTest = []
var annotationTextTest
var testTextRange

function createAnnotation(){

}


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
    frameCompSortable(document.getElementById("frameID" + response.id).querySelector(".grid-auto-row"))
    responsePanel("success")
}