function mode(type){
    if (type){
        $(".section--bg-color").css("background-color","rgba(255, 255, 255, 0.2)")
        $(".solid--bg-color").css("background-color","white")
        $(".is--solid-border").css("border-color","black")
        $(".is--border").css("border-color","rgba(0, 0, 0, 0.5)")
        $(".is--editable").css("border-color","rgba(0, 0, 0, 0.5)")
        //$(".is--border .is--table").css("border-color","rgba(0, 0, 0, 0.5)")
        $(".is--text-color").css("color","black")
        $(".icon-img").css("filter","invert(100%)")
    }else {
        $(".section--bg-color").css("background-color","rgba(0, 0, 0, 0.3)")
        $(".solid--bg-color").css("background-color","black")
        $(".is--solid-border").css("border-color","white")
        $(".is--border").css("border-color","rgba(255, 255, 255, 0.5)")
        $(".is--editable").css("border-color","rgba(255, 255, 255, 0.5)")
        //$(".is--border .is--table").css("border-color","rgba(255, 255, 255, 0.5)")
        $(".is--text-color").css("color","white")
        $(".icon-img").css("filter","invert(0%)")
    }
}

var peace = "#008ba3"
var magma = "#d66038"
var flow = "#00a367"
var zen = "#7a6561"
var quantum = "#d6387c"
function theme(type){
    var currentTheme = document.querySelector(".section_theme").classList[1]
    document.querySelector(".section_theme").classList.remove(currentTheme)
    document.querySelector(".section_theme").classList.add("is--" + type + "-bg")
    $(".is--theme").css("background-color",eval(type))
    $(".is--theme-border").css("border-color",eval(type))

        //$(".is--theme-hover").css("border-color","black")
        //$(".is--theme-focus").css("border-color","rgba(0, 0, 0, 0.5)")
}


