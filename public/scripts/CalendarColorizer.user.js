// ==UserScript==
// @name         Google Calendar Colorizer
// @namespace    cpflames
// @description  Simple script to change the colors in Google Calendar.
// @version      1.6
// @include      https://calendar.google.com/calendar/*
// @grant        none
// ==/UserScript==

  // Color palette
  const COLOR_PALETTE = {
    "today": "#AA2222",
    "thisWeek": "#551111",
    "dayNumbers": "rgba(0, 95, 0, 0.8)",
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
    background-color: ${COLOR_PALETTE.dayNumbers} !important;
    border-radius: 50% !important;
    width: 24px !important;
    height: 24px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-shadow: 0 0 2px rgba(0,0,0,0.2);
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


  // Inject the CSS rules into the page
  document.head.appendChild(style);
})();

  // Helper function for debug alerts
  function debug(message) {
    if (DEBUG_MODE) {
      alert(message);
    }
  }

  function highlightCurrentWeek() {
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