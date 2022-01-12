function ResponsiveText(){
    window.onresize = fontResize;
    fontResize()
    function fontResize() {
        //var fontSize = $(".text").css("font-size")
        var fontSize = window.getComputedStyle(document.querySelector(".text")).fontSize;
        var textContainers = document.querySelectorAll(".ql-container")
        for (text of textContainers) { text.style.fontSize = fontSize}
        var latexContainers = document.querySelectorAll(".latex-editor")
        for (latex of latexContainers) { latex.style.fontSize = fontSize}
        //$(".ql-container").css("font-size", fontSize)
        //$(".latex-editor").css("font-size", fontSize)
        
    }
}