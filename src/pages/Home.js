import './Home.css';
import '../App.css';

export default function Home() {
  return (
    <div className="App">
      <h1>Enjoy Learning Chess!</h1>
      <h2>Frequently Asked Questions about Learning and Chess</h2>

      <h3>How are ratings calculated at tournaments?</h3>
      <p>Ratings are calculated based on your results, and the strength of your opponents.
        The following table shows typical rating changes per match, based on the rating difference between you and your opponent.
        In the NWSRS system used in Washington State, the rate of change may be higher for newer players, as they settle into their accurate rating.
      </p>

      <table border="1" style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th>RatingΔ</th>
            <th>Win Rate</th>
            <th>Win</th>
            <th>Draw</th>
            <th>Loss</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+500</td>
            <td>5%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 47</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 22</td>
            <td style={{ backgroundColor: "#FCC" }}>- 3</td>
          </tr>
          <tr>
            <td>+400</td>
            <td>9%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 45</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 20</td>
            <td style={{ backgroundColor: "#FCC" }}>- 5</td>
          </tr>
          <tr>
            <td>+300</td>
            <td>15%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 42</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 17</td>
            <td style={{ backgroundColor: "#FCC" }}>- 8</td>
          </tr>
          <tr>
            <td>+200</td>
            <td>24%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 38</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 13</td>
            <td style={{ backgroundColor: "#FCC" }}>- 12</td>
          </tr>
          <tr>
            <td>+100</td>
            <td>36%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 32</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 7</td>
            <td style={{ backgroundColor: "#FCC" }}>- 18</td>
          </tr>
          <tr>
            <td>0</td>
            <td>50%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 25</td>
            <td>0</td>
            <td style={{ backgroundColor: "#FCC" }}>- 25</td>
          </tr>
          <tr>
            <td>-100</td>
            <td>64%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 18</td>
            <td style={{ backgroundColor: "#FCC" }}>- 7</td>
            <td style={{ backgroundColor: "#FCC" }}>- 32</td>
          </tr>
          <tr>
            <td>-200</td>
            <td>76%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 12</td>
            <td style={{ backgroundColor: "#FCC" }}>- 13</td>
            <td style={{ backgroundColor: "#FCC" }}>- 38</td>
          </tr>
          <tr>
            <td>-300</td>
            <td>85%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 8</td>
            <td style={{ backgroundColor: "#FCC" }}>- 17</td>
            <td style={{ backgroundColor: "#FCC" }}>- 42</td>
          </tr>
          <tr>
            <td>-400</td>
            <td>91%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 5</td>
            <td style={{ backgroundColor: "#FCC" }}>- 20</td>
            <td style={{ backgroundColor: "#FCC" }}>- 45</td>
          </tr>
          <tr>
            <td>-500</td>
            <td>95%</td>
            <td style={{ backgroundColor: "#CFC" }}>+ 3</td>
            <td style={{ backgroundColor: "#FCC" }}>- 22</td>
            <td style={{ backgroundColor: "#FCC" }}>- 47</td>
          </tr>
        </tbody>
      </table>

      <p>
        <b>RatingΔ</b> is your opponent's rating minus your rating.<br/> 
        <b>Win Rate</b> is the percentage of games you are expected to win, based on the RatingΔ.<br/>
        <b>Win</b>, <b>Draw</b>, and <b>Loss</b> are the points you receive for the match.<br/>
        <br/>
        For example, the third row shows that if you're playing someone rated 300 points higher than you,
        you can expect to win 15% of the time.  If you win, you get +42 points; if you lose, you get -8 points.
        <br/>
        If you are instead playing someone rated 300 points lower than you, you can expect to win 85% of the time.
        If you win, you get +8 points; if you lose, you get -42 points.
        <br/>
        The table is based on <a href="https://en.wikipedia.org/wiki/Elo_rating_system">Elo rating system</a> formulas, 
        which were created to calculate chess ratings. The values in the table are based on a K-Factor of 50, 
        which is common for elementary school tournaments, to help young players settle into their rating.
        As players get older and more experienced, the K-Factor will decrease, and the rating changes will be smaller.
      </p>


      <h3>What are your recommended chess resources?</h3>

      <h4>Chess Books</h4>
      ▶ <a href="https://www.amazon.com/Bobby-Fischer-Teaches-Chess/dp/0553263153">Bobby Fischer Teaches Chess</a>
      <br/>
      ▶ <a href="https://www.amazon.com/How-Win-Chess-Ultimate-Beginners/dp/1984862073">How to Win at Chess</a> by Levy Rozman
      <br/>
      ▶ <a href="https://www.amazon.com/Reassess-Your-Chess/dp/1890085138">Reassess Your Chess</a> by Jeremy Silman


      <h4>Chess Videos</h4>
      ▶ <a href="https://www.youtube.com/@ChessKidOfficial">ChessKid / Fun Master Mike</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@GothamChess">Gotham Chess / Levy Rozman</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@eric-rosen">Eric Rosen</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@KebuChess">Chess Openings / Coach Krishna</a>


      <h4>Chess Apps</h4>
      ▶ <a href="https://www.chesskid.com/app">ChessKid</a>
      <br/>
      ▶ <a href="https://dragonbox.com/products/learn-chess-with-dragonbox">Learn Chess with DragonBox</a>
      <br/> <small>(formerly "Magnus Kingdom of Chess")</small>
      <br/>
      ▶ <a href="https://play.google.com/store/apps/details?id=com.universis.dinosaurchess">Dinosaur Chess</a>


      <h3>What other learning resources do you enjoy?</h3>

      <h4>Math Videos</h4>
      ▶ <a href="https://www.youtube.com/@3blue1brown">3 blue 1 brown</a>
      <br/>
      ▶ <a href="https://www.youtube.com/user/standupmaths">Stand-Up Maths</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@numberphile">Numberphile</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@Numberblocks">Numberblocks</a>

      <h4>Math Apps</h4>
      ▶ <a href="https://brilliant.org/">Brilliant.org</a>
      <br/>
      ▶ <a href="https://www.khanacademy.org/">Khan Academy</a>

      <h4>Science Videos</h4>
      ▶ <a href="https://www.youtube.com/@kurzgesagt">Kurzgesagt</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@NileRed">Nile Red</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@veritasium">Veritasium</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@SteveMould">Steve Mould</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@TheActionLab">The Action Lab</a>

      <h4>Engineering Videos</h4>
      ▶ <a href="https://www.youtube.com/@MarkRober">Mark Rober</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@CrunchLabs">Crunch Labs</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@smartereveryday">Smarter Every Day</a>

      <h4>Engineering Apps</h4>
      ▶ <a href="https://lightbot.com/">Light Bot</a>
      <br/>
      ▶ <a href="https://www.avokiddo.com/thinkrolls-app/">Thinkrolls</a>

      <h4>General Learning Videos</h4>
      ▶ <a href="https://www.youtube.com/@TEDEd">TED-Ed</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@CGPGrey">CGP Grey</a>
      <br/>
      ▶ <a href="https://www.youtube.com/@MinuteEarth">Minute Earth</a>

    </div>
  );
}



//export default App;
