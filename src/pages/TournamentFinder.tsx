import React, { useState, useEffect } from 'react';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, retries = 3, baseDelay = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      // Exponential backoff: 1s, 2s, 4s
      await delay(baseDelay * Math.pow(2, i));
    }
  }
  throw new Error('All retries failed');
}

export default function TournamentFinder(): JSX.Element {
  const [reports, setReports] = useState<{ [filename: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWithRetry('/tournament_reports/index.json')
      .then(response => response.json())
      .then(files => {
        // Process files sequentially to avoid overwhelming the server
        files.reduce((promise, filename) => {
          return promise.then(() => 
            fetchWithRetry(`/tournament_reports/${encodeURIComponent(filename)}`)
              .then(response => response.text())
              .then(content => {
                setReports(prev => ({
                  ...prev,
                  [filename]: content
                }));
              })
              .catch(error => {
                console.error('Error loading report:', filename, error);
                setError(`Error loading ${filename}: ${error.message}`);
              })
          );
        }, Promise.resolve());
      })
      .catch(error => {
        console.error('Error loading report list:', error);
        setError(`Error loading report list: ${error.message}`);
      });
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      <h1>Tournament Results Finder</h1>
      {error && (
        <div style={{ 
          color: 'red',
          backgroundColor: '#ffebee',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}
      {Object.entries(reports).map(([filename, content]) => (
        <div key={filename} style={{ marginBottom: '2em' }}>
          <h3>
            <a 
              href={`/results?savedReport=${encodeURIComponent(filename)}`}
              style={{ 
                color: '#2196F3',
                textDecoration: 'none'
              }}
              onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
            >
              {filename}
            </a>
          </h3>
          <pre style={{ 
            whiteSpace: 'pre-wrap',
            backgroundColor: '#f5f5f5',
            padding: '1em',
            borderRadius: '4px'
          }}>
            {content}
          </pre>
        </div>
      ))}
    </div>
  );
} 