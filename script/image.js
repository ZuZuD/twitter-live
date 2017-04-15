var logo = new Image();
logo.src = '/pictures/twitter3.png';
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
logo.addEventListener('load', function() {
    context.drawImage(logo, 0, 0, 65, 65);
});

/*var ang = 0; //angle
var fps = 1000 / 25; //number of frames per sec

logo.onload = function () { //on image load do the following stuff
   // canvas.width = this.width << 1; //double the canvas width
   this.width = canvas.width-28 ; //double the canvas width
   this.height = canvas.height-28 ; //ouble the canvas width
   // canvas.height = this.height << 1; //double the canvas height
    var cache = this; //cache the local copy of image element for future reference
    setInterval(function () {
        context.save(); //saves the state of canvas
        context.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
        context.translate(cache.width, cache.height); //let's translate
        context.rotate(Math.PI / 180 * (ang += 5)); //increment the angle and rotate the image 
        context.drawImage(logo, -cache.width / 2, -cache.height / 2, cache.width, cache.height); //draw the image ;)
        context.restore(); //restore the state of canvas
    }, fps);
};*/
