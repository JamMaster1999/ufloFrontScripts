//right click menu items
var menuItems = [{}]
//where to send the form to
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

var Webflow = Webflow || [];
Webflow.push(function() {  
    $(document).off('submit');
    $('form').submit(function(e) {
        e.preventDefault();
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
            courseLoad(courseID)
            removeModal()
            formBody = {}
            $form.trigger("reset");
            if (formRedirect) { 
                window.location = formRedirect; return; 
            }
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
