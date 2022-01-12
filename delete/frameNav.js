

var navigatorHTML = '<div class="navigator is--solid-border solid--bg-color" style="display: block;"><div class="form_block w-form"><form id="email-form" name="email-form" data-name="Email Form" method="get" class="search_form is--right-margin is--border is--btm-margin" aria-label="Email Form"><img src="https://assets.website-files.com/61365f53652529080f68048b/61365fad80031d0a3e44d126_magnifying-glass.svg" loading="lazy" alt="Search icon" class="icon-img"><input type="text" class="input is--text-color is--transparent w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="Search" id="name-2"></form><div class="w-form-done" tabindex="-1" role="region" aria-label="Email Form success"><div>Thank you! Your submission has been received!</div></div><div class="w-form-fail" tabindex="-1" role="region" aria-label="Email Form failure"><div>Oops! Something went wrong while submitting the form.</div></div></div><div class="nav-lobjs-w"><div class="nav-lobj-w padding is--border is--btm-margin"><h4 class="is--text-color">LOBJ Name</h4><div class="full-width is--thin"></div><div class="grid-auto-row"><a href="#" class="nav-frame-w w-inline-block"><div class="text is--text-color">Frame Name</div></a></div><a href="#" class="button is--theme w-button">Add Frame</a></div></div></div>'
document.body.appendChild(navigatorHTML)
//var $lobjNavEl = $(".nav-lobj-w")[0].cloneNode(true)
//var $lobjListEl = $(".nav-lobjs-w")[0]
//var $frameNavEl = $(".nav-frame-w")[0].cloneNode(true)asdfasdf

var lobjNavEl = document.querySelector(".nav-lobj-w").cloneNode(true)
var lobjListEl = document.querySelector(".nav-lobjs-w")
var frameNavEl = document.querySelector(".nav-frame-w").cloneNode(true)

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

lobjListEl.addEventListener("contextmenu", contextMenuTarget)

function createFrameNav(frameList,lobjEl){
    frameList.forEach(function (frame){
        frameNavEl.children[0].textContent = frame.title
        frameNavEl.setAttribute("comp-type","frame-nav")
        frameNavEl.setAttribute("compID",frame.id)
        frameNavEl.id = "frameNav" + frame.id
        lobjEl.children[2].appendChild(frameNavEl.cloneNode(true))
    })
}

lobjListEl.addEventListener("click", function(e){
    frameNavClick(e.path)
})
 
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
var frameData = []
var frameObj = {}
function createFrame(lobjID, lobjEl){
    var formAction = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/frame"
    var order = lobjEl.querySelector(".grid-auto-row").children.length + 1
    frameObj.title = "New Frame " + order 
    frameObj.order = order
    frameObj.lobj_id = lobjID
    frameObj.frame = true

    requestPanel()
    // $.ajax(formAction, {
    //     data: frameObj,
    //     method: "POST"
    // })
    // .done((res) => {
    //     console.log(res)
    //     var frameData = []
    //     frameData.push(res)
    //     createFrameNav(frameData,lobjEl)
    //     renderFrame(frameData, true)
    //     responsePanel("success")
    // })
    // .fail((res) => {
    //     alert("Error creating")
    //     responsePanel("error")
    // })
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

