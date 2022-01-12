//for quill editor
var editorIDs = []
var editors = []
var editor = {id:"id", text: "id"}
var quillCount = 0
var quill
var selectComp = {}
var editState = true;
//lobj id is recieved from course dashboard
//var lobjID = urlParams.get('lobj')
//const urlParams = new URLSearchParams(window.location.search);

//variables
var selectedFrame
var prevAddFrameCompBtn = ''
var frameCompSearch = document.createElement('div');
frameCompSearch.classList.add("search_form", "is--border")
frameCompSearch.innerHTML = '<img src="https://assets.website-files.com/61365f53652529080f68048b/61365fad80031d0a3e44d126_magnifying-glass.svg" loading="lazy" alt="Search icon" class="icon-img"><input type="text" class="input is--text-color is--transparent" placeholder="Search">'
