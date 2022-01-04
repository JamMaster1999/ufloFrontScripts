var navigatorHTML = '<div class="navigator is--solid-border solid--bg-color" style="display: block;"><div class="form_block w-form"><form id="email-form" name="email-form" data-name="Email Form" method="get" class="search_form is--right-margin is--border is--btm-margin" aria-label="Email Form"><img src="https://assets.website-files.com/61365f53652529080f68048b/61365fad80031d0a3e44d126_magnifying-glass.svg" loading="lazy" alt="Search icon" class="icon-img"><input type="text" class="input is--text-color is--transparent w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="Search" id="name-2"></form><div class="w-form-done" tabindex="-1" role="region" aria-label="Email Form success"><div>Thank you! Your submission has been received!</div></div><div class="w-form-fail" tabindex="-1" role="region" aria-label="Email Form failure"><div>Oops! Something went wrong while submitting the form.</div></div></div><div class="nav-lobjs-w"><div class="nav-lobj-w padding is--border is--btm-margin"><h4 class="is--text-color">LOBJ Name</h4><div class="full-width is--thin"></div><div class="grid-auto-row"><a href="#" class="nav-frame-w w-inline-block"><div class="text is--text-color">Frame Name</div></a></div><a href="#" class="button is--theme w-button">Add Frame</a></div></div></div>'
document.body.appendChild(navigatorHTML)
//var $lobjNavEl = $(".nav-lobj-w")[0].cloneNode(true)
//var $lobjListEl = $(".nav-lobjs-w")[0]
//var $frameNavEl = $(".nav-frame-w")[0].cloneNode(true)

var lobjNavEl = document.querySelector(".nav-lobj-w").cloneNode(true)
var lobjListEl = document.querySelector(".nav-lobjs-w")
var frameNavEl = document.querySelector(".nav-frame-w").cloneNode(true)
