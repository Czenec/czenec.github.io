window.onload = function() {
    // Show the pop-up when the page is first loaded
    document.getElementById("popup").style.display = "flex";
};

function closePopup() {
    // Hide the pop-up when the close button is clicked
    document.getElementById("popup").style.display = "none";
}


function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}


let isRequestAllowed = true;  // Flag to check if a request is allowed
const cooldownTime = 10000;   // 10 seconds in milliseconds

document.getElementById("apiButton").addEventListener("click", function() {
    if (!isRequestAllowed) {
        // If the request is not allowed, show a message and return
        document.getElementById("message").textContent = "Please wait 10 seconds before sending another request!";
        document.getElementById("message").className = "error";
        return;
    }

    // Clear any previous message
    document.getElementById("message").textContent = "";

    // Disable sending new requests for 10 seconds
    isRequestAllowed = false;

    // Send a GET request with the ngrok-skip-browser-warning header
    fetch('https://nice-regularly-ladybird.ngrok-free.app/scripts/1', {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': '69420' // Required header for ngrok
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse the response as JSON
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
        console.log('API Request Successful:', data);
        // Display success message
        document.getElementById("message").textContent = "Request Successful!";
        document.getElementById("message").className = "success";
    })
    .catch(error => {
        console.error('There was a problem with the API request:', error);
        // Display error message
        document.getElementById("message").textContent = "Request Failed!";
        document.getElementById("message").className = "error";
    })
    .finally(() => {
        // Re-enable sending requests after 10 seconds
        setTimeout(() => {
            isRequestAllowed = true;
        }, cooldownTime);
    });
});