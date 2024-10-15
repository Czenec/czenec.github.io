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


document.getElementById("apiButton").addEventListener("click", function() {
    // Clear any previous message
    document.getElementById("message").textContent = "";
    
    // Send a GET request with the ngrok-skip-browser-warning header
    fetch('https://3060-130-61-69-12.ngrok-free.app/scripts/1', {
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
    });
});