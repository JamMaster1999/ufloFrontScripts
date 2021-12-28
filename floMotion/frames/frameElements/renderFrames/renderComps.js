function renderComps(components, index){
    components.forEach(function(component){
        if (component.data != null){
            if (typeof window[component.type] === "function"){
                window[component.type](component.data, index, component.type)
            }
        }
    })
}
