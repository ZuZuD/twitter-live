var divs = document.getElementById('myDiv').innerHTML.split('<br>');
var table = document.getElementById('myDiv')
//table.removeChild()
//var paragraph = document.querySelector('myDiv');
//var olddiv = table.parentNode.removeAttr;
divs.reverse();
var table = document.createElement('div');
stream = document.createTextNode(divs);
table.appendChild(stream);
document.body.appendChild(table);
