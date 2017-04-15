// modify CSS when changing color
function color_update(classCSS,id) {
    var color = document.getElementById(id).value;
    var searchedRule = document.styleSheets[0].cssRules;
    console.log(searchedRule.length);
    for (i=0; i < searchedRule.length; i++) {
        if ( searchedRule[i].cssText.split(' ')[0] == classCSS){
            searchedRule[i].style.color = color;
            console.log('im IN color');
        }
    }
}

var checkbox = document.getElementsByName("textcolor");
var searchedRule = document.styleSheets[0].cssRules;
box_len = checkbox.length;
for (i=0; i < box_len; i++) {
  for (j=0; j < searchedRule.length; j++) {
      if ( searchedRule[j].cssText.split(' ')[0] == checkbox[i].id){
          hex_col = rgb2hex(searchedRule[j].style.color);
          checkbox[i].value = hex_col;
      }
  }
}

function rgb2hex(rgb)
{
  var a = rgb.split("(")[1].split(")")[0];
  a = a.split(",");
  var b = a.map(function(x){             //For each array element
    x = parseInt(x).toString(16);      //Convert to a base16 string
    return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
  })
  b = "#"+b.join("");
  return b;
}
