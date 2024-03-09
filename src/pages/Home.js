import { Link } from "react-router-dom";
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
        </tr>
      </table>
    </div>
  );
}



//export default App;
