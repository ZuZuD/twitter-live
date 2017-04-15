( function() { 
    document.getElementById('submit').addEventListener('click', function() {
        submit_stg();
    });   
    document.getElementById('reset').addEventListener('click', function() {
        reset_stg();
    });   
    settings_page();
})();

function settings_page() {
    // header button content
    var btn_settings = document.getElementById('settings');
    var url_settings = document.getElementById('settings_form');
    if (btn_settings.value == "Settings") {
        btn_settings.value == "Live"; 
        url_settings.action = "settings.html";
    } else {
        btn_settings.value == "Settings";
        url_settings.action = "/"; 
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === XMLHttpRequest.DONE && ( xhr.status === 200 )) {
        console.log("OK 200");
        tick_opts = JSON.parse(xhr.responseText);
        console.log(typeof(tick_opts));
        console.log(tick_opts['show_author']);
        for (var i in tick_opts) {
          console.log(i, tick_opts[i]);
          try {
            if (tick_opts[i] == true ) 
              document.getElementById(i).checked = true;
            else
              document.getElementById(i).checked = false;
          }
          catch (e) {
            console.log(e.message, e.name);
          }
        }
    }
    else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200)
        console.log('Error happens !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);
    })
    xhr.open('GET','/tick_opts', true);
    xhr.send(null);

    document.getElementById("checkbox").checked = true;
    document.getElementById("checkbox").checked = false;
}

function checkArrays( arrA, arrB ){
    //check if lengths are different
    if (arrA.length !== arrB.length) return false;
    for (var i=0;i<arrA.length;i++){
         if(arrA[i] !== arrB[i]) return false;
    }
    return true;
} 

function submit_stg(){
    // fetch ticked values on submit
    var form = new FormData();
    var xhr = new XMLHttpRequest();
    var tick_opts = { 'show_author': document.getElementById('show_author').checked, 'show_date': document.getElementById('show_date').checked };
    for (key in tick_opts) {
      console.log(key, tick_opts[key])}
    xhr.addEventListener('readystatechange', function() { 
    if (xhr.readyState === XMLHttpRequest.DONE && ( xhr.status === 200 )) 
        window.location.href = "/";
    else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) 
        console.log('Error happens !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);
    })
    form.append('tick_opts',JSON.stringify(tick_opts));
    xhr.open('POST','/settings.html', true);
    xhr.send(form);


}

function reset_stg(){}
