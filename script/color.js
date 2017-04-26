// modify CSS when changing color
function color_update(classCSS,id) {
    var color = document.getElementById(id).value;
    var searchedRule = document.styleSheets[0].cssRules;
    for (i=0; i < searchedRule.length; i++) {
        cssName = searchedRule[i].cssText.split(' ')[0];
        cssColor = searchedRule[i].style.color;
        if (cssName == classCSS){
            searchedRule[i].style.color = color;
            // store cookie if enable
            if (window.c_enable) setCookie(cssName,color,180);
        }
    }
}
var checkbox = document.getElementsByName("textcolor");
var searchedRule = document.styleSheets[0].cssRules;
box_len = checkbox.length;

// init color with cookies if present
if (window.c_enable) { 
  for (i=0; i < searchedRule.length; i++) {
    cssName = searchedRule[i].cssText.split(' ')[0];
    cssColor = searchedRule[i].style.color;
    if (checkCookie(cssName)){
      searchedRule[i].style.color = getCookie(cssName);
     }
  }
}

// init color checkbox with right color
for (j=0; j < box_len; j++) {
  for (i=0; i < searchedRule.length; i++) {
    cssName = searchedRule[i].cssText.split(' ')[0];
    cssColor = searchedRule[i].style.color;
    if (cssName == checkbox[j].id) {
      hex_col = rgb2hex(cssColor);
      checkbox[j].value = hex_col;
    }
  }
}

function rgb2hex(rgb) {
  var a = rgb.split("(")[1].split(")")[0];
  a = a.split(",");
  var b = a.map(function(x){             //For each array element
    x = parseInt(x).toString(16);      //Convert to a base16 string
    return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
  })
  b = "#"+b.join("");
  return b;
}
