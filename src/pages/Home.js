import '../App.css';

export default function Home() {
  //var params = new URLSearchParams(window.location.search);
  //var number = params.get('factorme');
  
  return (
    <div className="App">
      <h1>Enjoy Learning Chess!</h1>
      <h4>Chess learning content, coming soon!</h4>
      <span>Until then, please enjoy these learning resources:</span>
      <table className="mild">
        <tr>
          <th></th>
          <th>Channels</th>
          <th>Apps</th>
          <th>Books</th>
        </tr>
        <tr>
          <td>Chess</td>
          <td>
            ● <a href="https://www.youtube.com/@ChessKidOfficial">ChessKid</a>
            <br/>
            ● <a href="https://www.youtube.com/@eric-rosen">Eric Rosen</a>
            <br/>
            ● <a href="https://www.youtube.com/@KebuChess">Coach Krishna</a>
          </td>
          <td>
            ● <a href="https://www.chesskid.com/app">ChessKid</a>
            <br/>
            ● <a href="https://dragonbox.com/products/learn-chess-with-dragonbox">Learn Chess with DragonBox</a>
            <br/> <small>(formerly "Magnus Kingdom of Chess")</small>
            <br/>
            ● <a href="https://play.google.com/store/apps/details?id=com.universis.dinosaurchess">Dinosaur Chess</a>
          </td>
          <td>
            ● <a href="https://www.amazon.com/Bobby-Fischer-Teaches-Chess/dp/0553263153">Bobby Fischer Teaches Chess</a>
            <br/>
            ● <a href="https://www.amazon.com/How-Win-Chess-Ultimate-Beginners/dp/1984862073">How to Win at Chess</a> by Levy Rozman
            <br/>
            ● <a href="https://www.amazon.com/Reassess-Your-Chess/dp/1890085138">Reassess Your Chess</a> by Jeremy Silman
          </td>
        </tr>
        <tr>
          <td>Math</td>
          <td>
            ● <a href="https://www.youtube.com/@3blue1brown">3 blue 1 brown</a>
            <br/>
            ● <a href="https://www.youtube.com/user/standupmaths">Stand-Up Maths</a>
            <br/>
            ● <a href="https://www.youtube.com/@numberphile">Numberphile</a>
            <br/>
            ● <a href="https://www.youtube.com/@Numberblocks">Numberblocks</a>
          </td>
          <td>
            ● <a href="https://brilliant.org/">Brilliant.org</a>
            <br/>
            ● <a href="https://www.khanacademy.org/">Khan Academy</a>
          </td>
          <td>
            ● <a href="https://artofproblemsolving.com/store/list/all-products">Art of Problem Solving</a> by Richard Rusczyk
          </td>
        </tr>
        <tr>
          <td>Science</td>
          <td>
            ● <a href="https://www.youtube.com/@kurzgesagt">Kurzgesagt</a>
            <br/>
            ● <a href="https://www.youtube.com/@NileRed">Nile Red</a>
            <br/>
            ● <a href="https://www.youtube.com/@veritasium">Veritasium</a>
            <br/>
            ● <a href="https://www.youtube.com/@SteveMould">Steve Mould</a>
            <br/>
            ● <a href="https://www.youtube.com/@TheActionLab">The Action Lab</a>
          </td>
          <td>
            ● <a href="https://www.amazon.com/Happy-Atoms/dp/B01M6WEDX3">Happy Atoms</a>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>Engineering</td>
          <td>
            ● <a href="https://www.youtube.com/@MarkRober">Mark Rober</a>
            <br/>
            ● <a href="https://www.youtube.com/@CrunchLabs">Crunch Labs</a>
            <br/>
            ● <a href="https://www.youtube.com/@smartereveryday">Smarter Every Day</a>
          </td>
          <td>
            ● <a href="https://lightbot.com/">Light Bot</a>
            <br/>
            ● <a href="https://www.avokiddo.com/thinkrolls-app/">Thinkrolls</a>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>General Learning</td>
          <td>
            ● <a href="https://www.youtube.com/@TEDEd">TED-Ed</a>
            <br/>
            ● <a href="https://www.youtube.com/@CGPGrey">CGP Grey</a>
            <br/>
            ● <a href="https://www.youtube.com/@answerinprogress">Answer in Progress</a>
          </td>
          <td>
          </td>
          <td>
          </td>
        </tr>
      </table>
    </div>
  );
}



//export default App;
