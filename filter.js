let ratio = 0.75;

let running = false;
let skip = false;

var observer = new MutationObserver(callback);
//var buzzwords = ['amazing', 'must watch', 'not believe', 'super lucky', 'crazy']


observer.observe(document.getElementById("contents"), {
    childList: true,
    subtree: true            
});

function callback(mutations) {
  if (running) {
    return;
  }
  running = true;
  let pathname = window.location.pathname;
  let nameCheck = '';

  $('[id="video-title"]').each(function (index) {
    nameCheck = $('[id="video-title"]')[index];

    if (nameCheck.nodeName == 'A') {
      let numUpper = 0;
      let titleRatio = 0;
      if (nameCheck.title.match(/[A-Z]/g) != null) {
        numUpper = (nameCheck.title.match(/[A-Z]/g)).length;
        titleRatio = numUpper / nameCheck.title.match(/[a-zA-Z]/g).length;
      }

      // Check if title fits clickbait criteria
      if (nameCheck.title != "" && (titleRatio >= ratio) && !nameCheck.hasAttribute("data-clickbait")) {
        console.log("Added append to: " + nameCheck.title);
        nameCheck.innerText = "(Clickbait) " + nameCheck.title;
        nameCheck.setAttribute("data-clickbait", 'true');

        // Select thumbnail element
        let thumbnail = '';
        if (pathname == '/results') {
          //console.log(nameCheck.parentElement.parentElement.parentElement.parentElement.previousElementSibling);
          thumbnail = nameCheck.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
          thumbnail.className += " clickbait";
        } else {
          thumbnail = nameCheck.parentElement.parentElement.parentElement.previousElementSibling;
          thumbnail.className += " clickbait";
        }
      }
    }
  });

  running = false;
  skip = false;
}