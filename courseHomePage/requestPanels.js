//to be considered in the future for request status
function requestPanel(){
    document.querySelector(".panel-notif").children[0].children[0].src = 'https://uploads-ssl.webflow.com/61365f53652529080f68048b/614ada26358d8b3fd943a4cb_sand-clock-2.svg'
    document.querySelector(".panel-notif").children[0].children[1].textContent = "Loading..."
    document.querySelector("#panelIn").click()
}
function responsePanel(response){
    if (response === 'error'){
        document.querySelector(".panel-notif").children[1].children[0].src = 'https://uploads-ssl.webflow.com/61365f53652529080f68048b/6148c495b215876962df0932_icons8-error-2.svg'
        document.querySelector(".panel-notif").children[1].children[1].textContent = "An error has occured"
    }
    if (response === 'success'){
        document.querySelector(".panel-notif").children[1].children[0].src = 'https://uploads-ssl.webflow.com/61365f53652529080f68048b/6148c6314d62d05d41f82acd_icons8-verified-account.svg'
        document.querySelector(".panel-notif").children[1].children[1].textContent = "Request was Successful"
    }
    document.querySelector(".panel-notif").classList.add("is--" + response)
    document.querySelector("#responseIn").click()
    closePanel(1500)
}

function closePanel(delay){
    setTimeout(function() { 
        document.querySelector("#panelOut").click()
    }, delay);
    setTimeout(function() { 
        document.querySelector(".panel-notif").classList.remove(document.querySelector(".panel-notif").classList[1])
        document.querySelector("#responseOut").click()
    }, delay+500); 
}


 