var response
var lobj

//var frameWrapper = document.querySelector("#framesWrapper")
var frameWrapper = document.createElement("div")
frameWrapper.classList.add("is--state-holder", "is--active")
frameWrapper.id = "framesWrapper"
document.querySelector(".framerep-w").appendChild(frameWrapper)

var urlParams = new URLSearchParams(window.location.search);

var lobjParam = urlParams.get('lobj')
var chapterParam = urlParams.get('chapter')
var lessonParam = urlParams.get('lesson')

//for latex comps asdfasdf
var latexEls = []  
requestPanel()
fetch("https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/lobj/" + lobjParam)
    .then(res => res.json())
    .then(data => response = data)
    .then(() => frameInit())
    .catch((error) => {
        console.error('Error:', error);
        responsePanel('error')
    });

//frame content when making a post request
//navbar
//frame index on title and actual order on SORT
//dynamic loading of lobj
//dynamic loading of the user

// var navigatorHTML = '<div class="navigator is--solid-border solid--bg-color" style="display: block;"><div class="form_block w-form"><form id="email-form" name="email-form" data-name="Email Form" method="get" class="search_form is--right-margin is--border is--btm-margin" aria-label="Email Form"><img src="https://assets.website-files.com/61365f53652529080f68048b/61365fad80031d0a3e44d126_magnifying-glass.svg" loading="lazy" alt="Search icon" class="icon-img"><input type="text" class="input is--text-color is--transparent w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="Search" id="name-2"></form><div class="w-form-done" tabindex="-1" role="region" aria-label="Email Form success"><div>Thank you! Your submission has been received!</div></div><div class="w-form-fail" tabindex="-1" role="region" aria-label="Email Form failure"><div>Oops! Something went wrong while submitting the form.</div></div></div><div class="nav-lobjs-w"><div class="nav-lobj-w padding is--border is--btm-margin"><h4 class="is--text-color">LOBJ Name</h4><div class="full-width is--thin"></div><div class="grid-auto-row"><a href="#" class="nav-frame-w w-inline-block"><div class="text is--text-color">Frame Name</div></a></div><a href="#" class="button is--theme w-button">Add Frame</a></div></div></div>'
// document.body.appendChild(navigatorHTML)


var lobjNavEl = document.querySelector(".nav-lobj-w").cloneNode(true)
var lobjListEl = document.querySelector(".nav-lobjs-w")
var frameNavEl = document.querySelector(".nav-frame-w").cloneNode(true)
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

//variables
var selectedFrame
var prevAddFrameCompBtn = ''
var frameCompSearch = document.createElement('div');
frameCompSearch.classList.add("search_form", "is--border")
frameCompSearch.innerHTML = '<img src="https://assets.website-files.com/61365f53652529080f68048b/61365fad80031d0a3e44d126_magnifying-glass.svg" loading="lazy" alt="Search icon" class="icon-img"><input type="text" class="input is--text-color is--transparent" placeholder="Search">'

// //assigning right click event listener
frameWrapper.addEventListener("contextmenu", contextMenuTarget)
//searching for desired component
frameCompSearch.querySelector("input").addEventListener('input', function(e) {
    frameCompSearchFunc(e.target.value.toUpperCase())
    //console.log("e.target.value.toUpperCase()", e.target.value.toUpperCase())
})

document.getElementsByClassName("frame_comp-list")[0].addEventListener("click", function(event){createFrameComp(event,selectedFrame)})
//for detecting when expandable, lock or addframecomp has been clicked on
frameWrapper.addEventListener("click", function(event){
    eventPath = event.path
    for (var i=0; i<eventPath.length-3; i++){
        if (eventPath[i].classList.contains("frame_expand-btn")){
            expandableOpen(eventPath[i].nextSibling.outerHTML)
            break;
        } else if (eventPath[i].classList.contains("frame_lock-btn")){
            lock(eventPath[i].parentElement.outerHTML)
            break;
        } else if (eventPath[i].classList.contains("addframecomp")){
            console.log("frame Comp clicked")
            addFrameCompMenu(eventPath[i].parentElement)
            break;
        }
    }
})

