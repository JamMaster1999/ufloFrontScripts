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
// //assigning right click event listener
frameWrapper.addEventListener("contextmenu", contextMenuTarget)

function renderTag(tags,frame){
    //var tagEl = frameEl.children[0].children[0].cloneNode(true)
    var tagEl = document.createElement("div")
    tagEl.classList.add("frame_tag", "is--right-margin", "is--solid-border")
    tagEl.innerHTML = '<div> Tag </div>'
    var tagWrapper = frame.querySelector(".tag-w")
    tags.forEach(function(tag){
        //better to use .filter(v => v % 2 === 0).forEach
        if (tag.hidden){
            return
        }
        console.log("tag ID: " + tag[0].id + " title: " + tag[0].name)
        tagEl.children[0].textContent = tag[0].name
        //console.log("tag ID: " + tag[0].id + " title: " + tag[0].name)
        console.log("tag frontend " + tagEl.children[0].textContent)
        tagEl.setAttribute("comp-type","tag")
        tagEl.setAttribute("compID",tag[0].id)
        tagWrapper.appendChild(tagEl.cloneNode(true))
    })
}



function renderComps(components, index){
    components.forEach(function(component){
        if (component.data != null){
            if (typeof window[component.type] === "function"){
                window[component.type](component.data, index, component.type)
            }
            
        }
    })
}



//if text content empty show placeholder 
function expandEditable(state){
    if (state){state = "grid"}
    else { state = "none"}
    var expandables = document.querySelectorAll(".is--expandable")
    for (expandable of expandables){
        expandable.style.display = state 
    }
}

function canvasEditable(canvasComp, state){
    
}
function animationEditable(animationComp, state){
    
}
function tagVisible(tagComp, state){

}
document.onload = function() {

}



function noEmptyTextbox(element){
    if (element.textContent.length == 1){
        var currentText = element.textContent 
        element.textContent = "Placeholder: " + currentText
    }
}



function emptyState(parent){
    var emptyState = document.createElement("div")
    emptyState.classList.add("empty-state", "section--bg-color", "is--center", "is--weight700", "is--btm-margin")
    var emptyStateHTML = '<div>You have not added any items yet.</div>'
    emptyState.innerHTML = emptyStateHTML
    parent.querySelector(".grid-auto-row").appendChild(emptyState)
}

function setState(edit){
    //modify: sortable; ContentEditable; expandable; tag visibility; no right click; no add frame comp
    if (edit){
        console.log("edit mode")
        frameWrapper.addEventListener("contextmenu", contextMenuTarget)
        lobjListEl.addEventListener("contextmenu", contextMenuTarget)
        var addFrameCompState = 'block'
        var sortDisable = false
    } else {
        console.log("read-only mode")
        frameWrapper.removeEventListener("contextmenu", contextMenuTarget)
        lobjListEl.removeEventListener("contextmenu", contextMenuTarget)
        var addFrameCompState = 'none'
        var sortDisable = true
    }
    sortableStatus(sortDisable)
    expandEditable(edit)
    var frameList = document.querySelectorAll(".frame-w")
    for (frame of frameList){
        contentEditable(frame, edit)
        frame.querySelector(".addframecomp").style.display = addFrameCompState
    }
}