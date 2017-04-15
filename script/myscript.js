var source = new EventSource('/stream');
var btn_stream = document.getElementById('stream');
// cache for not resending same requests
var search = [], search_cache = ['0'];

( function() { 
    document.getElementById('search').addEventListener('click', function() {
        search_update();    
    });
    document.getElementById("track").addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            search_update(); }
    });
    btn_stream.addEventListener('click', function() {
        btn_stream.value == 'Stop' ? stop() : (btn_stream.value == 'Continue' ? start() : search_update())
    });
})();

function start() {
   // Continue a closed() stream
   source = new EventSource('/stream');
   source.onmessage = function(event) {
       var datadiv = document.getElementById("data");
       var br = document.createElement('br'),
       txt = document.createElement('div');
       txt.innerHTML = event.data;
       datadiv.insertBefore(br, datadiv.firstChild);
       datadiv.insertBefore(txt, datadiv.firstChild);
   }
   if (btn_stream.value == 'Stream' || btn_stream.value == "Continue" ) btn_stream.value = "Stop";
}

function stop() {
    // close the stream
    if (btn_stream.value == 'Stop') btn_stream.value = "Continue";
    source.close();
}

function search_update() {
    // update new content and start a new stream
    var msg = " === KEYWORD HAS CHANGED === ";
    var form = new FormData();
    var xhr = new XMLHttpRequest();
    var br = document.createElement('br');
    var txt = document.createElement('div');
    var datadiv = document.getElementById("data");
    search = document.getElementById('track').value.split(',');
    stop();
    txt.classList.add('center');
    txt.innerHTML = msg;

    xhr.addEventListener('readystatechange', function() { 
        if (xhr.readyState === XMLHttpRequest.DONE && ( xhr.status === 200 )) start();
        else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) 
            console.log('Error happens !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);
    });
    // do not re-send request if not changed
    if (!checkArrays(search, search_cache)) {
        form.append('track',search);
        xhr.open('POST','/', true);
        xhr.send(form);
        search_cache = search;
        console.log('new request');
        // do not print "keyword has changed" when screen is void
        if (datadiv.children.length > 0) {
            datadiv.insertBefore(br, datadiv.firstChild);
            datadiv.insertBefore(txt, datadiv.firstChild);
        }
    }
}

function checkArrays( arrA, arrB ){
    //check if lengths are different
    if (arrA.length !== arrB.length) return false;
    for (var i=0;i<arrA.length;i++){
         if(arrA[i] !== arrB[i]) return false;
    }
    return true;
} 
