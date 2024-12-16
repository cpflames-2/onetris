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

  // Inject the CSS rules into the page
  document.head.appendChild(style);
})();