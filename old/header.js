function stream() {
    var value1 = encodeURIComponent("stream"),
    var xhr = new XMLHttpRequest();
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.open('POST', 'http://127.0.0.1/');
    xhr.send('stream=' + value1);
    xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
         var but = document.getElementsById('stream');
         if (but.innerHTML == "Stop") {
             but.innerHTML = "Start";
         else {
             but.innerHTML = "Stop";
         }
    }
}
