import { useState } from 'react';

// Constants
const HEADER_PARTS = ["pos", "last name first", "id numb", "start"];
const DEFAULT_RATINGS_REPORT = `pos last name first       id numb   start end/#gms  rd1 rd2 rd3 tot 
  1 Player, A             ABCE251G  507   565/ 69   W4  W3  W2  3.0
  2 Player, B             ABCDK04A  100   274/ 30   W3  W4  L1  2.0
  3 Player, C             ABCBJ97F  424   367/ 33   L2  L1  W4  1.0
  4 Player, D             ABCEK03Z  227   164/ 24   L1  L2  L3  0.0`;

export default function Results() {
  const params = new URLSearchParams(window.location.search);
  const ratingsReport = params.get('ratingsReport') || DEFAULT_RATINGS_REPORT;
  const [errors, setErrors] = useState([]);  // Array to store error messages

  // Validation function
  const validateRatingsReport = (report) => {
    const newErrors = [];
    
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
    
    for (const part of HEADER_PARTS) {  // Now using the constant defined at top
      const nextIndex = headerLine.indexOf(part);
      if (nextIndex === -1 || nextIndex <= currentIndex) {
        newErrors.push("Report must include the standard header format");
        break;
      }
      currentIndex = nextIndex;
    }

    // Line format checks
    lines.forEach((line, index) => {
      // Skip header line
      if (index === 0) return;

      // Check line format
      const columns = line.trim().split(/\s+/);
      if (columns.length < 10) {
        newErrors.push(`pos ${index}: Invalid format - missing columns`);
      }

      const pos = columns[0];
      const lastName = columns[1];
      const id = columns[2];
      const start = columns[3];
      const end = columns[4];
      const games = columns[5];
      const rd1 = columns[6];
      const rd2 = columns[7];
      const rd3 = columns[8];
      const tot = columns[9];

      // Check ID format (if it exists)
      if (id && !id.match(/^[A-Z]{4}[A-Z0-9]{3}[A-Z]$/)) {
        newErrors.push(`pos ${index}: Invalid ID format: ${id}`);
      }

      // Check score format
      const score = parseFloat(columns[columns.length - 1]);
      if (isNaN(score) || score < 0 || score > columns.length - 4) {
        newErrors.push(`pos ${index}: Invalid score: ${score}`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const report = e.target.ratingsReport.value;
    if (validateRatingsReport(report)) {
      // Process valid input
      console.log("Input is valid, processing...");
    }
  };
  
  return (
    <div className="App" style={{ textAlign: 'left', margin: '20px' }}>
      <h2>🏆 Tournament Results Checker</h2>
      <h4>Input values below to check your tournament results</h4>

      <form style={{ marginBottom: '20px' }} onSubmit={handleSubmit}>
        <p>Enter ratings report:</p>
        <textarea 
          name="ratingsReport"
          defaultValue={ratingsReport}
          style={{ 
            width: '700px', 
            height: '700px',
            resize: 'both',
            margin: '10px'
          }}
        />
        <p>As formatted at <a href="https://ratingsnw.com">ratingsnw.com</a></p>
        <br/>
        <button type="submit" style={{ margin: '10px' }}>Check My Results</button>
      </form>

      <h3>Results with Commentary</h3>
      <pre>{ratingsReport}</pre>

      {/* Display errors if any */}
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
    </div>
  );
} 