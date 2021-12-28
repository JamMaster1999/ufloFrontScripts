
//<script src="https://www.codehim.com/demo/jquery-sortable-js/Sortable.js"></script>



var $response
var $lobj
var $frames
var testTag
var $frameWrapper = $("#framesWrapper")
//for quill editor
var editorIDs = []
var editors = []
var editor = {id:"id", text: "id"}
var quillCount = 0
var quill
var selectComp = {}

//for latex comps
var latexEls = []  
$.when($.get("https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/lobj/1")).then(function(data,status){
    console.log(status)
    $response = data
    $lobj = $response.lobj
    $frames = $lobj.frames
    testTag = $frames[0].tag_id
    
    $frames.forEach(function (frame, frameOrder){
        frameIndex = frameOrder + 5
        console.log(frameIndex)
        var frameEl = $(".frame-w")[0].cloneNode(true)
        var tagEl = frameEl.children[0].children[0].cloneNode(true)
        var tagWrapper = frameEl.children[0]    
        frameEl.setAttribute("comp-type","frame")
        frameEl.setAttribute("frameID",frame.id)   
        //frameEl.id = frame.id
        frameEl.children[1].textContent = frame.order + ". " + frame.title
        //for frame tags
        console.log("tag test " + frame.tag_id)
        if (frame.tag_id[0] != null ){
            frame.tag_id.forEach(function(tag){
                if (frame.hidden){
                    continue
                }
                console.log("tag ID: " + tag[0].id + " title: " + tag[0].name)
                tagEl.children[0].textContent = tag[0].name
                //console.log("tag ID: " + tag[0].id + " title: " + tag[0].name)
                console.log("tag frontend " + tagEl.children[0].textContent)
                tagEl.setAttribute("comp-type","tag")
                tagEl.setAttribute("tag-id",tag[0].id)
                tagWrapper.appendChild(tagEl.cloneNode(true))
            })
        }
        //frame created. 
        $frameWrapper[0].appendChild(frameEl)
        //assigning righ click event listener
        $frameWrapper[0].addEventListener("contextmenu", function(event){
            contextMenuTarget(event)
        })
        //for frame text content
        if (frame.content.length != 0){
            frame.content.forEach(function(content){
                if (content.data != null){
                    if (typeof window[content.type] === "function"){
                        window[content.type](content.data, frameIndex, content.type)
                    }
                    
                }
            })
        }

        //initialize the editor
        quillInit(false)
        latexInit()
        reframe(document.querySelectorAll('.respVideo'))
        expandableInit()
    })
    //frame nav creation
    var $lobjs = $response.lobjs
    var $lobjNavEl = $(".nav-lobj-w")[0].cloneNode(true)
    var $lobjListEl = $(".nav-lobjs-w")[0]
    var $frameNavEl = $(".nav-frame-w")[0].cloneNode(true)
    $lobjs.forEach(function (lobj){
        $lobjNavEl.children[0].textContent = lobj.title
        var $frames = lobj.allFrames
        $frames.forEach(function (frame){
            $frameNavEl.children[0].textContent = frame.title
            $frameNavEl.setAttribute("comp-type","framenav")
            $frameNavEl.setAttribute("frame-id",frame.id)
            $lobjNavEl.children[2].appendChild($frameNavEl.cloneNode(true))
        })
        $lobjNavEl.children[2].children[0].remove()
        $lobjListEl.appendChild($lobjNavEl.cloneNode(true))
        $lobjListEl.addEventListener("contextmenu", function(event){
            //contextCoordinate(event)
            contextMenuTarget(event)
        })
    })

    //sortable init
    var frameList = document.querySelectorAll(".frame-w")
    var compContainer
    var expandWrapper
    var expandContainer
    var lobjNavList = document.querySelectorAll(".nav-lobj-w")
    var frameNavContainer
    //sortable for frame components
    for (let i=0; i < frameList.length; i++){
        expandWrapper = frameList[i].querySelector(".is--expandable")
        if (expandWrapper != null){
            expandContainer = expandWrapper.querySelector(".grid-auto-row")
            if (expandContainer != null){
                new Sortable(expandContainer, {
                    group:"frameComp",
                    animation: 250,
                    ghostClass: 'blue-background-class'
                });
            }
        }
        compContainer = frameList[i].querySelector(".grid-auto-row")
        if (compContainer != null){
            new Sortable(compContainer, {
                group:"frameComp",
                animation: 250,
                ghostClass: 'blue-background-class'
            });
        }
    } 
    //sortable for frame nav components
    for (let i=0; i < lobjNavList.length; i++){
        frameNavContainer = lobjNavList[i].querySelector(".grid-auto-row")
        if (frameNavContainer != null){
            new Sortable(frameNavContainer, {
                group:"frameNav",
                animation: 250,
                ghostClass: 'blue-background-class'
            });
        }
    }
    //latex and editor responsive text size
    window.onresize = fontResize;
    fontResize()
    function fontResize() {
        var fontSize = $(".text").css("font-size")
        $(".ql-container").css("font-size", fontSize)
        $(".latex-editor").css("font-size", fontSize)
        fontSize = $(".text").css("font-size")
        $(".ql-container").css("font-size",fontSize)
        $(".latex-editor").css("font-size", fontSize)
    }
})














