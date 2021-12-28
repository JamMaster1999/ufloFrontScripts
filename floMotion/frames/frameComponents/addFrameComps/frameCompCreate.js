function createFrameComp(selectedFrame){
    //for removing the empty state element when a componet is added to an empty frame
    if (selectedFrame.querySelector(".grid-auto-row").children.length < 2) {
        if (selectedFrame.querySelector(".grid-auto-row").children[0].classList.contains("empty-state")){
            selectedFrame.querySelector(".grid-auto-row").children[0].remove()
        }
    }
    var compData
    eventPath = event.path
    for (var i=0; i<eventPath.length; i++){
        if (eventPath[i].hasAttribute("comp-add") && typeof window[eventPath[i].getAttribute("comp-add")] === "function" ){
            if (eventPath[i].getAttribute("comp-add") === 'text'){
                window[eventPath[i].getAttribute("comp-add")](compData, getChildElementIndex(selectedFrame), eventPath[i].getAttribute("comp-add"))
                quillInitSpecific()
            } else if (eventPath[i].getAttribute("comp-add") === 'image'){
                imageData =  {"alt": "testing alt message","url": "https://assets.website-files.com/61365f53652529080f68048b/613a98bd2f8770cd2912d373_picture%20(1).svg","text": "Image Text","type": eventPath[i].getAttribute("image-label")}
                window[eventPath[i].getAttribute("comp-add")](imageData, getChildElementIndex(selectedFrame), eventPath[i].getAttribute("comp-add"))
            } else {
                console.log("not text or image")
                window[eventPath[i].getAttribute("comp-add")](compData, getChildElementIndex(selectedFrame), eventPath[i].getAttribute("comp-add"))
            }
            if (eventPath[i].getAttribute("comp-add") === 'video'){ reframe(document.querySelectorAll('.respVideo')) }
            if (eventPath[i].getAttribute("comp-add") === 'latex'){ ResponsiveText() }
            document.getElementsByClassName("frame_comp-list")[0].style.display = "none"
            break;
        }
    }
    contentEditable(selectedFrame,true)
}

function getChildElementIndex(node) {
    return Array.prototype.indexOf.call(node.parentNode.children, node);
}