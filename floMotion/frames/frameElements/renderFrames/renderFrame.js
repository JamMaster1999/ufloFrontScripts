function renderFrame(frames,state){
    frames.forEach(function (frame, frameOrder){
        var frameEl = document.createElement('frameItem')
        frameEl.classList.add('frame-w', 'section--bg-color', 'is--text-color','is--border')
        var frameHTML = '<div class="tag-w"></div><h5>1. Frame Heading</h5><div class="fullwidthline is--thin"></div><a href="#" class="frame_lock-btn is--border w-inline-block"><img src="https://assets.website-files.com/61365f53652529080f68048b/617815db14f5908336a66eb0_icons8-lock-3.svg" loading="lazy" alt="" class="icon-img"></a><div class="grid-auto-row"></div><div class="addframecomp"><a href="#" class="button is--text-color is--theme">Add Frame Comp</a></div>'
        frameEl.innerHTML = frameHTML
        frameEl.setAttribute("compID",frame.id)  
        frameEl.setAttribute("comp-type","frame")
        frameEl.id = "frameID" + frame.id
        frameEl.children[1].textContent = frame.order + ". " + frame.title
        frameEl.children[1].contentEditable = state
        //create Tags
        frameWrapper.appendChild(frameEl)
        if (frame.tag_id[0] != null ){
            renderTag(frame.tag_id,frameEl)
        }
        // //create Components
        if (frame.content.length != 0){
            renderComps(frame.content,frameOrder)
        } else if (frame.content.length == 0){
            emptyState(frameEl)
        }
        
        contentEditable(frameEl.querySelector(".grid-auto-row"),'true')
    })
}