let page = document.getElementById('thresholdDiv');

/*
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    page.appendChild(button);
  }
}

constructOptions(kButtonColors);
*/

function constructThreshold () {
  let threshInput = document.createElement('input');
  threshInput.setAttribute('id', 'threshInput');
  page.appendChild(threshInput);

  let threshSubmit = document.createElement('button');
  threshSubmit.setAttribute('id', 'threshSubmit');
  threshSubmit.setAttribute('value', 'Submit');
  threshSubmit.innerHTML = 'Submit';
  threshSubmit.addEventListener('click', function() {
    chrome.storage.sync.set({threshold: $("#threshInput").val()}, function() {
      console.log("Set threshold to " + $("#threshInput").val());
    })
  });
  page.appendChild(threshSubmit);
}

constructThreshold();