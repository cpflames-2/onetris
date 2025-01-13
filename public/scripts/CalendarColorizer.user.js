// ==UserScript==
// @name         Google Calendar Colorizer
// @namespace    cpflames
// @description  Simple script to change the colors in Google Calendar.
// @version      1.9
// @include      https://calendar.google.com/calendar/*
// @grant        none
// ==/UserScript==

  // Color palette
  const COLOR_PALETTE = {
    "today": hexToRGBA("0CF6"),
    "thisWeek": hexToRGBA("0CF2"),
    "dayNumbers": hexToRGBA("00FC"),
  };

  // Debug mode flag
  const DEBUG_MODE = false;

(function() {

  // Generate CSS rules for all days in the week
  const style = document.createElement('style');


  style.textContent += `
/* Base styles for all day numbers */
.w48V4c.ubOFEd {
    position: absolute !important;
    right: 4px !important;
    top: 12px !important;
    z-index: 9999;
    transform: none !important;  /* Reset any transforms */
    color: white !important;
    background-color: ${COLOR_PALETTE.dayNumbers} !important;
    border-radius: 50% !important;
    width: 32px !important;
    height: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-shadow: 0 0 2px rgba(0,0,0,0.2);
    /* Add font size */
    font-size: 16px !important;
    font-weight: 500 !important;
    /* Reset any additional positioning */
    margin: 0 !important;
    padding: 0 !important;
}

/* Only add specific overrides for current day */
.w48V4c.ubOFEd.F262Ye {
    color: white !important;
    /* Remove any special styling */
    background-image: none !important;
}

/* Ensure parent context is correct */
.RCXPcd {
    position: relative;
    z-index: 1;
}

/* Keep events below */
.vEJ0bc.ChfiMc {
    z-index: 1 !important;
}
`;

  style.textContent += `
div.T3BIT {
    margin-top: 5px !important;
}

/* Hide the "+" add event button */
[aria-label="Create"] {
    display: none !important;
}

/* Hide the "<" navigation button in bottom right */
[aria-label="Show side panel"] {
    display: none !important;
}
`;

style.textContent += `
/* Trick page into showing all calendar events */

/* 1000 pixels giveth */
html, body {
    height: calc(100vh + 1000px);
}

/* 1000 pixels taketh away */
div.kbf0gd {
    margin-bottom: 1000px !important;
}
`;

  // Inject the CSS rules into the page
  document.head.appendChild(style);
})();

  // Helper function for debug alerts
  function debug(message) {
    if (DEBUG_MODE) {
      alert(message);
    }
  }

  function hexToRGBA(hex) {
    // Remove the hash if it exists
    hex = hex.replace('#', '');

    // Parse the hex values
    let r, g, b, a

    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
    a = parseInt(hex[3] + hex[3], 16) / 255.0;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

  function highlightCurrentWeek() {
    // First, clear any existing highlights
    const allDayBoxes = document.querySelectorAll('.MGaLHf.ChfiMc');
    allDayBoxes.forEach(box => {
        box.style.backgroundColor = '';  // Reset background color
    });

    // Find the current day number element (has class F262Ye)
    const currentDayNumber = document.querySelector('.w48V4c.ubOFEd.F262Ye');
    if (currentDayNumber) {
        // Find which number child it is within its parent
        const parent = currentDayNumber.closest('.RCXPcd');
        const dayIndex = Array.from(parent.parentNode.children).indexOf(parent);
        
        // Find the row containing this day
        const row = currentDayNumber.closest('.FLFkR');
        
        // Find all day boxes in this row
        const dayBoxes = row.querySelector('.sLvTye').children;
        
        // Highlight all boxes in the week, with current day being brighter
        Array.from(dayBoxes).forEach((box, index) => {
            if (index === dayIndex) {
                // Current day - brighter red
                box.style.backgroundColor = COLOR_PALETTE.today;
            } else {
                // Rest of week - darker red
                box.style.backgroundColor = COLOR_PALETTE.thisWeek;
            }
        });
    }
  }

// Run initially
highlightCurrentWeek();

// Optional: Run whenever the calendar updates
// You might need to adjust the mutation observer settings based on how Google Calendar updates
const observer = new MutationObserver(highlightCurrentWeek);
observer.observe(document.body, {
    childList: true,
    subtree: true
});