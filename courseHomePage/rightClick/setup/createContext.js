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