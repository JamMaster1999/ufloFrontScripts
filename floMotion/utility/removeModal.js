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