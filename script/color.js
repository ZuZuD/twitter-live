/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

var checkbox = document.getElementsByName('textcolor')
var searchedRule = document.styleSheets[0].cssRules
box_len = checkbox.length

// modify CSS when changing color
// call by nav.html
function color_update (classCSS, id) {
  var color = document.getElementById(id).value
  var searchedRule = document.styleSheets[0].cssRules
  for (i = 0; i < searchedRule.length; i++) {
    cssName = searchedRule[i].cssText.split(' ')[0]
    cssColor = searchedRule[i].style.color
    if (cssName === classCSS) {
      searchedRule[i].style.color = color
            // store cookie if enable
      if (window.c_enable) setCookie(cssName, color, 180)
    }
  }
}

// init color with cookies if present
if (window.c_enable) {
  for (i = 0; i < searchedRule.length; i++) {
    cssName = searchedRule[i].cssText.split(' ')[0]
    cssColor = searchedRule[i].style.color
    if (checkCookie(cssName)) {
      searchedRule[i].style.color = getCookie(cssName)
    }
  }
}

// init color checkbox with right color
for (j = 0; j < box_len; j++) {
  for (i = 0; i < searchedRule.length; i++) {
    cssName = searchedRule[i].cssText.split(' ')[0]
    cssColor = searchedRule[i].style.color
    if (cssName === checkbox[j].id) {
      hex_col = rgb2hex(cssColor)
      checkbox[j].value = hex_col
    }
  }
}
