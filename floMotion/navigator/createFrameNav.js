var testFrameList
function createFrameNav(frameList,lobjEl){
    testFrameList = frameList;
    frameList.forEach(function (frame){
        frameNavEl.children[0].textContent = frame.title
        frameNavEl.setAttribute("comp-type","frame-nav")
        frameNavEl.setAttribute("compID",frame.id)
        frameNavEl.id = "frameNav" + frame.id
        lobjEl.children[2].appendChild(frameNavEl.cloneNode(true))
    })
}