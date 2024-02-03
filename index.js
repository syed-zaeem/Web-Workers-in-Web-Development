// Create a Web Worker for data processing
const worker = new Worker("workers.js");

// Function to fetch data from the API
function fetchData() {
  const userId = document.getElementById("userId").value;

  // Fetch data from the API
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
        // Send data to the Web Worker for processing
      worker.postMessage(data);
    })
    .catch((error) => {
      console.log("Error Fetching the Data", error);
    });


    // Listen for messages from the Web Worker
    worker.onmessage = function(e){
        // Update the UI with the processed data
        updateUI(e.data);
    }
}

// Function to update the UI with processed data
function updateUI(result){
    const resultDiv = document.getElementById('result');
    // resultDiv.innerHTML = `<h2>Processed Data</h2><pre>${JSON.stringify(result, null, 2)}</pre>`
    resultDiv.innerHTML = `<h2 class="processeddataheading">Processed Data</h2><div>${result.map((post)=>{
        return `<div class="onepostdiv"><h3 class="posttitle">${post.title}</h3><h4 class="postbody">${post.body}</h4></div>`
    }).join('')}</div>`
}





