// ==UserScript==
// @name         Google Calendar Colorizer
// @namespace    cpflames
// @description  Simple script to change the colors in Google Calendar.
// @version      1.2
// @include      https://calendar.google.com/calendar/*
// @grant        none
// ==/UserScript==

(function() {
  // Helper function to calculate the `data-datekey` value for today's date
  function calculateDateKey(date) {
      // Google Calendar's epoch seems to correspond to Jan 1, 1970 (UNIX epoch)
      //const epoch = new Date(1970, 0, 1);
      const epoch = new Date(1948, 2, 2); // March 2, 1948 (months are zero-indexed)
      const diffInMilliseconds = date.setHours(0, 0, 0, 0) - epoch.setHours(0, 0, 0, 0);
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      return diffInDays.toString(); // Convert to string to match `data-datekey`
  }

  // Get today's date
  const today = new Date();
  const todayDateKey = calculateDateKey(today);
//    alert("Today="+todayDateKey);

  // Calculate the start (Sunday) and end (Saturday) of the current week
  //const startOfWeek = new Date(today);
  //startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
  const sundayKey = todayDateKey - today.getDay();
//    const endOfWeek = new Date(startOfWeek);
//    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
  const saturdayKey = sundayKey + 6;
//    alert("Sun="+sundayKey+",Sat="+saturdayKey);

  // Generate CSS rules for all days in the week
  const style = document.createElement('style');
  for (let dateKey = sundayKey; dateKey <= saturdayKey; dateKey++) {
      //const dateKey = calculateDateKey(new Date(d));
      const dateColor = (dateKey == todayDateKey) ? "#666600" : "#333300";
      style.textContent += `
          div[data-datekey="${dateKey}"] {
              background-color: ${dateColor} !important;
          }
      `;
  }

if(true) {
  style.textContent += `
/* Base styles for all day numbers */
.w48V4c.ubOFEd {
    position: absolute !important;
    right: 4px !important;
    top: 12px !important;
    z-index: 9999;
    transform: none !important;  /* Reset any transforms */
    background-color: rgba(0, 0, 255, 0.5) !important;
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
}
if(false) {
  style.textContent += `
/* Target the day number container */
.w48V4c.ubOFEd {
    position: absolute;
    right: 4px !important;
    top: 4px !important;
    /* Much higher z-index and force a new stacking context */
    z-index: 9999;
    transform: translateZ(1px);
    background-color: rgba(0, 0, 255, 0.5) !important;
    border-radius: 50% !important;
    width: 24px !important;             /* Fixed width */
    height: 24px !important;            /* Equal height for perfect circle */
    display: flex !important;           /* makes align-items and justify-content work */
    align-items: center !important;     /* Vertical centering */
    justify-content: center !important; /* Horizontal centering */
    /* Optional: add a subtle text shadow to help readability */
    text-shadow: 0 0 2px rgba(0,0,0,0.2);
}

/* Make current day (F262Ye) match other days */
.w48V4c.ubOFEd.F262Ye {
    background-color: rgba(0, 0, 255, 0.5) !important;
    right: 4px !important;
    top: 4px !important;
    width: 24px !important;
    height: 24px !important;
    /* Ensure it uses the same positioning and display properties */
    position: absolute !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    /* Force text color to be white */
    color: white !important;
}

/* Remove any special background that might be applied */
.F262Ye::before,
.F262Ye::after {
    display: none !important;
}

/* Target current day specifically with maximum specificity */
.w48V4c.ubOFEd.F262Ye[jslog="184671"] {
    position: absolute !important;
    right: 4px !important;
    top: 4px !important;
    transform: translateZ(1px) !important;  /* Reset any transforms */
    margin: 0 !important;                  /* Reset any margins */
    padding: 0 !important;                 /* Reset any padding */
    color: white !important;
    background-color: rgba(0, 0, 255, 0.5) !important;
    width: 24px !important;
    height: 24px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

/* Remove any positioning from parent elements */
.F262Ye:not([style*="display: none"]) {
    position: absolute !important;
    top: 4px !important;
}

/* Reset any transforms or positioning from parent containers */
.F262Ye > * {
    position: static !important;
    transform: none !important;
}

/* Ensure parent has the right stacking context */
.RCXPcd {
    position: relative;
    z-index: 1;
}

/* Try to force all-day events to a lower z-index */
.vEJ0bc.ChfiMc {
    z-index: 1 !important;
}
  `;
}


if(false) {
  style.textContent += `
/* Target just the day numbers */
.w48V4c.ubOFEd {
    float: right;
    /* Use transform instead of positioning to create a new stacking context */
    transform: translateZ(0);
    /* Ensure the text stays visible */
    background: transparent;
    z-index: 999;
}

/* Reset any positioning we might have added to containers */
.RCXPcd, .umyEjb {
    position: static;  /* Reset to default */
}
  `;
}

if(false) {
  style.textContent += `
/* Make the parent container establish a stacking context */
.RCXPcd {
    position: relative;
    z-index: 1;
}

/* Make the day number appear above events */
.w48V4c.ubOFEd {
    position: relative;
    z-index: 10;
    float: right;
    background: transparent;  /* Ensure background is transparent */
}

/* Adjust the all-day events to stay below */
.vEJ0bc.ChfiMc {
    position: relative;
    z-index: 1;
}
  `;
}

if(false) {
  style.textContent += `
    /* And ensure the overlapping div has */
    .vEJ0bc {
      position: relative;
      z-index: 1;  /* Lower than the heading */
    }
  `;
}

if(false) {
  style.textContent += `
    .o5s4T .w48V4c {
        background-color: rgba(0, 0, 255, 0.5) !important;
        color: white !important;
        float: right !important;
        position: relative !important;
        z-index: 10 !important;
        margin: 5px !important;
        border-radius: 50% !important;
    }
  `;
}

if(false) {
  style.textContent += `
  div.KF4T6b.jKgTF.QGRmIf {
      position: relative !important;
      z-index: 5 !important;
  }
`;
}

if(true) {
  style.textContent += `
  div.T3BIT {
      margin-top: 5px !important;
  }
`;
}

  // Inject the CSS rules into the page
  document.head.appendChild(style);
})();