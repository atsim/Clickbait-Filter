let ratio = 0.75;

let running = false;
let skip = false;

var observer = new MutationObserver(callback);
var buzzwords = ['amazing', 'must watch', 'not believe', 'super lucky', 'crazy']


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
  $("ytd-thumbnail").each(function (index) {
    if (pathname == '/results') {
      nameCheck = $("ytd-thumbnail").eq(index).next().children().first().children().first().children().first().children().eq(1);
    } else if (!$("ytd-thumbnail").eq(index).next().children().first().children().eq(1).is("span")){
      // console.log($("ytd-thumbnail").eq(index).next().children().first().children().first().children().eq(1).text());
      nameCheck = $("ytd-thumbnail").eq(index).next().children().first().children().first().children().eq(1);
    } else {
      skip = true;
    }

    if (skip == false) {
    let numUpper = (nameCheck.text().match(/[A-Z]/g)).length;
    //console.log(numUpper);
    let titleRatio = numUpper/nameCheck.text().match(/[a-zA-Z]/g).length;
    //let buzzwordsCheck = /.*(amazing|must watch|not believe|super lucky|crazy).*/.test(nameCheck.toLowerCase());

    // Check if title fits clickbait criteria
    if (nameCheck.text() != "" && (titleRatio >= ratio) && nameCheck.attr("data-clickbait") != 'true') {
      console.log("Added append to: " + nameCheck.text())
      nameCheck.text("(Clickbait) " + nameCheck.text());
      nameCheck.attr("data-clickbait", 'true');
      $("ytd-thumbnail").eq(index).addClass("clickbait");
    }
  }
    
  });
  running = false;
  skip = false;
}

chrome.history.onVisited.addListener(function(details) {
  console.log("URL Updated");
  if(details.frameId === 0) {
    // Fires only when details.url == currentTab.url
    chrome.tabs.get(details.tabId, function(tab) {
      if(tab.url === details.url) {
        console.log("onHistoryStateUpdated");
      }
    });
  }
});