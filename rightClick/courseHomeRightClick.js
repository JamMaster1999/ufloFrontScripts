
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() { return this.charAt(0).toUpperCase() + this.slice(1);},
    enumerable: false
});


var coordinate = {"x": "0","y": "0"}
var eventPath
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

function contextMenuTrigger(el){
    menuItems = [{}]
    removeContextMenu()
    if (el.getAttribute("comp-type") != null) {
        console.log(el.getAttribute("comp-type"))
        if (el.getAttribute("comp-type") != "tag" & el.getAttribute("comp-type") != "framenav"){
            frameCompContextBasic()
        }
        var funcName = el.getAttribute("comp-type") + "ContextMenu"
        if (typeof window[funcName] === "function"){
            window[funcName]()
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
                    contextClicked()
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

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        removeContextMenu();
        removeModal()
    }
};

$("[comp-type='cancel-modal']").click(function (event) {
    removeModal()
})

document.getElementById("popupForm").addEventListener("click", function(e) {
    if(e.target === e.currentTarget){
        removeModal()
    }
})

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

function contextClicked(){
    document.getElementById("popupTrigger").click()
    removeContextMenu()
}



//on cancel, empty out the variables for form. 
document.getElementById("chapterBtn").addEventListener("click", function(event){
    //event.preventDefault()
    document.getElementById("createChapter").classList.remove("is--hidden")
    document.getElementById("popupTrigger").click()

    addAPI("chapter")
})

document.getElementById("lessonBtn").addEventListener("click", function(event){
    //event.preventDefault()  
    document.getElementById("createLesson").classList.remove("is--hidden")
    document.getElementById("popupTrigger").click()
    addAPI("lesson")
})

document.getElementById("lobjBtn").addEventListener("click", function(event){
    //event.preventDefault()
    document.getElementById("createLOBJ").classList.remove("is--hidden")
    document.getElementById("popupTrigger").click()
    addAPI("lobj")
})




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

function deleteAPI(type, id){
    if (type === "frame-nav"){ type = 'frame'}
    formMethod = "DELETE"
    formAction += type + "/" + id
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
            $form.reset();
            removeModal()
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



