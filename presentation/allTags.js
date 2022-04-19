
var allTagsList = []

function getAllTags(){
    allTagsList = []
    var tagObj = {}
    tagObj.user_id = 2
    fetch(hostURL + "tag?user_id=2",  
    {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => allTagsList = data)
    .catch((error) => {
    console.error('Error:', error);
    responsePanel("error")
    });
}
getAllTags()


