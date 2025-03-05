import React, { useState, FormEvent } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  pgnText: HTMLTextAreaElement;
}

interface PgnFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const examplePgn = `[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "1-0"]

1. e4 e5 2. Bc4 Bc5 3. Qh5 Nf6 4. Qxf7# 1-0`;

export default function Pgn(): JSX.Element {
  const [pgn, setPgn] = useState<string>('');
  const [moveTable, setMoveTable] = useState<string[][]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const validatePgn = (pgnText: string): boolean => {
    const newErrors: string[] = [];
    
    if (!pgnText.trim()) {
      newErrors.push("PGN text cannot be empty");
      setErrors(newErrors);
      return false;
    }

    // Add more validation as needed
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: FormEvent<PgnFormElement>): void => {
    e.preventDefault();
    const pgnText = e.currentTarget.elements.pgnText.value;
    if (validatePgn(pgnText)) {
      setPgn(pgnText);
      console.log("Processing PGN:", pgnText);
      const moves = parseMoves(pgnText);
      setMoveTable(moves);
    }
  };

  const parseMoves = (pgnText: string): string[][] => {
    const moveTable: string[][] = [["#", "white", "black"]];
    
    // Remove PGN metadata headers
    pgnText = pgnText.replace(/\[.*?\]/g, "").trim();
    
    // Remove result notation (e.g., 1-0, 0-1, 1/2-1/2)
    pgnText = pgnText.replace(/(1-0|0-1|1\/2-1\/2)/g, "").trim();
    
    // Remove move annotations ($n) and commentary in parentheses and braces
    pgnText = pgnText.replace(/\$\d+/g, ""); // Remove $9, $6, etc.
    
    // Remove nested parentheses and their content
    while (pgnText.includes('(')) {
        pgnText = pgnText.replace(/\([^()]*\)/g, '');
    }
    
    // Remove any remaining braces and their content
    pgnText = pgnText.replace(/\{[^}]*\}/g, "");
    
    // Remove "..." notation
    pgnText = pgnText.replace(/\.\.\./g, "");
    
    // Extract move sequences
    const moves = pgnText.split(/\d+\.\s*/).filter(Boolean);
    
    moves.forEach(moveSet => {
        const moveParts = moveSet.trim().split(/\s+/).filter(Boolean); // Added filter to remove empty strings
        if (moveParts.length > 0) {
            const moveNumber = (moveTable.length).toString();
            const whiteMove = moveParts[0] || "";
            const blackMove = moveParts[1] || "";
            moveTable.push([moveNumber, whiteMove, blackMove]);
        }
    });
    
    return moveTable;
  };

  if (!pgn) {
    setPgn(examplePgn);
    setMoveTable(parseMoves(examplePgn));
  }

  return (
    <div className="App" style={{ textAlign: 'left', margin: '20px' }}>
      <h2>♟️ PGN Viewer</h2>
      <h4>Input your chess game in PGN format below</h4>

      {errors.length > 0 && (
        <div style={{ 
          color: 'red',
          backgroundColor: '#ffebee',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px'
        }}>
          <h4>Please fix the following issues:</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form style={{ marginBottom: '20px' }} onSubmit={handleSubmit}>
        <p>Enter PGN:</p>
        <textarea 
          name="pgnText"
          defaultValue={examplePgn}
          style={{ 
            width: '700px', 
            height: '300px',
            resize: 'both',
            margin: '10px'
          }}
        />
        <br/>
        <button type="submit" style={{ margin: '10px' }}>View Game</button>
      </form>

      {moveTable && (
        <div>
          <h3>Move Table</h3>
          <table style={{ 
            borderCollapse: 'collapse',  // This ensures borders don't double up
            margin: '10px'
          }}>
            <tbody>
              {moveTable.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex}
                      style={{
                        border: '1px solid black',
                        padding: '5px'
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 