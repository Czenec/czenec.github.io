// https://patorjk.com/software/taag/#p=display&f=Big%20Money-ne
//  /$$$$$$$                     /$$   /$$          
// | $$__  $$                   | $$  | $$          
// | $$  \ $$ /$$$$$$   /$$$$$$ | $$  | $$  /$$$$$$ 
// | $$$$$$$//$$__  $$ /$$__  $$| $$  | $$ /$$__  $$
// | $$____/| $$  \ $$| $$  \ $$| $$  | $$| $$  \ $$
// | $$     | $$  | $$| $$  | $$| $$  | $$| $$  | $$
// | $$     |  $$$$$$/| $$$$$$$/|  $$$$$$/| $$$$$$$/
// |__/      \______/ | $$____/  \______/ | $$____/ 
//                    | $$                | $$      
//                    | $$                | $$      
//                    |__/                |__/      

window.onload = function() {
    // Show the pop-up when the page is first loaded
    document.getElementById("popup").style.display = "flex";
};

function closePopup() {
    // Hide the pop-up when the close button is clicked
    document.getElementById("popup").style.display = "none";
}


//   /$$$$$$  /$$       /$$           /$$                          
//  /$$__  $$|__/      | $$          | $$                          
// | $$  \__/ /$$  /$$$$$$$  /$$$$$$ | $$$$$$$   /$$$$$$   /$$$$$$ 
// |  $$$$$$ | $$ /$$__  $$ /$$__  $$| $$__  $$ |____  $$ /$$__  $$
//  \____  $$| $$| $$  | $$| $$$$$$$$| $$  \ $$  /$$$$$$$| $$  \__/
//  /$$  \ $$| $$| $$  | $$| $$_____/| $$  | $$ /$$__  $$| $$      
// |  $$$$$$/| $$|  $$$$$$$|  $$$$$$$| $$$$$$$/|  $$$$$$$| $$      
//  \______/ |__/ \_______/ \_______/|_______/  \_______/|__/      

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}


//   /$$$$$$                        /$$                           /$$    
//  /$$__  $$                      | $$                          | $$    
// | $$  \__/  /$$$$$$  /$$$$$$$  /$$$$$$    /$$$$$$  /$$$$$$$  /$$$$$$  
// | $$       /$$__  $$| $$__  $$|_  $$_/   /$$__  $$| $$__  $$|_  $$_/  
// | $$      | $$  \ $$| $$  \ $$  | $$    | $$$$$$$$| $$  \ $$  | $$    
// | $$    $$| $$  | $$| $$  | $$  | $$ /$$| $$_____/| $$  | $$  | $$ /$$
// |  $$$$$$/|  $$$$$$/| $$  | $$  |  $$$$/|  $$$$$$$| $$  | $$  |  $$$$/
//  \______/  \______/ |__/  |__/   \___/   \_______/|__/  |__/   \___/  


//                   _   _                                     _            
//                  | | | |_   _____ _ __ ___     ___ _ __    (_) ___  __ _ 
//                  | |_| \ \ / / _ \ '_ ` _ \   / _ \ '__|   | |/ _ \/ _` |
//                  |  _  |\ V /  __/ | | | | | |  __/ |      | |  __/ (_| |
//                  |_| |_| \_/ \___|_| |_| |_|  \___|_|     _/ |\___|\__, |
//                                                          |__/      |___/ 

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


document.getElementById('colorInput').addEventListener('input', function() {
    const color = this.value;
    const rgb = hexToRgb(color);
    const xyBrightness = rgbToXyBrightness(rgb.r, rgb.g, rgb.b);

    // Update x, y, and brightness
    document.getElementById('xValue').textContent = xyBrightness.x.toFixed(4);
    document.getElementById('yValue').textContent = xyBrightness.y.toFixed(4);
    document.getElementById('brightnessValue').textContent = xyBrightness.brightness.toFixed(2);
});

// Convert HEX to RGB
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

// Convert RGB to XY and Brightness
function rgbToXyBrightness(r, g, b) {
    // Normalize RGB values
    let red = r / 255;
    let green = g / 255;
    let blue = b / 255;

    // Apply gamma correction to RGB
    red = (red > 0.04045) ? Math.pow((red + 0.055) / 1.055, 2.4) : red / 12.92;
    green = (green > 0.04045) ? Math.pow((green + 0.055) / 1.055, 2.4) : green / 12.92;
    blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / 1.055, 2.4) : blue / 12.92;

    // Convert RGB to XYZ
    const X = red * 0.4124 + green * 0.3576 + blue * 0.1805;
    const Y = red * 0.2126 + green * 0.7152 + blue * 0.0722;
    const Z = red * 0.0193 + green * 0.1192 + blue * 0.9505;

    // Convert XYZ to x and y
    const x = X / (X + Y + Z);
    const y = Y / (X + Y + Z);

    // Brightness is represented by Y (luminance)
    const brightness = Y;

    return { x, y, brightness };
}


document.getElementById('apiColorButton').addEventListener('click', function () {
    // Get x, y, and brightness values
    const x = (document.getElementById('xValue').textContent) * 10000;
    const y = (document.getElementById('yValue').textContent) * 10000;
    const brightness = (document.getElementById('brightnessValue').textContent) * 255;

    // Clear any previous message
    document.getElementById("message").textContent = "";

    // Send a POST request with the x, y, and brightness values
    fetch('https://nice-regularly-ladybird.ngrok-free.app/Set-LightColor', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420' // Required header for ngrok
        },
        body: JSON.stringify({ x: x, y: y, brightness: brightness })
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
