// Web Worker to process data in the background
onmessage = function(event) {
    const data = event.data;

    // Perform some processing (e.g., aggregating data, performing calculations)
    const processedData = process(data);
    
    // Send the processed data back to the main thread
    postMessage(processedData);
};

// Function to process data (example: simply doubling the userId in each post)
function process(data) {
    return data.map(post => {
        return {
            ...post,
            userId: post.userId * 2,
            title: post.title + " For User: " + post.userId
        };
    });
}