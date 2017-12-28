var source; 
var btn_stream = document.getElementById('stream');
// cache to not resend the same requests
var search = [], search_cache = ['0'];
// counter for tweet found
var count = 0;

// define buttons behavior
( function() { 
    document.getElementById('search').addEventListener('click', function() {
        search_update();    
    });
    document.getElementById("track").addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) search_update(); // 13 is enter
    });
    btn_stream.addEventListener('click', function() {
        switch(btn_stream.value) {
          case 'Stop':
            stop();
            break;
          case 'Stream':
            start();
            break;
        }   
    });
})();

// get cookies options
if (window.c_enable) {
  ( function () {
    var form = new FormData();
    var xhr = new XMLHttpRequest();
    
    // Check for option cookie and send async req to update params
    if (checkCookie('tick_opts')){
      tick_opts = JSON.parse(getCookie('tick_opts'));
      console.log("Settings cookie:",tick_opts);
      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200)
          log_xhr(xhr);
      })
      form.append('tick_opts',JSON.stringify(tick_opts));
      xhr.open('POST','/settings.html', true);
      xhr.send(form);
    }

    // Check for search cookie and stream it
    if (checkCookie('search')) {
      search = getCookie('search');
      console.log("Search cookie:",search);
      document.getElementById('track').value = search;     
      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === XMLHttpRequest.DONE && ( xhr.status === 200 )) start();
        else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200)
          log_xhr(xhr);
      });
      form.append('track',search);
      xhr.open('POST','/', true);
      xhr.send(form);
    }
    // else dont start stream
  })();
}

function start() {
   // Start a stream
   fliptostop();
   source = new EventSource('/stream');
   console.log("start function");
   console.log(source.readyState,source.url);
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
}

function search_update() {
    // update query terms and start a new stream
    var form = new FormData();
    var datadiv = document.getElementById("data");
    var br = document.createElement('br');
    var newkw = document.createElement('hr');
    search = document.getElementById('track').value.split(',');
    if (search == "") {
      search = getCookie('search');
    }

    // Consider search only if new
    if (!checkArrays(search, search_cache)) {
        stop();
        console.log("check_cache");
        form.append('track',search);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function() { 
          if (xhr.readyState === XMLHttpRequest.DONE && ( xhr.status === 200 )) {
            start();
            console.log("search_update()");
          }
          else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) 
            log_xhr(xhr);
        });
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
    // else (previous == new) don't do anything
}

function stop() {
    // close the stream
    console.log("stop function");
    console.log(source.readyState,source.url);
    fliptostart();
    source.close();
}
