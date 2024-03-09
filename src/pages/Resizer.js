import React, { useState, useEffect } from 'react';

export default function Resizer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, []);

  return (
    <div class="basic big">
      <span> {windowWidth} x {windowHeight} </span>
    </div>
  )
}