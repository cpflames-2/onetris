import logo from '../logo.svg';
import '../App.css';

function primesUpto(n) {
    // Eratosthenes algorithm to find all primes under n
    var array = [];
    var upperLimit = Math.sqrt(n);
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

    return output;
};

function factorThis(number) {
  const primes = primesUpto(number);
  var output = [];
  var remaining = number;
  var primeIndex = 0;
  while(remaining > 1) {
    var currPrime;
    if(primeIndex >= primes.length) {
      currPrime = remaining;
    } else {
      currPrime = primes[primeIndex];
    }
    //console.log({remaining, primeIndex, currPrime});
    if(remaining % currPrime === 0) {
      output.push(currPrime);
      remaining /= currPrime;
    } else {
      primeIndex++;
    }
  }
  return output.join("  x  ");
}

export default function Home() {
  var params = new URLSearchParams(window.location.search);
  var number = params.get('number');
  
  const primes = primesUpto(Math.sqrt(number));
  
  const factoring = factorThis(primes, number);
  
  return (
    <div className="App">
      <h3>{number}={factoring}</h3>
      <header className="App-header">
        <h1>Enjoy Learning Chess!</h1>
        <h2>Chess lesson content, coming soon.</h2>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}



//export default App;
