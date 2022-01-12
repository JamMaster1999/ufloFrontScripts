var testSelectedFrame
function createFrameComp(event,frameEl){
    //testSelectedFrame = selectedFrame

    //for removing the empty state element when a component is added to an empty frame
    
    var compData
    eventPath = event.path
    for (var i=0; i<eventPath.length; i++){
        testSelectedFrame = eventPath[i]
        console.log(eventPath[i].hasAttribute("comp-add"))
        if (eventPath[i].hasAttribute("comp-add") /*&& typeof window[eventPath[i].getAttribute("comp-add")] === "function"*/ ){
            console.log("frame Comp type")
            if (frameEl.querySelector(".grid-auto-row").children.length == 1 && frameEl.querySelector(".grid-auto-row").children[0].classList.contains("empty-state")) {
                frameEl.querySelector(".grid-auto-row").children[0].remove()
            }
            if (eventPath[i].getAttribute("comp-add") === 'text'){
                quillText(compData, getChildElementIndex(frameEl), eventPath[i].getAttribute("comp-add"))
                quillInitSpecific()
            } else if (eventPath[i].getAttribute("comp-add") === 'image'){
                imageData =  {"alt": "testing alt message","url": "https://assets.website-files.com/61365f53652529080f68048b/613a98bd2f8770cd2912d373_picture%20(1).svg","text": "Image Text","type": eventPath[i].getAttribute("image-label")}
                window[eventPath[i].getAttribute("comp-add")](imageData, getChildElementIndex(frameEl), eventPath[i].getAttribute("comp-add"))
            } else if (eventPath[i].getAttribute("comp-add") === 'expandable'){
                window[eventPath[i].getAttribute("comp-add")](compData, getChildElementIndex(frameEl), eventPath[i].getAttribute("comp-add"))
                frameExpandSortable(frameEl.querySelector(".is--expandable"))
            } else {
                console.log("not text or image")
                window[eventPath[i].getAttribute("comp-add")](compData, getChildElementIndex(frameEl), eventPath[i].getAttribute("comp-add"))
            }
            if (eventPath[i].getAttribute("comp-add") === 'video'){ reframe(document.querySelectorAll('.respVideo')) }
            if (eventPath[i].getAttribute("comp-add") === 'latex'){ ResponsiveText() }
            document.getElementsByClassName("frame_comp-list")[0].style.display = "none"
            break;
        }
    }
    contentEditable(frameEl,true)
}

