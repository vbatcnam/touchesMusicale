function creerElement(balise, tabAssAttributs,contenu) {
  // crée un nouvel élément et lui donne un peu de contenu
  const elt = document.createElement(balise);
  if(tabAssAttributs != null) {             
	for(let attribut in tabAttributs){ 
		elt[attribut] = tabAttributs[attribut];
	}
  }
  const nouveauContenu = document.createTextNode(contenu);
  elt.appendChild(nouveauContenu) //ajoute le contenu au div
}
