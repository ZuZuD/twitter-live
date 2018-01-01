/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

function checkArrays (arrA, arrB) {
    // check if lengths are different
  if (arrA.length !== arrB.length) return false
  for (var i = 0; i < arrA.length; i++) {
    if (arrA[i] !== arrB[i]) return false
  }
  return true
}

function fliptostop () {
  if (btn_stream.value !== 'Stop') btn_stream.value = 'Stop'
}

function fliptostart () {
  if (btn_stream.value !== 'Stream') btn_stream.value = 'Stream'
}

function log_xhr (xhr) {
  console.log('Error happens !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText)
}

function rgb2hex (rgb) {
  var a = rgb.split('(')[1].split(')')[0]
  a = a.split(',')
  var b = a.map(function (x) {             // For each array element
    x = parseInt(x).toString(16)      // Convert to a base16 string
    return (x.length === 1) ? '0' + x : x  // Add zero if we get only one character
  })
  b = '#' + b.join('')
  return b
}
