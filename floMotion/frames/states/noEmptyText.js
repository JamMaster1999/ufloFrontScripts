function noEmptyTextbox(element){
    if (element.textContent.length == 1){
        var currentText = element.textContent 
        element.textContent = "Placeholder: " + currentText
    }
}