//on keydown event listener for flomotion page 1212
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
//modal event listener
document.querySelectorAll("[comp-type='cancel-modal']")[0].addEventListener("click", function (event) {
    removeModal()
})
document.getElementById("popupForm").addEventListener("click", function(e) {
    if(e.target === e.currentTarget){
        removeModal()
    }
})
function frameCompContextBasic(){
    menuItems.push({name:"add", shortcut:"A", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/61671779d468842516fde279_icons8-edit.svg"})
    menuItems.push({name:"copy", shortcut:"C", icon:"https://assets.website-files.com/61365f53652529080f68048b/6178128dc47739483610cc7f_icons8-copy-to-clipboard-3.svg"})
    menuItems.push({name:"paste", shortcut:"V", icon:"https://assets.website-files.com/61365f53652529080f68048b/6178131ed84892069a25c131_icons8-paste-as-text-2.svg"})
    menuItems.push({name:"duplicate", shortcut:"D", icon:"https://assets.website-files.com/61365f53652529080f68048b/6167170a2f04aa0e4dc1726d_icons8-duplicate.svg"})
    menuItems.push({name:"delete", shortcut:"⌫", icon:"https://assets.website-files.com/61365f53652529080f68048b/616719015d15295a1716c870_icons8-empty-trash.svg"})
}

function framenavContextMenu(){
    menuItems.push({name:"copy", shortcut:"C", icon:"https://assets.website-files.com/61365f53652529080f68048b/6178128dc47739483610cc7f_icons8-copy-to-clipboard-3.svg"})
    menuItems.push({name:"paste", shortcut:"V", icon:"https://assets.website-files.com/61365f53652529080f68048b/6178131ed84892069a25c131_icons8-paste-as-text-2.svg"})
    menuItems.push({name:"duplicate", shortcut:"D", icon:"https://assets.website-files.com/61365f53652529080f68048b/6167170a2f04aa0e4dc1726d_icons8-duplicate.svg"})
    menuItems.push({name:"delete", shortcut:"⌫", icon:"https://assets.website-files.com/61365f53652529080f68048b/616719015d15295a1716c870_icons8-empty-trash.svg"})
}

function tagContextMenu(){
    menuItems.push({name:"delete", shortcut:"⌫", icon:"https://assets.website-files.com/61365f53652529080f68048b/616719015d15295a1716c870_icons8-empty-trash.svg"})
}

function latexContextMenu(){
    menuItems.push({name:"symbols", shortcut:"F", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613a81c150fe9dff2cb149a7_info-button.svg"})
}

function tableContextMenu(){
    menuItems.push({name:"popout", shortcut:"P", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613a81c150fe9dff2cb149a7_info-button.svg"})
    menuItems.push({name:"types", shortcut:"P", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613c9f089900f821451fd0bd_right-arrow%20(1).svg"})
    menuItems.push({name:"actions", shortcut:"T", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613c9f089900f821451fd0bd_right-arrow%20(1).svg"})
}

function embedContextMenu(){
    menuItems.push({name:"popout", shortcut:"F", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613a81c150fe9dff2cb149a7_info-button.svg"})
    menuItems.push({name:"embed", shortcut:"T", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613c9f089900f821451fd0bd_right-arrow%20(1).svg"})
}

function imageContextMenu(){
    menuItems.push({name:"layout", shortcut:"F", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613c9f089900f821451fd0bd_right-arrow%20(1).svg"})
    menuItems.push({name:"alt", shortcut:"T", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613c9f089900f821451fd0bd_right-arrow%20(1).svg"})
   
}

function noteContextMenu(){
    menuItems.push({name:"colors", shortcut:"F", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613c9f089900f821451fd0bd_right-arrow%20(1).svg"})
}

function fileContextMenu(){
    menuItems.push({name:"upload", shortcut:"F", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613a81c150fe9dff2cb149a7_info-button.svg"})
}

function linkContextMenu(){
    menuItems.push({name:"url", shortcut:"F", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/613c9f089900f821451fd0bd_right-arrow%20(1).svg"})
}

function presentationModeRightClock(){
    menuItems.push({name:"annotate", shortcut:"N", icon:"https://uploads-ssl.webflow.com/61365f53652529080f68048b/614fc13e481e2c1a9d865217_icons8-note.svg"})
}


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
var target = document.querySelector('div#mainContainer > p')

var observer = new MutationObserver( mutate );
var mutationConfig = { characterData: true, childList: true, subtree: true };

var testMutation
var mutationObs
var mutatedFrameID
var mutationType

function initObservation(state){
    for (frame of frameWrapper.children){
        if (state){
            observer.observe(frame, mutationConfig)
        }
        else {
            observer.unobserve(frame, mutationConfig);
        }
    }
}

function mutate(mutations) {
    mutations.forEach(function(mutation) {
        testMutation = mutation;
        mutationObs = mutation.target;
        if (mutation.type == "characterData"){
            mutationType = "edit"
            frameMutated(mutationObs.parentElement)//.then((id) => consolasdfe.log(id))
            if (mutationObs.parentElement.nodeName == "H5"){
                var newTitle = mutationObs.data
                console.log("frame title changed" + newTitle + mutatedFrameID)
                document.querySelector("#frameNav" + mutatedFrameID).children[0].textContent = newTitle;
            }
        } else if (mutation.type == "childList"){
            mutationType = "add or remove component"
            if (mutation.addedNodes.length != 0){mutationType = "add"; mode(false)}
            if (mutation.addedNodes.length != 0){mutationType = "remove"}
            frameMutated(mutationObs.parentElement)
            var compCount = document.querySelector("#frameID" + mutatedFrameID).querySelector(".grid-auto-row").children.length
            if (compCount == 0){
                emptyState(document.querySelector("#frameID" + mutatedFrameID))
            }
        }
    });
}

var mutationFrameEl
const frameMutated = async function (mutationEl){
    console.log("frameMutated", mutationEl)
    mutationFrameEl = mutationEl;
    if (mutationEl.hasAttribute("comp-type") && mutationEl.getAttribute("comp-type") == "frame"){
        mutatedFrameID = mutationFrameEl.getAttribute("compid")
        mutatedFrameContent(mutationFrameEl)
        return mutationFrameEl.getAttribute("compid")
    } else {
        frameMutated(mutationEl.parentElement);
    }
}
var newFrameContent = []
function mutatedFrameContent(frameEl){
    newFrameContent.push(frameInv(frameEl))
    return frameInv(frameEl)
}

initObservation(true)

//deleteFrame mutation asdfasdf
//check against frameComp for adding or removing the emptyState
//add frame mutation
//frameInv for frame preparation
//backend ready to receive the saved frames





function noEmptyTextbox(element){
    if (element.textContent.length == 1){
        var currentText = element.textContent 
        element.textContent = "Placeholder: " + currentText
    }
}
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
function setState(edit){
    //modify: text comp and latex comp
    if (edit){
        console.log("edit mode")
        frameWrapper.addEventListener("contextmenu", contextMenuTarget)
        lobjListEl.addEventListener("contextmenu", contextMenuTarget)
        var addFrameCompState = 'block'
        var sortDisable = false
    } else if (window.location.href.substring(8).split("/")[1].split("?")[0] == 'presentation') {
        console.log("read-only mode")
        lobjListEl.removeEventListener("contextmenu", contextMenuTarget)
        var addFrameCompState = 'none'
        var sortDisable = true
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
        contentEditable(frame.querySelector(".grid-auto-row"), edit)
        frame.querySelector(".addframecomp").style.display = addFrameCompState
        editableStyle(frame.children[1],edit)
    }
}

function frameInit(){
    responsePanel('success')
    console.log(status)
    lobj = response.lobj
    document.querySelector("#lobjID").setAttribute("lobjID",lobj.id)
    document.querySelector("#lobjID").textContent = "LOBJ:" + lobj.order
    document.querySelector("#lessonID").setAttribute("lessonID",lobj.lesson_id)
    document.querySelector("#lessonID").textContent = "Lesson:" + lobj.lesson_id
    document.querySelector("#chapterID").textContent = "Chapter:" + chapterParam
    document.querySelector("#chapterID").setAttribute("chapterID",chapterParam)
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
    initObservation(true)
    if (window.location.href.substring(8).split("/")[1].split("?")[0] == 'presentation') {setState(false)}
    mode(false)
    theme("peace")
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
var debugSortEvent
function frameSort(event){
    
    debugSortEvent = event
    if (event.from != event.to){
        return;
    } else {
        console.log("new index is" + event.newIndex)
        var frameNavEl = event.item
        var frameID = frameNavEl.getAttribute("compID")
        var frameEl = document.querySelector("#frameID" + frameID)
        if (frameWrapper.children.length-1 == event.newIndex){
            console.log("sorting frames2")
            frameWrapper.insertBefore(frameEl, frameWrapper.children[event.newIndex].nextSibling);
        } else {
            frameEl.remove()
            console.log("sorting frames3")
            frameWrapper.insertBefore(frameEl, frameWrapper.children[event.newIndex] )
        }
        frameIndexRename()
    }
}

function frameIndexRename(){
    for (frame of frameWrapper.children){
        var currentTitle = frame.querySelector("h5").textContent.split(".")
        currentTitle[0] = getChildElementIndex(frame) + 1
        frame.querySelector("h5").textContent = currentTitle.join(".")
        console.log("newTitle" + currentTitle.join("."))
        //currentTitle.subString(currentTitle)
    }
}
//sortable for frame nav components
var navSortable
function frameNavSortable(navList){
    for (let i=0; i < navList.length; i++){
        var frameNavContainer = navList[i].querySelector(".grid-auto-row")
        if (frameNavContainer != null && navList[i].id == "lobjID" + lobjParam){
            navSortable = new Sortable(frameNavContainer, {
                group:"frameNav",
                animation: 250,
                ghostClass: 'blue-background-class',

                onEnd: function(evt){
                    frameSort(evt);
                }
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

function emptyState(frameEl){
    var emptyState = document.createElement("div")
    emptyState.classList.add("empty-state", "section--bg-color", "is--center", "is--weight700", "is--btm-margin")
    var emptyStateHTML = '<div>You have not added any items yet.</div>'
    emptyState.innerHTML = emptyStateHTML
    frameEl.querySelector(".grid-auto-row").appendChild(emptyState)
}
function getChildElementIndex(node) {
    return Array.prototype.indexOf.call(node.parentNode.children, node);
}
function lock(html){
    var lockWrapper = document.querySelector(".frame_lock-w")
    lockWrapper.children[0].innerHTML = html
    document.querySelector("#frameLockOpen").click()
}
function removeModal(){
    var forms = document.getElementById("popupForm").querySelectorAll(".section_popup-form")
    for (var i = 0; i < forms.length; i++) {
        if (forms[i].classList.contains("is--hidden")){
            console.log("hidden modal ")
            continue;
        } else {
            forms[i].classList.add("is--hidden")
            console.log("active modal ")
        }
    }
    document.getElementById("popupTrigger").click()
    console.log(".done > popupTrigger")
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
function mode(type){
    if (type){
        $(".section--bg-color").css("background-color","rgba(255, 255, 255, 0.2)")
        $(".solid--bg-color").css("background-color","white")
        $(".is--solid-border").css("border-color","black")
        $(".is--border").css("border-color","rgba(0, 0, 0, 0.5)")
        $(".is--editable").css("border-color","rgba(0, 0, 0, 0.5)")
        //$(".is--border .is--table").css("border-color","rgba(0, 0, 0, 0.5)")
        $(".is--text-color").css("color","black")
        $(".icon-img").css("filter","invert(100%)")
    }else {
        $(".section--bg-color").css("background-color","rgba(0, 0, 0, 0.3)")
        $(".solid--bg-color").css("background-color","black")
        $(".is--solid-border").css("border-color","white")
        $(".is--border").css("border-color","rgba(255, 255, 255, 0.5)")
        $(".is--editable").css("border-color","rgba(255, 255, 255, 0.5)")
        //$(".is--border .is--table").css("border-color","rgba(255, 255, 255, 0.5)")
        $(".is--text-color").css("color","white")
        $(".icon-img").css("filter","invert(0%)")
    }
}

var peace = "#008ba3"
var magma = "#d66038"
var flow = "#00a367"
var zen = "#7a6561"
var quantum = "#d6387c"
function theme(type){
    var currentTheme = document.querySelector(".section_theme").classList[1]
    document.querySelector(".section_theme").classList.remove(currentTheme)
    document.querySelector(".section_theme").classList.add("is--" + type + "-bg")
    $(".is--theme").css("background-color",eval(type))
    $(".is--theme-border").css("border-color",eval(type))

        //$(".is--theme-hover").css("border-color","black")
        //$(".is--theme-focus").css("border-color","rgba(0, 0, 0, 0.5)")
}



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



function createLOBJs(lobjList){
    lobjList.forEach(function (lobj){
        lobjNavEl.children[0].textContent = lobj.title
        lobjNavEl.id = "lobjID" + lobj.id
        if (lobj.id == lobjParam){lobjNavEl.classList.add("is--theme-border")}
        lobjNavEl.setAttribute("lobjID", lobj.id)
        console.log("lobj created")
        lobjNavEl.querySelector('.grid-auto-row').innerHTML = ""
        createFrameNav(lobj.allFrames, lobjNavEl)
        lobjListEl.appendChild(lobjNavEl.cloneNode(true))
    })
    lobjListEl.children[0].remove()
}
function frameNavClick(path){
    for (element of path){
        if (element.hasAttribute("compID")){
            if (element.getAttribute("comp-type") === "frame-nav"){
                var url = new URL("https://flomotion-final.webflow.io/student-lobj-copy-2?chapter=" + chapterParam + "&lesson=" + lessonParam + "&lobj=" + lobjParam  + "#frameID" + element.getAttribute("compID"))
                //window.open(url, '_blank');
                window.location.href = url
                document.getElementById("frameNavTrigger").click()
                break;
            }
        }
        if (element.classList.contains("button")){
            createFrame(frameLOBJID(element), element.parentElement)
            break;
        }
    }
}

function frameLOBJID(frame){
    var lobjID = frame.parentNode.getAttribute("lobjID")
    return lobjID
}
//
//https://flomotion-final.webflow.io/student-lobj-copy-2?chapter=4&lesson=2&lobj=1
var coordinate = {"x": "0","y": "0"}
var eventPath
//recognizes whether the element has context menu enabled or not;
function contextMenuTarget(event){
    eventPath = event.path
    for (var i=0; i<eventPath.length-1; i++){
        //this conditional is used because of latex element, which uses shadow root
        //this condition skips shadow root elements
        if (eventPath[i].activeElement === undefined & eventPath[i].body === undefined){
            if (eventPath[i].getAttribute("comp-type") != null){
                contextCoordinate(event)
                contextMenuTrigger(eventPath[i])
                console.log(eventPath[i] + "," + i)
                break;
            }
        }
    }
}

function contextCoordinate(event){
    event.preventDefault()
    coordinate.x = event.clientX + "px"
    coordinate.y = event.clientY + "px"
}
//right click triggered
function contextMenuTrigger(el){
    menuItems = [{}]
    removeContextMenu()
    if (el.getAttribute("comp-type") != null) {
        console.log(el.getAttribute("comp-type"))
        if (window.location.href.substring(8).split("/")[1].split("?")[0] == 'presentation'){
            presentationModeRightClock()
        }
        else if (el.getAttribute("comp-type") != "tag" & el.getAttribute("comp-type") != "framenav"){
            frameCompContextBasic()
            var funcName = el.getAttribute("comp-type") + "ContextMenu"
            if (typeof window[funcName] === "function"){
                window[funcName]()
            }
        }
        createContext(el)
        letBodyScroll(true)
    }
}
function createContext(target){
    var menuWrapper = document.createElement("div")
    menuWrapper.classList.add("right-click_menu", "solid--bg-color", "is--solid-border")
    menuItems.forEach(function(item){
        var contextItem = document.createElement("a")
        contextItem.classList.add("right-click_item")
        contextItem.classList.add("is--theme-hover")
        var contextHTML = '<h5 class="is--weight400 is--text-color">Menu Item</h5><h5 class="is--shortcut is--text-color is--weight400">shrtct</h5><img src="" loading="lazy" alt="" class="icon-img is--medium">'
        contextItem.innerHTML = contextHTML
        contextItem.children[0].textContent = item.name
        contextItem.children[1].textContent = item.shortcut
        contextItem.children[2].src = item.icon
        menuWrapper.append(contextItem)
    })
    menuWrapper.children[0].remove()
    console.log(menuWrapper)
    document.body.appendChild(menuWrapper)
    menuWrapper.style.left = coordinate.x;
    menuWrapper.style.top = coordinate.y;
    menuWrapper.addEventListener("click", function(event){
        var action = event.path
        for (var i=0; i<action.length; i++){
            if (action[i].classList != undefined){
                if(action[i].classList.contains("right-click_item")){
                    var funcName = action[i].children[0].textContent + "ContextClicked"
                    removeContextMenu()
                    window[funcName](target)
                }
            }   
        }
    })
}
const body = document.body;
function letBodyScroll(bool) {
    if (bool) {
            body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

function removeContextMenu(){
    if (document.querySelector(".right-click_menu") != null){
        document.querySelector(".right-click_menu").remove()
        letBodyScroll(false)
    }
}



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
    frameCompSortable(document.getElementById("frameID" + response.id).querySelector(".grid-auto-row"))
    responsePanel("success")
}






//type of form submission
var formSubmissionType
//right click menu items
var menuItems = [{}]
//where to send the form to
var hostURL = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/"
var formAction = hostURL
//POST or DELETE
var formMethod
//Data embedded in the form
var formData = {}
//body of the form
var formBody = {}
//header of the form
var formHeader


//submitRequest()
function setupBody(data){
    for (i = 0; i < data.length; i++) {
        var name = data[i].name
        var value = data[i].value
        console.log(name, value)
        formBody[name] = value
    }
}



function deleteContextClicked(element){
    document.getElementById("popupTrigger").click()
    if (element.getAttribute("comp-type") != "frame-nav"){element.remove()}
    else if (element.getAttribute("comp-type") === "frame-nav"){
        console.log(element.getAttribute("compID"))
        deleteFrame(element.getAttribute("compID"))
        document.getElementById("deleteConfirm").classList.remove("is--hidden")
    }
}

var frameDeleteID = 0
function deleteFrame(id){
    formMethod = "DELETE"
    formAction = hostURL + "frame" + "/" + id
    frameDeleteID = id
}

function deleteFrameConfirm(frameID){
    if (document.getElementById("frameID" + frameID) != null){
        document.getElementById("frameID" + frameID).remove()
    }
    document.getElementById("frameNav" + frameID).remove()
}


//form based requests
var Webflow = Webflow || [];
Webflow.push(function() {  
    $(document).off('submit');
    $('form').submit(function(e) {
        e.preventDefault();
        if (frameDeleteID != 0){
            deleteFrameConfirm(frameDeleteID)
            frameDeleteID = 0
        }        
        requestPanel()
        const $form = $(this); // The submitted form
        const $submit = $('[type=submit]', $form); // Submit button of form
        const buttonText = $submit.val(); // Original button text
        const buttonWaitingText = $submit.attr('data-wait'); // Waiting button text value
        const formRedirect = $form.attr('data-redirect'); // Form redirect location
        setupBody($($form).serializeArray())
        formData = $($form).serializeArray()
        var formResponse;
        fetch(formAction, 
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: formMethod,
            body: formBody
        })
        .then(deleteFrameDone)
        .then(data => formResponse = data)
        .catch(console.log);
        if (buttonWaitingText) {
            $submit.val(buttonWaitingText); 
        }
    });
})



const deleteFrameDone = response => {
    if (!response.ok) { 
        responsePanel("error")
        $submit.val(buttonText)
        throw Error(response.statusText);
    } else {
        removeModal();
        responsePanel("success")
        formAction = hostURL
        $submit.val(buttonText);
       return response.json();
       
    }
 }; 

function duplicateContextClicked(element){  
    if (element.getAttribute("comp-type") != "frame-nav"){
        element.parentNode.appendChild(element.cloneNode(true))
    } else if (element.getAttribute("comp-type") === "frame-nav"){
        duplicateFrame(element.getAttribute("compid"), element.parentNode.parentNode.getAttribute("lobjID"))
    }
}
var copyEl
function copyContextClicked(element){
    if (element.getAttribute("comp-type") != "frame-nav"){copyEl = element.cloneNode(true)}
    else if (element.getAttribute("comp-type") === "frame-nav"){
        copyEl = element.getAttribute("compid")
    }
}
function pasteContextClicked(element){
    if (element.getAttribute("comp-type") != "frame-nav"){element.parentNode.appendChild(copyEl)}
    else if (element.getAttribute("comp-type") === "frame-nav"){duplicateFrame(copyEl, element.parentNode.parentNode.getAttribute("lobjID"))}
}
//sorting frames updates their location in the page
var fetchHeaders =  {'Accept': 'application/json','Content-Type': 'application/json'}
var formResponse
function duplicateFrame(frameID, lobjDest){
    formBody = {}
    formMethod = "POST"
    formAction = hostURL + "duplicate/frame"
    formBody.frame_id = frameID
    formBody.lobj_id = lobjDest
    formBody = JSON.stringify(formBody)
    requestPanel()
    fetch(formAction, 
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: formMethod,
            body: formBody
        })
        .then(res => res.json())
        .then(data => addResponse = data)
        .then(() => duplicateFrameDone(addResponse, lobjDest))
        .catch((error) => {
        console.error('Error:', error);
        responsePanel("error")
        });
}

function duplicateFrameDone(response, lobjID){
    var lobjIDAtt = '[lobjID="' + lobjID + '"' + ']'
    var lobjEl = lobjListEl.querySelector(lobjIDAtt)
    var frameData = []
    frameData.push(response)
    responsePanel("success")
    formAction = hostURL
    createFrameNav(frameData,lobjEl)
    console.log("rendering navigator" + lobjID )
    //becomes dynamic based on query parameters
    if (lobjID === lobjParam){
    console.log("rendering frame"); 
    renderFrame(frameData, true)
    frameCompSortable(document.getElementById("frameID" + response.id).querySelector(".grid-auto-row"))
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

function quillText(data, frame, compType){
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
    var toolBasic = [['bold', 'italic','underline'],['blockquote','code-block','formula','link', 'color'],[{'script':'super'},{'script':'sub'}]];
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
        //quill.on('editor-change', function(eventName, ...args) {
//          if (eventName === 'text-change') {
//              // args[0] will be delta
//          } else if (eventName === 'selection-change') {
//              // args[0] will be old range
//          }
//      });
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
    var compHTML = '<div class="text is--weight700 is--text-color is--btm-margin is--center">Keyword</div><div class="fullwidthline is--thin is--btm-margin"></div><div class="text is--top-margin is--text-color is--right-auto">Definition</div>'
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
    var compHTML = '<div class="frame_expand-btn is--expand"><div class="text is--weight700">Expandable</div><div class="frame_comp-lottie-w"><lottie-player src="https://assets.website-files.com/608f687bcd0e4d0c5c2965d2/608f687bcd0e4db43129661b_lf30_editor_0tglqmlm.json" background="transparent"  speed="1"  class="frame_comp-lottie" loop autoplay></lottie-player></div></div><div class="is--expandable grid-auto-row padding is--solid-border"><div class="expandable_panel is--solid-border"></div><h3 class="frame_heading is--text-color is--expandable">Expandable Heading</h3><div class="full-width is--thin"></div><div class="grid-auto-row"></div></div>'
    var setupHTML = document.createElement('expandable');
    setupHTML.classList.add("expandable-w")
    setupHTML.innerHTML = compHTML 
    setupHTML.setAttribute("expandableCount", 0)
    if (typeof data != 'null' && typeof data != 'undefined'){
        setupHTML.querySelector(".is--expandable").querySelector(".frame_heading").textContent = data.desc
        setupHTML.querySelector(".frame_expand-btn").children[0].textContent = data.title
        setupHTML.setAttribute("expandableCount",data.count)
    }
    if (setupHTML.getAttribute("expandableCount") == 0){ {console.log("expandable empty state");emptyState(setupHTML.querySelector(".is--expandable"))}}
    setupHTML.setAttribute("comp-type",compType)
    //setupHTML.addEventListener("contextmenu"), contextTrigger(compType)
    document.querySelectorAll(".frame-w")[frame].querySelector(".grid-auto-row").appendChild(setupHTML.cloneNode(true))
    //data fields: type, heading, subheading
}

function expandableInit(){
    var expandableList = document.querySelectorAll(".expandable-w")
    for (var i=0; i<expandableList.length; i++){
        var expandableContent = expandableList[i].getAttribute("expandableCount")
        console.log("expand length" + expandableContent)
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


function frameCompSearchFunc(searchTerm){
    var frameCompItems = document.getElementsByClassName("frame_comp-list")[0].children
    for (compItem of frameCompItems){
        if (compItem.children[1].textContent.toUpperCase().indexOf(searchTerm) > -1) {
            compItem.style.display = "grid"
        } else { compItem.style.display = "none" }
    }
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
        //create Tags        
        frameWrapper.appendChild(frameEl)
        if (frame.tag_id[0] != null && frame.tag_id[0] != undefined){
            renderTag(frame.tag_id,frameEl)
        }
        // //create Components
        if (frame.content.length != 0){
            renderComps(frame.content,getChildElementIndex(frameEl))
        } else if (frame.content.length == 0){
            emptyState(frameEl)
        }
        contentEditable(frameEl.querySelector(".grid-auto-row"),state)
        editableStyle(frameEl.children[1],state)
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
            console.log("reversing each component")
            compObj.data = window[comp.getAttribute("comp-type")+"Inv"](comp)
            compObj.type = comp.getAttribute("comp-type")
            compObj.order = order
            content.push(compObj)
            if (comp.getAttribute("comp-type") === 'expandable' && comp.getAttribute("expandableCount") > 0){
                console.log("expandable")
                var expandableList = comp.querySelector(".is--expandable").querySelector(".grid-auto-row").children
                if (expandableList.children[0].classList.contains("empty-state") == false){
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
    }
    return content
}


function textInv(compEl){ return quill.getContents(compEl) }

var debugCompEl
function noteInv(compEl){
    debugCompEl = compEl
    var compObj = {}
    compObj.type = compEl.classList[0].substring(4)
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
    compObj.title = compEl.querySelector(".is--expandable").querySelector(".frame_heading").textContent
    compObj.desc = compEl.querySelector(".frame_expand-btn").children[0].textContent

    return compObj
    //data fields: type, heading, subheading
}


function frameInv(frameEl){
    var frameObj = {}
    frameObj.title = frameEl.querySelector("h5").textContent
    frameObj.order = [...frameEl.parentElement.children].indexOf(frameEl)
    frameObj.id = frameEl.id.substring(7)
    frameObj.tag_id = tagInv(frameEl.querySelector(".tag-w").children)
    frameObj.lobj_id = document.querySelector("#lobjID").getAttribute("lobjID")
    frameObj.lesson_id = document.querySelector("#lessonID").getAttribute("lessonID")
    frameObj.chapter_id = document.querySelector("#chapterID").getAttribute("chapterID")
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