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
      </table>
    </div>
  );
}



//export default App;
