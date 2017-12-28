function checkArrays( arrA, arrB ){
    //check if lengths are different
    if (arrA.length !== arrB.length) return false;
    for (var i=0;i<arrA.length;i++){
         if(arrA[i] !== arrB[i]) return false;
    }
    return true;
} 
function fliptostop() {
   if (btn_stream.value != "Stop") btn_stream.value = 'Stop';
}

function fliptostart() {
   if (btn_stream.value != 'Stream') btn_stream.value = 'Stream';
}
   
function log_xhr(xhr) {
  console.log('Error happens !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);
}

