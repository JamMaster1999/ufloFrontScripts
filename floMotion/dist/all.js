// //assigning right click event listener
frameWrapper.addEventListener("contextmenu", contextMenuTarget)
//searching for desired component
frameCompSearch.querySelector("input").addEventListener('input', function(e) {
    frameCompSearchFunc(e.target.value.toUpperCase())
    //console.log("e.target.value.toUpperCase()", e.target.value.toUpperCase())
})

document.getElementsByClassName("frame_comp-list")[0].addEventListener("click", createFrameComp)
//for detecting when expandable, lock or addframecomp has been clicked on
document.querySelector("#framesWrapper").addEventListener("click", function(event){
    eventPath = event.path
    for (var i=0; i<eventPath.length-3; i++){
        if (eventPath[i].classList.contains("frame_expand-btn")){
            expandableOpen(eventPath[i].nextSibling.outerHTML)
            break;
        } else if (eventPath[i].classList.contains("frame_lock-btn")){
            lock(eventPath[i].parentElement.outerHTML)
            break;
        } else if (eventPath[i].classList.contains("addframecomp")){
            addFrameCompMenu(eventPath[i].parentElement)
            break;
        }
    }
})

//on keydown event listener for flomotion page
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        document.querySelector("#frameLockClose").click()
        document.querySelector("#frameExpandClose").click()
        removeContextMenu();
    }
    if (evt.keyCode == 90) {
        document.getElementById("frameNavTrigger").click()
    };
}

lobjListEl.addEventListener("contextmenu", contextMenuTarget)


lobjListEl.addEventListener("click", function(e){
    frameNavClick(e.path)
})
//save events listener
document.getElementById("saveFrame").addEventListener("click", function(){
    allFrameData = []
    var frameList = document.querySelectorAll(".frame-w")
    for (frame of frameList){
        saveFrame(frameInv(frame))
    }
})
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask


import {testExport} from './testingGit.js'
testExport("importing")
function testingGit(print){
    console.log(print + "CDN delivered");
}
console.log("CDN delivered");
testingGit("something")
export function testExport(print){
    console.log(print + "Export")
}
var response
var lobj

//var frameWrapper = document.querySelector("#framesWrapper")
var frameWrapper = document.createElement("div")
frameWrapper.classList.add("is--state-holder", "is--active")
frameWrapper.id = "framesWrapper"
document.querySelector(".framerep-w").appendChild(frameWrapper)

//for quill editor
var editorIDs = []
var editors = []
var editor = {id:"id", text: "id"}
var quillCount = 0
var quill
var selectComp = {}
var editState = true;
//lobj id is recieved from course dashboard
//var lobjID = urlParams.get('lobj')
//const urlParams = new URLSearchParams(window.location.search);


//for latex comps
var latexEls = []  
requestPanel()
fetch("https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/lobj/1")
    .then(res => res.json())
    .then(data => response = data)
    .then(() => frameInit())
    .catch((error) => {
        console.error('Error:', error);
        responsePanel('error')
    });


var allFrameData = []
function saveFrame(frameData){
    var formAction = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/frame/" + frameData.id
    allFrameData.push(frameData)
    // $.ajax(formAction, {
    //     data: frameData,
    //     method: "POST"
    // })
    // .done((res) => {
    //     //responsePanel("success")
    // })
    // .fail((res) => {
    //     //responsePanel("error")
    // })

}
function createFrameNav(frameList,lobjEl){
    frameList.forEach(function (frame){
        frameNavEl.children[0].textContent = frame.title
        frameNavEl.setAttribute("comp-type","frame-nav")
        frameNavEl.setAttribute("compID",frame.id)
        frameNavEl.id = "frameNav" + frame.id
        lobjEl.children[2].appendChild(frameNavEl.cloneNode(true))
    })
}

