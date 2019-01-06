let page = document.getElementById('thresholdDiv');

function constructThreshold () {
  let threshInput = document.createElement('input');
  threshInput.setAttribute('id', 'threshInput');
  page.appendChild(threshInput);
  let threshSubmit = document.createElement('button');
  threshSubmit.setAttribute('id', 'threshSubmit');
  threshSubmit.setAttribute('value', 'Submit');
  threshSubmit.innerHTML = 'Submit';
  threshSubmit.addEventListener('click', function() {
    chrome.storage.sync.set({"threshold": document.getElementById("threshInput").value}, function() {
      console.log("Set threshold to " + document.getElementById("threshInput").value);
    })
  });
  page.appendChild(threshSubmit);
}

constructThreshold();