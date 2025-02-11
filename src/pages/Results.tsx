import React, { useState, FormEvent } from 'react';
import { Player } from '../types/Player.ts';

// Constants
const HEADER_PARTS = ["pos", "last name first", "id numb", "start"];
const DEFAULT_RATINGS_REPORT = `pos last name first       id numb   start end/#gms  rd1 rd2 rd3 tot 
  1 Player, A             ABCE251G  507   565/ 69   W4  W3  W2  3.0
  2 Player, B             ABCDK04A  100   274/ 30   W3  W4  L1  2.0
  3 Player, C             ABCBJ97F  424   367/ 33   L2  L1  W4  1.0
  4 Player, D             ABCEK03Z  227   164/ 24   L1  L2  L3  0.0`;

interface FormElements extends HTMLFormControlsCollection {
  ratingsReport: HTMLTextAreaElement;
}

interface RatingsFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Results(): JSX.Element {
  const params = new URLSearchParams(window.location.search);
  const ratingsReport = params.get('ratingsReport') || DEFAULT_RATINGS_REPORT;
  const [errors, setErrors] = useState<string[]>([]);
  const [playerOutput, setPlayerOutput] = useState<string>('');

  const parseLine = (line: string): Player | null => {
    const columns = line.trim().split(/\s+/);
    if (columns.length < 11) return null;

    try {
      return new Player(
        columns[0],
        columns[1],
        columns[2],
        columns[3],
        columns[4],
        columns[5],
        columns[6],
        [columns[7], columns[8], columns[9]],
        columns[10]
      );
    } catch (e) {
      console.error(`Error parsing line: ${line}`, e);
      return null;
    }
  };

  const parseRatingsReport = (report: string): Player[] => {
    const newErrors: string[] = [];
    const players: Player[] = [];
    
    // Basic format checks
    if (!report.trim()) {
      newErrors.push("Ratings report cannot be empty");
    }
    const lines = report.trim().split('\n');
    if (lines.length < 2) {
      newErrors.push("Report must contain at least two lines");
    }

    // Header check
    const headerLine = lines[0];
    let currentIndex = -1;
    
    for (const part of HEADER_PARTS) {
      const nextIndex = headerLine.indexOf(part);
      if (nextIndex === -1 || nextIndex <= currentIndex) {
        newErrors.push("Report must include the standard header format");
        break;
      }
      currentIndex = nextIndex;
    }

    // Parse each line into a Player object
    lines.slice(1).forEach((line, index) => {
      const player = parseLine(line);
      if (player) {
        players.push(player);
      } else {
        newErrors.push(`Line ${index + 2}: Invalid player data format`);
      }
    });

    // Additional validations using Player objects
    if (players.length === 0) {
      newErrors.push("No valid player data found");
    }

    // Validate player positions are sequential
    players.forEach((player, index) => {
      if (player.pos !== index + 1) {
        newErrors.push(`Invalid position number for ${player.fullName}`);
      }
    });

    setErrors(newErrors);
    if (newErrors.length === 0) {
      processPlayers(players);
    }

    let output = "";
    players.forEach(player => {
      output += `${player.fullName}: ${player.startRating} → ${player.endRating} (${player.ratingChange > 0 ? '+' : ''}${player.ratingChange})\n`;
    });
    setPlayerOutput(output);
    return players;
  };

  const processPlayers = (players: Player[]): void => {
    console.log('Processing players:', players);
    players.forEach(player => {
      console.log(`${player.fullName}: ${player.startRating} → ${player.endRating} (${player.ratingChange > 0 ? '+' : ''}${player.ratingChange})`);
    });
  };

  const handleSubmit = (e: FormEvent<RatingsFormElement>): void => {
    e.preventDefault();
    const report = e.currentTarget.elements.ratingsReport.value;
    parseRatingsReport(report);
  };
  
  return (
    <div className="App" style={{ textAlign: 'left', margin: '20px' }}>
      <h2>🏆 Tournament Results Checker</h2>
      <h4>Input values below to check your tournament results</h4>

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
        <p>Enter ratings report:</p>
        <textarea 
          name="ratingsReport"
          defaultValue={ratingsReport}
          style={{ 
            width: '1000px', 
            height: '1000px',
            resize: 'both',
            margin: '10px'
          }}
        />
        <p>As formatted at <a href="https://ratingsnw.com">ratingsnw.com</a></p>
        <br/>
        <button type="submit" style={{ margin: '10px' }}>Check My Results</button>
      </form>

      <h3>Results with Commentary</h3>
      <pre>{playerOutput}</pre>
    </div>
  );
} 