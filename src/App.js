import logo from './logo.svg';
import './App.css';

function App() {
  var params = new URLSearchParams(window.location.search);
  var number = params.get('factorme');
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Enjoy Learning Chess!</h1>
        <h2>Chess lesson content, coming soon.</h2>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h3>{number}</h3>
    </div>
  );
}

export default App;
