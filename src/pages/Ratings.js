import { useState } from 'react';

function fmt(number) {
  return number > 0 ? `+${number.toFixed(0)}` : `${number.toFixed(0)}`;
}

const colorCell = (value) => {
  let bgColor = value > 0 ? "#CFC" : value < 0 ? "#FCC" : "#FFF";
  return <td style={{ backgroundColor: bgColor, textAlign: 'right' }}>{fmt(value)}</td>;
};


export default function Ratings() {
  const params = new URLSearchParams(window.location.search);
  const myRating = Number(params.get('rating')) || 500;
  const oppRatings = params.get('oppRatings') || '400 500 600 700 800';
  const actualPoints = parseFloat(params.get('points')) || 2.5;
  //const [rating, setRating] = useState(initialRating);
  //const [inputValue, setInputValue] = useState('');
  //const [changeValue, setChangeValue] = useState('');
  
  const opponentRatings = oppRatings.split(' ').map(Number);

  const kn = 50 / Math.sqrt(0.84 + 0.0000040445 * Math.pow(2755.99 - myRating, 2));
  const gamesPlayed = opponentRatings.length;
  const k = 800 / (kn + gamesPlayed);
  const expectedPoints = opponentRatings.reduce((sum, oppRating) => {
    const winRate = 1.0/(1.0 + Math.pow(10.0, (oppRating - myRating)/400.0));
    return sum + winRate;
  }, 0.0);

  const ratingChangeTable = [
    [ 500,  5, 0.95*k,  0.45*k, -0.05*k],
    [ 400,  9, 0.91*k,  0.41*k, -0.09*k],
    [ 300, 15, 0.85*k,  0.35*k, -0.15*k],
    [ 200, 24, 0.76*k,  0.26*k, -0.24*k],
    [ 100, 36, 0.64*k,  0.14*k, -0.36*k],
    [   0, 50, 0.50*k,  0.00*k, -0.50*k],
    [-100, 64, 0.36*k, -0.14*k, -0.64*k],
    [-200, 76, 0.24*k, -0.26*k, -0.76*k],
    [-300, 85, 0.15*k, -0.35*k, -0.85*k],
    [-400, 91, 0.09*k, -0.41*k, -0.91*k],
    [-500, 95, 0.05*k, -0.45*k, -0.95*k]
  ];

  const deltaPoints = k * (actualPoints - expectedPoints);
  const effectiveGamesPlayed = Math.max(gamesPlayed, 4);
  const bonusCap = 9.7 * Math.sqrt(effectiveGamesPlayed);
  const bonusPoints = Math.max(0, deltaPoints - bonusCap);
  const newRating = myRating + deltaPoints + bonusPoints;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setRating(Number(inputValue));
  // };
  
  // const handleChange = () => {
  //   if (changeValue) {
  //     setRating(prevRating => prevRating + Number(changeValue));
  //   }
  // };
  
  return (
    <div className="App" style={{ textAlign: 'left', margin: '20px' }}>
      <h3>Rating: {myRating} → {newRating.toFixed(0)}</h3>  
      <h4>Rating Change Table for K={k.toFixed(1)}</h4>
      <table border="1" style={{ margin: '10px' }}>
      <thead>
          <tr>
            <th>RatingΔ</th>
            <th>WinRate</th>
            <th style={{ width: '50px', textAlign: 'center' }}>Win</th>
            <th style={{ width: '50px', textAlign: 'center' }}>Draw</th>
            <th style={{ width: '50px', textAlign: 'center' }}>Loss</th>
          </tr>
        </thead>
        <tbody>
          {ratingChangeTable.map((row, index) => (
            <tr key={index}>
            <td style={{ textAlign: 'right' }}>{fmt(row[0])}</td>
            <td style={{ textAlign: 'right' }}>{row[1]}%</td>
            {colorCell(row[2])}
            {colorCell(row[3])}
            {colorCell(row[4])}
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <b>Games played: {gamesPlayed}</b> vs {opponentRatings.join(', ')}
        <br/><small>(K={k.toFixed(1)}=800/(50/sqrt(0.84+0.0000040445*(2755.99-initialRating)^2)+gamesPlayed))</small>
        <br/>
        <b>Expected points: {expectedPoints.toFixed(1)}, Actual points: {actualPoints.toFixed(1)}</b>
        <br/><small>(Expected points per opponent = 1/(1+10^((oppRating-myRating)/400)))</small>
        <br/>
        <b>Delta points: {deltaPoints.toFixed(1)}</b>
        <br/><small>(Delta points = K * (Actual points - Expected points))</small>
        <br/><small>(Delta points can be added up from each game result, per table above)</small>
        <br/>
        <b>Bonus points: {bonusPoints.toFixed(1)}</b>
        <br/><small>(Delta point gains above ~20 are given again as bonus points)</small>
        <br/><small>(Well, technically, above bonusCap={bonusCap.toFixed(1)} for a {gamesPlayed} round tournament)</small>
        <br/>
        <b>New Rating: {newRating.toFixed(0)}</b>
        <br/><small>(New rating = Starting rating + Delta points + Bonus points)</small>
      </p>



      {/* <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}> */}
      <form style={{ marginBottom: '20px' }}>
        <input 
          type="number"
          name="rating"
          defaultValue={myRating}
          style={{ width: '50px', margin: '10px' }}
        />
        <small>Your starting rating</small>
        <br/>
        <input 
          type="string" 
          name="oppRatings"
          defaultValue={oppRatings}
          style={{ width: '250px', margin: '10px' }}
        />
        <small>Opponent ratings, separated by spaces</small>
        <br/>
        <input 
          type="number" 
          name="points"
          defaultValue={actualPoints}
          step="0.5"
          style={{ width: '50px', margin: '10px' }}
        />
        <small>Points scored in the tournament</small>
        <br/>
        <button type="submit" style={{ margin: '10px' }}>Find New Rating</button>
      </form>

      <h3>Further Explanation</h3>
      <p>
        <b>RatingΔ</b> is your opponent's rating minus your rating.<br/> 
        <b>Win Rate</b> is the percentage of games you are expected to win, based on the RatingΔ.<br/>
        <b>Win</b>, <b>Draw</b>, and <b>Loss</b> are the points you receive for the match, based on the result.<br/>
        <br/>
        For example, the third row shows that if you're playing someone rated 300 points higher than you,
        you can expect to win about 15% of the time.  If you win, you get +42 points; if you lose, you get -8 points.
        <br/>
        If you are instead playing someone rated 300 points lower than you, you can expect to win 85% of the time.
        If you win, you get +8 points; if you lose, you get -42 points.
        <br/>
        The table is based on <a href="https://en.wikipedia.org/wiki/Elo_rating_system">Elo rating system</a> formulas, 
        which were created to calculate chess ratings. The values in the table are based on a K-Factor of 50, 
        which is common for elementary school tournaments, to help young players settle into their rating.
        As players get older and more experienced, the K-Factor will decrease, and the rating changes will be smaller.
      </p>

    </div>
  );
} 