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
