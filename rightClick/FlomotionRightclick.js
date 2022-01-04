
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() { return this.charAt(0).toUpperCase() + this.slice(1);},
    enumerable: false
});

function contextClicked(){
    document.getElementById("popupTrigger").click()
    removeContextMenu()
}


function addContextClicked(element){
    var frameID = element.parent.parent.getAttribute("compID")
    addAPI(actionType)
    actionType = actionType.capitalize()
    document.getElementById("create"+actionType).classList.remove("is--hidden")
    document.getElementById("create"+actionType).querySelector(".w-form").getElementsByTagName('input')[0].focus()
}

function addFrameCompContextClicked(element){
    var frameID = element.parent.parent.getAttribute("compID")
    addAPI(actionType)
    actionType = actionType.capitalize()
    document.getElementById("create"+actionType).classList.remove("is--hidden")
    document.getElementById("create"+actionType).querySelector(".w-form").getElementsByTagName('input')[0].focus()
}

function addAPI(type){
    formMethod = "POST"
    formAction += type
    formBody.course_id = courseID 
    formBody.order = chapterWrapper.querySelector(".grid-auto-row").children.length
}


function deleteContextClicked(element){

    document.getElementById("deleteConfirm").classList.remove("is--hidden")
    deleteAPI(element.getAttribute("comp-type"),element.getAttribute("compID"))

    //element.remove()
}
var frameDeleteID = 0
function deleteAPI(type, id){
    if (type === "frame-nav"){ type = 'frame'}
    formMethod = "DELETE"
    formAction = hostURL + type + "/" + id
    frameDeleteID = id
}



function editContextClicked(element){
    var actionType = element.getAttribute("comp-type")
    editAPI(actionType)
    actionType = actionType.capitalize()
    document.getElementById("create"+actionType).classList.remove("is--hidden")
}

function editAPI(type){
    formMethod = "POST"
    formAction += type
    formBody.course_id = courseID 
    formBody.order = chapterWrapper.children[1].children.length
}
function copyContextClicked(element){
    document.getElementById("createChapter").classList.remove("is--hidden")
}
function pasteContextClicked(element){
    document.getElementById("createChapter").classList.remove("is--hidden")
}

function duplicateContextClicked(element){
    document.getElementById("createChapter").classList.remove("is--hidden")
}



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
function deleteFrameConfirm(frameID){
    document.getElementById("frameID" + frameID).remove()
    document.getElementById("frameNav" + frameID).remove()
}

var Webflow = Webflow || [];
Webflow.push(function() {  
    $(document).off('submit');
    $('form').submit(function(e) {
        e.preventDefault();
        if (frameDeleteID != 0){
            console.log("item deleting")
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

        $.ajax(formAction, {
            data: formBody,
            method: formMethod
        })
        .done((res) => {
            responsePanel("success")
            //courseLoad(courseID)
            //$form.reset();
            removeModal()
            if (formRedirect) { 
                window.location = formRedirect; return; 
            }
            formAction = hostURL
        })
        .fail((res) => {
            responsePanel("error")
        // $form.siblings('.w-form-done').hide() // Hide success
        //     .siblings('.w-form-fail').show(); // show failure
        })
        .always(() => {
        $submit.val(buttonText);
        });
        
        if (buttonWaitingText) {
        $submit.val(buttonWaitingText); 
        }
    });
})