function createLOBJs(lobjList){
    lobjList.forEach(function (lobj){
        lobjNavEl.children[0].textContent = lobj.title
        lobjNavEl.id = "lobjID" + lobj.id
        lobjNavEl.setAttribute("lobjID", lobj.id)
        createFrameNav(lobj.allFrames, lobjNavEl)
        lobjNavEl.children[2].children[0].remove()
        lobjListEl.appendChild(lobjNavEl.cloneNode(true))
        
    })
    lobjListEl.children[0].remove()
}
function frameNavClick(path){
    for (element of path){
        if (element.hasAttribute("compID")){
            if (element.getAttribute("comp-type") === "frame-nav"){
                console.log("frame Nav clicked")
                window.location.href = "https://flomotion-final.webflow.io/student-lobj-copy#frameID" +  element.getAttribute("compID") 
                document.getElementById("frameNavTrigger").click()
                break;
            }
        }
        if (element.classList.contains("button")){
            var lobjID = element.parentNode.getAttribute("lobjID")
            console.log("create button", lobjID)
            createFrame(lobjID, element.parentElement)
            break;
        }
    }
}
//frame expandable
function frameExpandSortable(expandWrapper){
    if (expandWrapper != null){
        var expandContainer = expandWrapper.querySelector(".grid-auto-row")
        if (expandContainer != 'null'){
            var expandSortable = new Sortable(expandContainer, {
                group:"frameComp",
                animation: 250,
                ghostClass: 'blue-background-class',
            });
            Sortables.push(expandSortable)
        }
    }
}

