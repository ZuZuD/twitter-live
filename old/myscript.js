var button = document.getElementById('stream');
button.addEventListener('click', function() {
    stream(this.value); 
    //setInterval(stream, 30);
});
function stream(value){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
        var button = document.getElementById('stream');
        if (xhr.readyState === XMLHttpRequest.DONE && ( xhr.status === 200 || xhr.status == 0 )) {
             button.value == 'Stop' ? button.value = "Stream" : button.value = "Stop";
        } 
        else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) { // En cas d'erreur !
             console.log('Une erreur est survenue !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);
        }
        else { console.log('no confition to enter!'); }
    });
    xhr.open('POST','/stop', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(null);
    console.log('im in LAST');
}
var source = new EventSource('/stream');
source.addEventListener('message', function(event) {
    var datadiv = document.getElementById("data"),
        br = document.createElement('br'),
		    txt = document.createElement('div');
        txt.innerHTML = event.data;
        
    if (datadiv.lastChild.data == 'Nothing received yet') {
        datadiv.removeChild(datadiv.lastChild);
        datadiv.classList.remove('center');
    } 
    datadiv.insertBefore(br, datadiv.firstChild);
    datadiv.insertBefore(txt, datadiv.firstChild);
    //console.log(txt);
});
