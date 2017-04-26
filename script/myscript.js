var source = new EventSource('/stream');
var btn_stream = document.getElementById('stream');
// cache for not resend the same requests
var search = [], search_cache = ['0'];
var count = 0;


( function() { 
    document.getElementById('search').addEventListener('click', function() {
        search_update();    
    });
    document.getElementById("track").addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) search_update(); // 13 is enter
    });
    btn_stream.addEventListener('click', function() {
        btn_stream.value == 'Stop' ? stop() : (btn_stream.value == 'Continue' ? start() : search_update())
    });
    var oldURL = document.referrer; // get previous visited page
    try { 
      var oldURLsettings = Boolean(oldURL.match(/settings/).length); // True if previous page is settings 
    }
    catch (e) {
      var oldURLsettings = false; 
    }
    // if visitor come from settings, resume stream
    if (oldURLsettings) search_update();
})();

function start() {
   // Continue a closed() stream
   source = new EventSource('/stream');
   source.onmessage = function(event) {
     var datadiv = document.getElementById("data");
     var counterdiv = document.getElementById("count");
     var br = document.createElement('br'),
     txt = document.createElement('div');
     stream = event.data;
     txt.innerHTML = stream;
     datadiv.insertBefore(br, datadiv.firstChild);
     datadiv.insertBefore(txt, datadiv.firstChild);
     count += 1;
     counterdiv.innerHTML = count;
   }
   if (btn_stream.value == 'Stream' || btn_stream.value == "Continue" ) btn_stream.value = "Stop";
}

function search_update() {
    // update new content and start a new stream
    var form = new FormData();
    var xhr = new XMLHttpRequest();
    var datadiv = document.getElementById("data");
    var br = document.createElement('br');
    var newkw = document.createElement('hr');
    search = document.getElementById('track').value.split(',');
    stop();

    xhr.addEventListener('readystatechange', function() { 
        if (xhr.readyState === XMLHttpRequest.DONE && ( xhr.status === 200 )) start();
        else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) 
           log_xhr(xhr);
    });
    // do not re-send request if same request
    if (!checkArrays(search, search_cache)) {
        form.append('track',search);
        xhr.open('POST','/', true);
        xhr.send(form);
        if (window.c_enable) {
          setCookie('search',search,180)
        }
        search_cache = search;
        // do not print <hr> when keyword change and screen is void
        if (datadiv.children.length > 0) {
            datadiv.insertBefore(br, datadiv.firstChild);
            datadiv.insertBefore(newkw, datadiv.firstChild);
        }
    }
}

function stop() {
    // close the stream
    if (btn_stream.value == 'Stop') btn_stream.value = "Continue";
    source.close();
}

function checkArrays( arrA, arrB ){
    //check if lengths are different
    if (arrA.length !== arrB.length) return false;
    for (var i=0;i<arrA.length;i++){
         if(arrA[i] !== arrB[i]) return false;
    }
    return true;
}

function log_xhr(xhr) {
  console.log('Error happens !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);
}

// get cookies options
if (window.c_enable) {
  ( function () {
    var form = new FormData();
    var xhr = new XMLHttpRequest();
    if (checkCookie('tick_opts')){
      tick_opts = JSON.parse(getCookie('tick_opts'));
      console.log(tick_opts);
      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200)
          log_xhr(xhr);
      })
      form.append('tick_opts',JSON.stringify(tick_opts));
      xhr.open('POST','/settings.html', true);
      xhr.send(form);
    }
    if (checkCookie('search')) {
      search = getCookie('search');
      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === XMLHttpRequest.DONE && ( xhr.status === 200 )) start();
        else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200)
          log_xhr(xhr);
      });
      form.append('track',search);
      xhr.open('POST','/', true);
      xhr.send(form);
    }
  })();
}
