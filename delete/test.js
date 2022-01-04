



// // ({
// //     "plugins": ["jsdom-quokka-plugin"],
// //     "jsdom": {
// //         "userAgent": "quokka.js",
// //         "config": {
// //           "pretendToBeVisual": true,
// //           "runScripts": "dangerously",
// //           "url": "http://localhost/"
// //         },
// //         "file": "/Users/sina/Desktop/Webflow Scripts /ufloDownloads/uflo-src/course-home-page.html"
// //     }
// // })

({
    "plugins": ["jsdom-quokka-plugin"],
    //"jsdom": {"url": "https://flomotion-final.webflow.io/course-home-page"} // Located in project root
    "jsdom": {"file": "/Users/sina/Desktop/Webflow Scripts /ufloDownloads/uflo-src/course-home-page.html"} // Located in project root
})



export function testImp(){
    const testDiv = document.getElementById('lobjWrapper');
    testDiv.children[3].children[0].outerHTML
    console.log("🚀 > testImp > testDiv.children[0].innerHTML", testDiv.children[1].innerHTML)
    console.log(testDiv);
    return 2;
}
testImp()

// import fetch from "node-fetch";

// fetch('https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/course/1').then(function(response) {
//   return response.json();
// }).then(function(data) {
//   console.log(data);
// }).catch(function() {
//   console.log("Booo");
// });
var data
const https = require('https')
const url = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/course/1";
https.get(url, res => {
    data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    data = JSON.parse(data);
    data.chapter_of_course
    console.log(data);
  })
}).on('error', err => {
  console.log(err.message);
}).end()
console.log(data)
