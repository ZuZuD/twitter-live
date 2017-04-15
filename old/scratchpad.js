/*
 * Ceci est une ardoise JavaScript.
 *
 * Saisissez du code JavaScript, puis faites un clic droit ou sélectionnez à partir du menu Exécuter :
 * 1. Exécuter pour évaluer le texte sélectionné (Ctrl+R),
 * 2. Examiner pour mettre en place un objet Inspector sur le résultat (Ctrl+I), ou,
 * 3. Afficher pour insérer le résultat dans un commentaire après la sélection. (Ctrl+L)
 */
var divs = document.getElementsByTagName('div'),
mainDiv = document.createElement('div'),
br = document.createElement('br'),
children = divs.lastChild,
divsLen = divs.length;

for (i = 0; i < divsLen; i++) {
  var children = divs[i].lastChild;
  while (children) {
    if (children.nodeType == 3) {
      //console.log(children.data +" UN ALA FOIS");
      var child = children.cloneNode(true);
      mainDiv.appendChild(child);
      mainDiv.innerHTML += "<br>";
      mainDiv.appendChild(br);
    }
    children = children.previousSibling;
  }
  document.body.removeChild(divs[i]);
}
document.body.appendChild(mainDiv);
//console.log(mainDiv.textContent +" UN ALA FOIS");
/*
Exception: NotFoundError: Node was not found
@Scratchpad/5:26:0
*/
/*
Exception: TypeError: mainDiv.nodeValue is null
@Scratchpad/5:34:1
*/
/*
Exception: TypeError: Argument 1 of Node.appendChild is not an object.
@Scratchpad/5:21:7
*/