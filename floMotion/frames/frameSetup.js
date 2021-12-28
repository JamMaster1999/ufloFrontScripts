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

