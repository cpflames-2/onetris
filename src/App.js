import logo from './logo.svg';
import './App.css';

const eratosthenes = function(n) {
    // Eratosthenes algorithm to find all primes under n
    var array = [], upperLimit = Math.sqrt(n);
    var output = [];

    // Make an array from 2 to (n - 1)
    for (var i = 0; i < n; i++) {
        array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }

    // All array[i] set to true are primes
    for (var i = 2; i < n; i++) {
        if(array[i]) {
            output.push(i);
        }
    }

    return output.join(" ");
};

function App() {
  var params = new URLSearchParams(window.location.search);
  var number = params.get('factorme');
  
  const factoring = eratosthenes(number);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Enjoy Learning Chess!</h1>
        <h2>Chess lesson content, coming soon.</h2>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h3>{number}</h3>
      <h3>{factoring}</h3>
    </div>
  );
}



export default App;
