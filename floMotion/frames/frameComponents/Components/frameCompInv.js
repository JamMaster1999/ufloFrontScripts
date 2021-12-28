

function textInv(compEl){ return quill.getContents(compEl) }


function noteInv(compEl){
    var compObj = {}
    compObj.type = compEl.classList[1].substring(4)
    compObj.heading = compEl.children[0].textContent 
    compObj.subheading = compEl.children[1].textContent
    return compObj
}
function latexInv(compEl){
    var compObj = {}
    compObj.latex = compEl.getValue()
    return compObj
    //data fields: latex
}

function imageInv(compEl){
    var compObj = {}
    compObj.url = compEl.children[0].src;
    compObj.alt = compEl.children[0].alt
    if (compEl.children.length = 1){ compObj.type = "none"; compObj.text = "" }
    else if (compEl.classList[0] === "image-w-hz"){ compObj.type = "horizontal"; compObj.text = compEl.children[1].textContent}
    else { compObj.type = "vertical"; compObj.text = compEl.children[1].textContent}
    return compObj
    //image fields are: type, text, url, alt
}

function linkInv(compEl){
    var compObj = {}
    compObj.url = compEl.href
    compObj.text = compEl.children[0].textContent
    return compObj
    //url, text
}

function videoInv(compEl){
    var compObj = {}
    compObj.url = compEl.src
    return compObj
    //url
}

function definitionInv(compEl){
    var compObj = {}
    compObj.definition = compEl.children[0].textContent
    compObj.explanation = compEl.children[2].textContent
    return compObj
    //data fields: type, heading, subheading
}


function expandableInv(compEl){
    var count = compEl.querySelector(".is--expandable").querySelector(".grid-auto-row").children.length
    var compObj = {}
    compObj.count = count
    return compObj
    //data fields: type, heading, subheading
}

