import './Onetris.css';

export default function Onetris() {
  const params = new URLSearchParams(window.location.search);
  const state = Number(params.get('state'));
  const binary = state.toString(2);
  const blen = binary.length;
  
  //var blocks = state;
  
  var tableContent = '<table class="onetris">';
  var counter = 77;
  for(var i = 0; i < 11; i++) {
    tableContent += '<tr>';
    for(var j = 0; j < 7; j++) {
      counter--;
      if(counter < blen && binary.charAt(blen - counter - 1) === '1') {
        tableContent += '<td bgcolor="red" />';
      } else {
        tableContent += '<td />';
      }
    }
    tableContent += '</tr>'
  }
  tableContent += '</table>';
  
  return (
    <div class="basic">
      <h3>{state} in binary is {binary}</h3>

      <div dangerouslySetInnerHTML={{ __html: tableContent }} />

    </div>
    
  );
}

//<script>
//window.setTimeout(function(){

        // Move to a new location or you can do something else
        //window.location.href = "https://www.google.co.in";

//    }, 5000);



//export default App;
