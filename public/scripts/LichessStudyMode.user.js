// ==UserScript==
// @name         Lichess Study Mode
// @namespace    cpflames
// @description  Simple script to hide the upcoming moves in a Lichess study
// @version      1.2
// @include      https://lichess.org/study/*
// @grant        none
// ==/UserScript==

(function() {
    // Add CSS rule to hide moves initially
    const style = document.createElement('style');
    style.textContent = `
        .analyse__moves, .analyse__fork, g[cghash*="white"] {
            display: none;
        }
        
        .analyse__moves.show-moves, .analyse__fork.show-moves, g[cghash*="white"].show-moves {
            display: block !important;
        }
    `;
    document.head.appendChild(style);
    
    // Function to create a new show moves link
    function createShowMovesLink() {
        const showMovesLink = document.createElement('a');
        showMovesLink.href = '#';
        showMovesLink.textContent = 'Show moves';
        showMovesLink.style.cursor = 'pointer';
        showMovesLink.style.marginLeft = '1em';
        showMovesLink.classList.add('show-moves-link'); // Add class for identification
        
        showMovesLink.addEventListener('click', (e) => {
            e.preventDefault();
            const moves = document.querySelector('.analyse__moves');
            const forks = document.querySelector('.analyse__fork');
            const whiteArrows = document.querySelectorAll('g[cghash*="white"]');
            if (moves) moves.classList.add('show-moves');
            if (forks) forks.classList.add('show-moves');
            whiteArrows.forEach(el => el.classList.add('show-moves'));
            showMovesLink.remove();
        });
        
        return showMovesLink;
    }
    
    // Function to check and insert link if needed
    function tryInsertLink() {
        const toolsDiv = document.querySelector('.analyse__tools');
        if (toolsDiv && !toolsDiv.querySelector('.show-moves-link')) {
            toolsDiv.appendChild(createShowMovesLink());
        }
    }
    
    // Run the check every second
    setInterval(tryInsertLink, 1000);
    
    // Also run immediately
    tryInsertLink();
})();