// Function to toggle the projects window visibility with animation
function toggleWindow() {
    const window = document.getElementById("projectsWindow");
    const folder = document.getElementById("folder");
    if (window.style.display === "none") {
        // Position the window at the folder location
        const folderRect = folder.getBoundingClientRect();
        window.style.top = `${folderRect.top}px`;
        window.style.left = `${folderRect.left}px`;
        window.classList.add('open'); // Add "open" class for scale effect
        window.style.display = "block";
    } else {
        window.classList.remove('open'); // Remove "open" class for smooth close
        setTimeout(() => { window.style.display = "none"; }, 200);
    }
}

// Function to make the folder and project window draggable
function makeDraggable(element) {
    let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

    element.onmousedown = function(e) {
        if (e.target.classList.contains('close-button') || 
            e.target.classList.contains('minimize-button') || 
            e.target.classList.contains('maximize-button')) {
            return; // Don't drag when clicking on close/minimize/maximize
        }
        e.preventDefault();
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.onmousemove = dragElement;
        document.onmouseup = stopDragging;
    };

    function dragElement(e) {
        e.preventDefault();
        offsetX = mouseX - e.clientX;
        offsetY = mouseY - e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        element.style.top = (element.offsetTop - offsetY) + "px";
        element.style.left = (element.offsetLeft - offsetX) + "px";
    }

    function stopDragging() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

// Make folder icon and projects window draggable
makeDraggable(document.getElementById("folder"));
makeDraggable(document.getElementById("projectsWindow"));

// Open the projects window when the folder is clicked
document.getElementById("folder").onclick = toggleWindow;

// Function to update time in the menu bar
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    document.getElementById('time').textContent = timeString;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();
