//make sure no element can become fully empty or else they can't click on it
function contentEditable(frameComp, state){
    for (var i = 0; i < frameComp.children.length; i++){
        if (frameComp.children[i].getAttribute("comp-type") == "latex" || frameComp.children[i].getAttribute("comp-type") == "text") {continue;}
        var editableComps = frameComp.children[i].querySelectorAll('p,div,h1,h2,h3,h4.h5,h6')
        if (editableComps.length > 0){
            for (var e=0; e<editableComps.length; e++){
                if(editableComps[e].tagName === "DIV"){
                    //for when the div has children that have text inside. 
                    var divTextContent = [].reduce.call(editableComps[e].childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '');
                    if (divTextContent === '') {continue;}
                } 
            editableComps[e].contentEditable = state
            //noEmptyTextbox(editableComps[e])
            }
        }
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