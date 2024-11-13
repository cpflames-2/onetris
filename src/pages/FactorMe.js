import logo from '../logo.svg';
import '../App.css';

function primesUpto(n) {
    // Eratosthenes algorithm to find all primes under n
    var array = [];
    var output = [];

    // Make an array from 2 to (n - 1)
    for (var h = 0; h < n; h++) {
        array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= n; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }

    // All array[i] set to true are primes
    for (var k = 2; k < n; k++) {
        if(array[k]) {
            output.push(k);
        }
    }

    return output;
};

function factorThis(primes, number) {
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
      output.push(currPrime.toLocaleString());
      remaining /= currPrime;
    } else {
      primeIndex++;
    }
  }
  return output.join("  x  ");
}

export default function FactorMe() {
  var params = new URLSearchParams(window.location.search);
  const number = Number(params.get('number'));
  
  const startTime = performance.now();
  const primes = primesUpto(Math.sqrt(number));
  const factoring = factorThis(primes, number);
  const endTime = performance.now();
  const timeElapsed = (endTime - startTime).toFixed(2);
  
  return (
    <div className="basic">
      <h3>{number.toLocaleString()} = {factoring}</h3>
      <h3>{primes.length.toLocaleString()} primes considered: {primes.join(", ")}</h3>
      <p>Calculation time: {timeElapsed} ms</p>
    </div>
  );
}



//export default App;
