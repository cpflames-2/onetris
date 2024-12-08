import './Home.css';
import '../App.css';

export default function Home() {
  return (
    <div className="App">
      <h1>💡 Enjoy Learning Chess!</h1>
      <img src="/logo512.png" alt="Logo" className="home-logo" style={{ width: '256px' }}/>

      <h2>Chess Website for "Coach Chris" Pleasants</h2>
      <ul>
        <li>Chess Coach for Detective Cookie Chess Club, and Thurgood Marshall Elementary</li>
        <li>Rated <a href="https://www.uschess.org/msa/MbrDtlTnmtHst.php?12699241">1600 USCF</a>, {' '}
            <a href="https://www.chess.com/member/cpflames">1700 chess.com</a></li>
        <li>10 years of chess teaching experience</li>
        <li>WA Elementary State Chess Co-Champion, 1998</li>
      </ul>

      <img src="/images/dccteam.jpg" alt="Detective Cookie Chess Team" style={{ width: '500px' }}/>
      <img src="/images/thuteam.jpg" alt="Thurgood Marshall Chess Team" style={{ width: '500px' }}/>
      <h2>Frequently Asked Questions about Learning and Chess</h2>

      <h3>How are ratings calculated at tournaments?</h3>
      Check out our <a href="/ratings">Interactive Ratings Calculator</a>

      <h3>What are some resources to help me improve and learn?</h3>
      Check out our <a href="/resources">Recommended Resources</a>

      <h3>How do I sign up my kids for tournaments in the Pacific Northwest?</h3>
      There are 2 websites for Northwest Scholastic chess tournaments: 
      {' '} <a href="https://nwchess.com/OnlineRegistration/">NW Chess</a>
      {' '} and <a href="https://chessreg.com/">ChessReg</a>

      <h3>What is it like to play in a chess tournament?</h3>
      NW Chess provides this <a href="https://drive.google.com/file/d/11IYXwGJO_YdD04YEbdBIzXA8vZwRYw96/view">helpful guide to your first tournament</a>.

      <h3>How are chess pairings decided in a tournament?</h3>
      (Guide to swiss-system pairings... coming soon!)

    </div>
  );
}



//export default App;
