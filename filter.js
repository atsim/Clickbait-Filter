let ratio = 0.75;

let running = false;

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
    } else {
      nameCheck = $("ytd-thumbnail").eq(index).next().children().first().children().first().children().eq(1);
    }

    let numUpper = (nameCheck.text().match(/[A-Z]/g) || []).length;
    let titleRatio = numUpper/nameCheck.text().match(/[a-zA-Z]/g).length;
    let buzzwordsCheck = /.*(amazing|must watch|not believe|super lucky|crazy).*/.test(nameCheck.toLowerCase());


    // Check if title fits clickbait criteria
    if (nameCheck.text() != "" && (titleRatio >= ratio || (titleRatio >= 0.6 && buzzwords exist)) && nameCheck.attr("data-clickbait") != 'true') {
      nameCheck.text("(Clickbait) " + nameCheck.text());
      nameCheck.attr("data-clickbait", 'true');
      $("ytd-thumbnail").eq(index).addClass("clickbait");
    }
    
  });
  running = false;
}

chrome.history.onVisited.addListener(function(details) {
  alert("qwer");
    if(details.frameId === 0) {
        // Fires only when details.url == currentTab.url
        chrome.tabs.get(details.tabId, function(tab) {
            if(tab.url === details.url) {
                console.log("onHistoryStateUpdated");
            }
        });
    }
});