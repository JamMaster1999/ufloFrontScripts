function annotateContextClicked(element){
    annotationTextTest = element
    annotationTest = []
    document.getElementById("frameAnnotateOpen").click()
    if (element.getAttribute("comp-type") == "text"){
        console.log("text annotated")
        var range = Quill.find(element).getSelection();
        testTextRange = range
        if (range) {
        if (range.length == 0) {
            console.log('User cursor is at index', range.index);
        } else {
            var text = Quill.find(element).getText(range.index, range.length);
            console.log('User has highlighted: ', text);
        }
        } else {
        console.log('User cursor is not in editor');
        }
    }
    else {
        console.log(element.getAttribute("comp-type"))
        annotationTest.push(element.getAttribute("comp-type"))
        annotationTest.push(getChildElementIndex(element))
        annotationTest.push(element.parentElement.parentElement.getAttribute("compID"))
    }
}
var annotationTest = []
var annotationTextTest
var testTextRange



function createAnnotation(lobjID){
    var annotationObj = {}
    var formAction = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/annotation"
    annotationObj.title = "Annotation"
    annotationObj.content = {}
    annotationObj.type = ""
    annotationObj.annotation_id = []
    annotationObj.tag_id = []
    annotationObj.context = {}
    annotationObj.lobj_id = lobjID
    //annotationObj.course_id = ""
    //annotationObj.user_id = ""
    requestPanel()
    var annotResponse 
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
        .then(data => annotResponse = data)
        .then(() => createAnnotationDone(annotResponse))
        .catch((error) => {
        console.error('Error:', error);
        responsePanel("error")
        });

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
            console.log("form body reset", formBody)
            formBody = {}
            formAction = hostURL
            removeModal()
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




function renderAnnotation(data){
    var annotationEl = document.createElement('annotation')
    annotationEl.classList.add("annotation_item")
    if (data.type == "question") {annotationEl.classList.add("is--question")}
    else if (data.type == "annotation") {annotationEl.classList.add("is--annotate")}
    else if (data.type == "highlight") {annotationEl.classList.add("is--highlight")}
    var annotationHTML
var annotationTypeHTML = '<div class="is--flex-hz-ctr-ctr"><select class="dropdown is--question is--weight700"><option value="question">Type: Question</option><option value="annotation">Type: Annotation</option><option value="highlight">Type: Highlight</option></select><div class="question_vote-w is--left-margin"><img src="https://assets.website-files.com/61365f53652529080f68048b/6186fa3bfd9507217c7fe713_icons8-like-2.svg" loading="lazy" alt="" class="question_img is--right-margin"><h4 class="is--text-color">0</h4></div></div>'
var annotationTitleHTML = '<h4 class="is--text-color">Annotation Heading</h4><div></div>'
var annotationContextHTML = '<div class="is--flex-hz-ctr-ctr"><h5 class="is--text-color is--center">Selections</h5><img src="https://assets.website-files.com/61365f53652529080f68048b/613c9f089900f821451fd0bd_right-arrow%20(1).svg" loading="lazy" alt="right arrow icon" class="icon-img is--xxsmall is--expand is--left-margin"><a href="#" class="button is--compact is--solid-border is--left-auto is--theme-hover is--text-color" >Add</a></div><div class="annotation_selection-w is--solid-border"><div class="tag-w"><div class="frame_tag is--right-margin is--text-color is--border" ><div class="text">Frame/Canvas Name</div></div><div class="frame_tag is--right-margin is--text-color is--border"><div class="text">Type</div></div><img src="https://assets.website-files.com/61365f53652529080f68048b/616719015d15295a1716c870_icons8-empty-trash.svg" loading="lazy" alt="" class="icon-img is--medium is--left-auto"></div><div class="text is--text-color is--left-margin is--right-margin is--top-margin">This is some text inside of a div block. This is some text inside of a div block. This is some text.</div><img src="https://assets.website-files.com/61365f53652529080f68048b/6186d11ac78837779fb14b5f_icons8-quote-left.svg" loading="lazy" alt="" class="quote-icon is--text-color"><img src="https://assets.website-files.com/61365f53652529080f68048b/6186d2562157174da8efbc0c_icons8-get-quote.svg" loading="lazy" alt="" class="quote-icon is--end is--text-color" ></div><div class="fullwidthline is--thin"></div>'
var annotationTagHTML = '<div><div class="search_form is--compact is--solid-border" ><img src="https://assets.website-files.com/61365f53652529080f68048b/614fbfd68c5a6efa6f393b98_icons8-tags.svg" loading="lazy" width="19" alt="" class="icon-img is--xsmall is--right-margin" ><div class="search_selection is--text-color is--border" ><img src="https://assets.website-files.com/61365f53652529080f68048b/614fba9913977ac47424bcde_icons8-macos-close.svg" alt="" class="icon-img is--xxlarge is--right-margin" ><div class="text">Midterm</div></div><div class="search_selection is--text-color is--border" ><img src="https://assets.website-files.com/61365f53652529080f68048b/614fba9913977ac47424bcde_icons8-macos-close.svg" alt="" class="icon-img is--xxlarge is--right-margin" ><div class="text">Ask Question</div></div><input type="text" class="input is--compact is--text-color w-input" maxlength="256" name="searchClassmates-2" data-name="Search Classmates 2" placeholder="Add Tags " id="searchClassmates-2" ></div></div><div class="fullwidthline is--thin"></div>'
var referenceTagHTML = '<div><div class="search_form is--compact is--solid-border" ><img src="https://assets.website-files.com/61365f53652529080f68048b/614fc13e481e2c1a9d865217_icons8-note.svg" loading="lazy" alt="" class="icon-img is--xsmall is--right-margin" ><div class="search_selection is--text-color is--border" ><img src="https://assets.website-files.com/61365f53652529080f68048b/614fba9913977ac47424bcde_icons8-macos-close.svg" alt="" class="icon-img is--xxlarge is--right-margin" ><div class="text">trigonometry in mechanics</div></div><input type="text" class="input is--compact is--text-color w-input" maxlength="256" name="searchClassmates-2" data-name="Search Classmates 2" placeholder="Reference other annotations" id="searchClassmates-2" ></div></div><div class="fullwidthline is--thin"></div>'
var referenceSubmitHTML = '<input type="submit" value="Submit" data-wait="Please wait..." class="button is--theme-hover is--text-color w-button">'
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

function annotationType(type){

}


function createAnnotationDone(response){
    //renderAnnotation(response);
    responsePanel("success")
}