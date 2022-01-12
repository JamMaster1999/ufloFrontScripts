//type of form submission
var formSubmissionType
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


