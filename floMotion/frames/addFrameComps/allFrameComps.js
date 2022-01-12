
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








  