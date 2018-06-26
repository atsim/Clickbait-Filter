let ratio = 0.75;

let running = false;

var observer = new MutationObserver(callback);

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

    /*
    console.log("1");
    console.log(nameCheck.text());
    console.log(numUpper + " out of " + nameCheck.text().match(/[a-zA-Z]/g).length)
    */
    console.log(nameCheck.attr("data-clickbait"));
    if (nameCheck.text() != "" && numUpper/nameCheck.text().match(/[a-zA-Z]/g).length >= ratio && nameCheck.attr("data-clickbait") != 'true') {
      nameCheck.text("(Clickbait) " + nameCheck.text());
      nameCheck.attr("data-clickbait", 'true');
      $("ytd-thumbnail").eq(index).addClass("clickbait");
    }
    
  });
  running = false;
}

$(window).on('hashchange', function(){
  console.log("asd");
}).trigger('hashchange');