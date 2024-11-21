import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(4);
  
  function decrementCount() {
    setCount(prevCount => prevCount - 1)
  }
  
  function incrementCount() {
    setCount(prevCount => prevCount + 1)
  }

  return (
    <div class="basic big">
      <button class="big" onClick={decrementCount}> - </button>
      <span> {count} </span>
      <button class="big" onClick={incrementCount}> + </button>
    </div>
  )
}