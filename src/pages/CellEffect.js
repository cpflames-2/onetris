import React, { useState } from 'react';

//function isNewRow(index) {
//  return (index > 0 && index % 3 === 0);
//}

//function newRowIfNeeded(index) {
//  return isNewRow(index) ? '</tr><tr>' : '';
//}

export default function CellEffect() {
  
  const boxRows = 6;
  const boxCols = 8;
  var isClicked = new Array(boxRows).fill(
    new Array(boxCols).fill(false)
  );
    
  const [grid, setGrid] = useState(isClicked)
    
  const handleColorChange = (rowId, colId) => {
    setGrid((prevState) => {
      return prevState.map((currentRow, rowIndex) => {
        return currentRow.map((currentCell, colIndex) => {
          if(rowIndex === rowId && colIndex === colId) {
            return !currentCell;
          } else {
            return currentCell;
          }
        })
      })
    })
  }
  
  
    
  
  return (
    <div class="basic">
      <table>
        <tbody>
          {grid.map((currentRow, rowIndex) => (
          <tr>
            {currentRow.map((currentCell, colIndex) => (
               <td key={rowIndex + '-' + colIndex} 
                onClick={() => handleColorChange(rowIndex, colIndex)} 
                style={{
                   backgroundColor: currentCell ? 'crimson' : '',
                }}
                >{rowIndex + '\u2060' + colIndex}</td>
            ))}
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};