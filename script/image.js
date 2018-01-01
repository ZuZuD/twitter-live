/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

var logo = new Image()
logo.src = '/pictures/twitter.png'
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
logo.addEventListener('load', function () {
  context.drawImage(logo, 0, 0, 65, 65)
})