//frame components that are not expandable
function frameCompSortable(compContainer){
    if (compContainer != null){
        var frameSortable = new Sortable(compContainer, {
            group:"frameComp",
            animation: 250,
            ghostClass: 'blue-background-class',
        });
        Sortables.push(frameSortable)
    }
}
//sortable for frame nav components
function frameNavSortable(navList){
    for (let i=0; i < navList.length; i++){
        var frameNavContainer = navList[i].querySelector(".grid-auto-row")
        if (frameNavContainer != null){
            var navSortable = new Sortable(frameNavContainer, {
                group:"frameNav",
                animation: 250,
                ghostClass: 'blue-background-class',
            });
            Sortables.push(navSortable)
        }
    }
}
//sortable init
var Sortables = []
//sortable for frame components
function sortableInit(){
    var frameList = document.querySelectorAll(".frame-w")
    var navList = document.querySelectorAll(".nav-lobj-w")
    for (frame of frameList){
        frameExpandSortable(frame.querySelector(".is--expandable"))
        frameCompSortable(frame.querySelector(".grid-auto-row"))
    }
    frameNavSortable(navList)
}
function sortableStatus(state){
    Sortables.forEach(function (sortable) {
        sortable.options.disabled = state
    })
}
function frameInit(){
    responsePanel('success')
    console.log(status)
    lobj = response.lobj
    document.querySelector("#lobjID").setAttribute("lobjID",lobj.id)
    document.querySelector("#lobjID").textContent = "LOBJ" + lobj.order
    document.querySelector("#lessonID").setAttribute("lessonID",lobj.lesson_id)
    document.querySelector("#lessonID").textContent = "Lesson" + lobj.lesson_id
    //testTag = $frames[0].tag_id
    //frames get rendered
    renderFrame(lobj.frames,"true")
    //lobjs in navigator are created
    createLOBJs(response.lobjs)
    //quill is initialized
    quillInit(false)
    //videos become response
    reframe(document.querySelectorAll('.respVideo'))
    //expandable is initialized
    expandableInit()
    //latex is initialized
    latexInit()
    //responsive text size for 
    ResponsiveText()
    sortableInit(true)
}
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
function noEmptyTextbox(element){
    if (element.textContent.length == 1){
        var currentText = element.textContent 
        element.textContent = "Placeholder: " + currentText
    }
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


function text(data, frame, compType){
    quillCount = quillCount + 1
    var setupHTML = document.createElement('quill');
    setupHTML.classList.add("is--solid-border")
    var quillElID = "quill" + quillCount
    setupHTML.id = quillElID;
    setupHTML.setAttribute("comp-type",compType)
    document.querySelectorAll(".frame-w")[frame].querySelector(".grid-auto-row").appendChild(setupHTML.cloneNode(true))
    var quillID = "#quill" + quillCount
    editorIDs.push(quillID)
    if (typeof data != 'null' && typeof data != 'undefined'){
        editor.id = quillID
        editor.text = data.text
        editors.push(editor)
    }
}
function quillInitSpecific(){
    var toolFull = [['bold', 'italic','underline','strike'],['blockquote','code-block','formula','link'],[{'script':'super'},{'script':'sub'}],[{'list':'ordered'},{'list':'bullet'}, {'indent':'-1'},{'indent':'+1'}],['color','background']];
    var toolBasic = [['bold', 'italic','underline'],['code-block','formula','link', 'color'],[{'script':'super'},{'script':'sub'}]];
    quill = new Quill(editorIDs[editorIDs.length-1],{
        theme: 'bubble',
        modules: {
        //syntax: true,
            toolbar: toolBasic
        }
    });
        //quill.setContents(text)
        ResponsiveText()
    //data fields: data.text, data.mode, data.permission, data.theme
}

function quillInit(permission){
    var toolFull = [['bold', 'italic','underline','strike'],['blockquote','code-block','formula','link'],[{'script':'super'},{'script':'sub'}],[{'list':'ordered'},{'list':'bullet'}, {'indent':'-1'},{'indent':'+1'}],['color','background']];
    var toolBasic = [['bold', 'italic','underline'],['code-block','formula','link', 'color'],[{'script':'super'},{'script':'sub'}]];
    hljs.configure({   // optionally configure hljs
        languages: ['javascript', 'ruby', 'python']
    });
    for(var k=0; k<editorIDs.length; k++){
        quill = new Quill(editorIDs[k],{
            theme: 'bubble',
            modules: {
            //syntax: true,
            toolbar: toolBasic
        },
        readOnly: permission
        });
        quill.setContents(editors[k].text)
    }
    //data fields: data.text, data.mode, data.permission, data.theme
}

function note(data, frame, compType){
    var compHTML = '<div class="text">Note heading</div><p>Note Message.</p><div class="note_panel"></div></div>'
    var setupHTML = document.createElement('note');
    setupHTML.classList.add("frame_note-w")
    setupHTML.innerHTML = compHTML
    if (typeof data != 'null' && typeof data != 'undefined'){
        var type = "is--" + data.type
        setupHTML.classList.add(type)
        setupHTML.children[0].textContent = data.heading
        setupHTML.children[1].textContent = data.subheading
        setupHTML.children[2].classList.add(type)
    }
    setupHTML.setAttribute("comp-type",compType)
    document.querySelectorAll(".frame-w")[frame].querySelector(".grid-auto-row").appendChild(setupHTML.cloneNode(true))
    //data fields: type, heading, subheading
}
function latex(data, frame, compType){
    var setupHTML = document.createElement('math-field');
    setupHTML.classList.add("latex-editor", "is--solid-border")
    setupHTML.setAttribute("comp-type",compType)
    document.querySelectorAll(".frame-w")[frame].querySelector(".grid-auto-row").appendChild(setupHTML.cloneNode(true))
    if (typeof data != 'null' && typeof data != 'undefined'){
        latexEls.push(data.latex)
        setupHTML.setValue(data.latex)
    }
    //data fields: latex
}
function latexInit(){
    for(var k=0; k<latexEls.length; k++){
        console.log(latexEls[k])
        //k+1 will be removed for production
        document.querySelectorAll(".latex-editor")[k+1].setValue(latexEls[k])
    }
}
function image(data, frame, compType){
    var setupHTML = document.createElement('image');
    if (data.type == "image only" || data.type == "none"){
        setupHTML.classList.add("image-w-vt")
        var compHTML = '<img src="" loading="lazy" alt="image icon">'
        setupHTML.innerHTML = compHTML
        setupHTML.children[0].src = data.url
        setupHTML.children[0].alt = data.alt
    }
    else if (data.type == "image with label vertical" || data.type == "vertical"){
        setupHTML.classList.add("image-w-vt")
        var compHTML = '<img src="" loading="lazy" alt="image icon"><div class="text is--center is--weight700">Image Description</div>'
        setupHTML.innerHTML = compHTML
        setupHTML.children[1].textContent = data.text
        setupHTML.children[0].src = data.url
        setupHTML.children[0].alt = data.alt
    }
    else if (data.type == "image with label horizantal" || data.type == "horizontal"){
        setupHTML.classList.add("image-w-hz")
        var compHTML = '<img src="" loading="lazy" alt="image icon" class="frame_img"><div class="text is--center is--weight700">Image Description</div>'
        setupHTML.innerHTML = compHTML
        setupHTML.children[1].textContent = data.text
        setupHTML.children[0].src = data.url
        setupHTML.children[0].alt = data.alt
    }
    setupHTML.setAttribute("comp-type",compType)
    document.querySelectorAll(".frame-w")[frame].querySelector(".grid-auto-row").appendChild(setupHTML.cloneNode(true))
    //image fields are: type, text, url, alt
}

function link(data, frame, compType){
    //url, text
    var setupHTML = document.createElement('a');
    setupHTML.classList.add("frame_comp-btn")
    setupHTML.classList.add("is--link")
    var compHTML = '<div class="text is--weight700">Link</div><div class="frame_comp-lottie-w"><lottie-player src="https://assets.website-files.com/608f687bcd0e4d0c5c2965d2/608f687bcd0e4db77829661d_lf30_editor_qwwhna60.json" background="transparent"  speed="1"  class="frame_comp-lottie" loop autoplay></lottie-player></div>'
    setupHTML.innerHTML = compHTML
    setupHTML.target = "_blank"
    if (typeof data != 'null' && typeof data != 'undefined'){
        setupHTML.href = data.url
        setupHTML.children[0].textContent = data.text
    }
    setupHTML.setAttribute("comp-type",compType)
    document.querySelectorAll(".frame-w")[frame].querySelector(".grid-auto-row").appendChild(setupHTML.cloneNode(true))
}

function video(data, frame, compType){
    //url
    var setupHTML = document.createElement('iframe');
    setupHTML.classList.add("respVideo")
    if (typeof data != 'null' && typeof data != 'undefined'){
        setupHTML.src = data.url
    } else {setupHTML.src = "https://www.youtube.com/embed/iDyEfKWCzhg"}
    setupHTML.setAttribute("comp-type",compType)
    document.querySelectorAll(".frame-w")[frame].querySelector(".grid-auto-row").appendChild(setupHTML.cloneNode(true))
}

function definition(data, frame, compType){
    var compHTML = '<div class="text is--weight700 is--text-color is--btm-margin">Keyword</div><div class="fullwidthline is--thin is--btm-margin"></div><div class="text is--top-margin is--text-color is--right-auto">Definition</div>'
    var setupHTML = document.createElement('definition');
    setupHTML.classList.add("frame_def-w", "solid--bg-color", "is--flex-vt-ctr-ctr", "is--solid-border", "padding")
    setupHTML.innerHTML = compHTML
    if (typeof data != 'null' && typeof data != 'undefined'){
        setupHTML.children[0].textContent = data.definition
        setupHTML.children[2].textContent = data.explanation
    }
    setupHTML.setAttribute("comp-type",compType)
    //setupHTML.addEventListener("contextmenu"), contextTrigger(compType)
    document.querySelectorAll(".frame-w")[frame].querySelector(".grid-auto-row").appendChild(setupHTML.cloneNode(true))
    //data fields: type, heading, subheading
}

function expandable(data, frame, compType){
    var compHTML = '<div class="frame_expand-btn w-inline-block"><a class="text is--weight700">Expandable</a><div class="frame_comp-lottie-w"><lottie-player src=""https://assets.website-files.com/608f687bcd0e4d0c5c2965d2/608f687bcd0e4db43129661b_lf30_editor_0tglqmlm.json background="transparent"  speed="1"  class="frame_comp-lottie" loop autoplay></lottie-player></div></div><div class="is--expandable grid-auto-row padding is--solid-border"><div class="expandable_panel is--solid-border"></div><h3 class="frame_heading is--expandable">Expandable Heading</h3><div class="full-width is--thin"></div><div class="grid-auto-row"></div></div>'
    var setupHTML = document.createElement('expandable');
    setupHTML.classList.add("expandable-w")
    setupHTML.innerHTML = compHTML
    if (typeof data != 'null' && typeof data != 'undefined'){
        setupHTML.setAttribute("expandableCount",data.count)
    }
    setupHTML.setAttribute("comp-type",compType)
    //setupHTML.addEventListener("contextmenu"), contextTrigger(compType)
    document.querySelectorAll(".frame-w")[frame].querySelector(".grid-auto-row").appendChild(setupHTML.cloneNode(true))
    //data fields: type, heading, subheading
}

function expandableInit(){
    var expandableList = document.querySelectorAll(".expandable-w")
    for (var i=0; i<expandableList.length; i++){
        var expandableContent = expandableList[i].getAttribute("expandableCount")
        if (expandableContent > 0){
            for (var k=0; k<expandableContent; k++){
                expandableList[i].querySelector(".is--expandable").querySelector(".grid-auto-row").appendChild(expandableList[i].nextSibling)
            }
        }
    }
}

function expandableOpen(html){
    console.log(html)
    var expandWrapper = document.querySelector(".frame_expand-w")
    expandWrapper.innerHTML = html
    expandWrapper.children[0].style.display = "grid" 
    document.querySelector("#frameExpandOpen").click()
}








  


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


//variables
var selectedFrame
var prevAddFrameCompBtn = ''
var frameCompSearch = document.createElement('div');
frameCompSearch.classList.add("search_form", "is--border", 'is--theme')
frameCompSearch.innerHTML = '<img src="https://assets.website-files.com/61365f53652529080f68048b/61365fad80031d0a3e44d126_magnifying-glass.svg" loading="lazy" alt="Search icon" class="icon-img"><input type="text" class="input is--text-color is--transparent" placeholder="Search">'

function lock(html){
    var lockWrapper = document.querySelector(".frame_lock-w")
    lockWrapper.children[0].innerHTML = html
    document.querySelector("#frameLockOpen").click()
}
function ResponsiveText(){
    window.onresize = fontResize;
    fontResize()
    function fontResize() {
        //var fontSize = $(".text").css("font-size")
        var fontSize = window.getComputedStyle(document.querySelector(".text")).fontSize;
        var textContainers = document.querySelectorAll(".ql-container")
        for (text of textContainers) { text.style.fontSize = fontSize}
        var latexContainers = document.querySelectorAll(".latex-editor")
        for (latex of latexContainers) { latex.style.fontSize = fontSize}
        //$(".ql-container").css("font-size", fontSize)
        //$(".latex-editor").css("font-size", fontSize)
        
    }
}
function addFrameCompMenu(frameEl){
    document.getElementsByClassName("frame_comp-list")[0].style.display = "flex"
    selectedFrame = frameEl
    if (prevAddFrameCompBtn != '') { prevAddFrameCompBtn.style.display = "flex"}
    var searchWrapper = frameEl.querySelector(".addframecomp")
    searchWrapper.appendChild(frameCompSearch);
    frameCompSearch.querySelector("input").focus()
    searchWrapper.querySelector('.button').style.display = "none"
    document.getElementsByClassName("frame_comp-list")[0].style.top = frameEl.getBoundingClientRect().top + window.scrollY + frameEl.clientHeight + "px"
    //initSearch(frameCompSearch.querySelector(".input"), searchWrapper.querySelector(".frame_comp-list"));
    prevAddFrameCompBtn = searchWrapper.querySelector('.button')
    document.querySelector(".addframe")
}
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
function frameCompSearchFunc(searchTerm){
    var frameCompItems = document.getElementsByClassName("frame_comp-list")[0].children
    for (compItem of frameCompItems){
        if (compItem.children[1].textContent.toUpperCase().indexOf(searchTerm) > -1) {
            compItem.style.display = "grid"
        } else { compItem.style.display = "none" }
    }
}

import {createFrameNav} from './floMotion/navigator/createFrameNav.js';

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
    responsePanel("success")
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
function compInv(components){
    var content = []
    var order = 0
    for (var comp of components){
        order = order + 1
        var compObj = {}
        if (comp.classList.contains("js-reframe")){comp = comp.children[0]}
        if (typeof window[comp.getAttribute("comp-type")+"Inv"] === "function"){
            compObj.data = window[comp.getAttribute("comp-type")+"Inv"](comp)
            compObj.type = comp.getAttribute("comp-type")
            compObj.order = order
            content.push(compObj)
            if (comp.getAttribute("comp-type") === 'expandable'){
                console.log("expandable")
                var expandableList = comp.querySelector(".is--expandable").querySelector(".grid-auto-row").children
                for (var expandItem of expandableList){
                    var expandObj = {}
                    order = order + 1
                    console.log(expandItem.getAttribute("comp-type"))
                    expandObj.data = window[expandItem.getAttribute("comp-type")+"Inv"](expandItem)
                    expandObj.type = expandItem.getAttribute("comp-type")
                    expandObj.order = order
                    console.log(expandObj)
                    content.push(expandObj)
                }
            }
        }
    }
    return content
}
function frameInv(frameEl){
    var frameObj = {}
    frameObj.title = frameEl.querySelector("h5").textContent
    frameObj.order = [...frameEl.parentElement.children].indexOf(frameEl)
    frameObj.id = frameEl.id.substring(7)
    frameObj.tag_id = tagInv(frameEl.querySelector(".tag-w").children)
    frameObj.lobj_id = document.querySelector("#lobjID").getAttribute("lobjID")
    frameObj.lesson_id = document.querySelector("#lessonID").getAttribute("lessonID")
    frameObj.frame = true
    frameObj.content = compInv(frameEl.querySelector(".grid-auto-row").children)
    return frameObj
}
function tagInv(tagList){
    var tagIDs = []
    if (tagList.length > 0) {
        for (tag of tagList){
            tagIDs.push(tag.getAttribute("compID"))
        }
    }
    return tagIDs
}