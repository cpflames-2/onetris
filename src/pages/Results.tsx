import React, { useState, FormEvent } from 'react';
import { TournamentResults } from '../types/TournamentResults.ts';

// Constants
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
  const [results, setResults] = useState<TournamentResults>(new TournamentResults(ratingsReport));

  const handleSubmit = (e: FormEvent<RatingsFormElement>): void => {
    e.preventDefault();
    const report = e.currentTarget.elements.ratingsReport.value;
    setResults(new TournamentResults(report));
  };
  
  return (
    <div className="App" style={{ textAlign: 'left', margin: '20px' }}>
      <h2>🏆 Tournament Results Checker</h2>
      <h4>Input values below to check your tournament results</h4>

      {results.hasErrors() && (
        <div style={{ 
          color: 'red',
          backgroundColor: '#ffebee',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px'
        }}>
          <h4>Please fix the following issues:</h4>
          <ul>
            {results.getErrors().map((error, index) => (
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
      <pre>{results.getCommentary()}</pre>
    </div>
  );
} 