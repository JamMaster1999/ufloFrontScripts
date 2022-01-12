var testDebug2
//make sure no element can become fully empty or else they can't click on it
function contentEditable(frameComp, state){
    //console.log("content editable is running")
    //frameComp.parentElement.children[1].contentEditable = state
    //editableStyle(frameComp.parentElement.parentElement.children[1],state)
    for (var i = 0; i < frameComp.children.length; i++){
        testDebug2 = frameComp.children[i]
        if (frameComp.children[i].getAttribute("comp-type") === "latex" || frameComp.children[i].getAttribute("comp-type") === "text" || frameComp.children[i].classList.contains("empty-state")) {console.log("skipping debug");continue;}
            var editableComps = frameComp.children[i].querySelectorAll('p,div,h1,h2,h3,h4.h5,h6')
            if (editableComps.length > 0){
                for (var e=0; e<editableComps.length; e++){
                    if(editableComps[e].tagName === "DIV"){
                        //for when the div has children that have text inside. 
                        var divTextContent = [].reduce.call(editableComps[e].childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '');
                        if (divTextContent === '') {continue;}
                    } 
                //editableComps[e].contentEditable = state 
                editableStyle(editableComps[e],state)
                }
            }
    }
}

function editableStyle(element, state){
    console.log("catching the bug in text", element)
    if (state){
        element.contentEditable = true;
        element.classList.add("is--editable")
    } else {
    element.contentEditable = false;
        element.classList.remove("is--editable")
    }   
}

function expandEditable(state){
    if (state){state = "grid"}
    else { state = "none"}
    var expandables = document.querySelectorAll(".is--expandable")
    for (expandable of expandables){
        expandable.style.display = state  
    }
}

function tagVisible(tagComp, state){

}