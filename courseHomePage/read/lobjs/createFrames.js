function createFrames(frameList){
    frameList.forEach(function(frame){
    var lobjFrameEl = document.createElement("a")
    lobjFrameEl.classList.add("frame-link", "text", "is--text-color")
    lobjFrameEl.textContent = frame.order + ". " + frame.title 
    lobjEl.querySelector(".frames-w").appendChild(lobjFrameEl)
    })
    
}