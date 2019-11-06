'use strict';
/**
	Auteur : Véronique Lion
	Date création : 2019-10-31 17:27
	Copyright : © Véronique Lion 2019
*/

var gamme = ['do', 'do#', 'ré', 'ré#', 'mi', 'fa', 'fa#', 'sol', 'sol#', 'la','la#','si'];

class NoteDeMusique extends SCCube{
	constructor(nom, octave, x, y){
		super(); //Cube
		this.nom = nom;
		this.noteNum = attribueUnNumero();
		this.octave = octave;
		this.x = x; 
		this.y = y;
		this.color = this.attribueUneCouleurHSL();
		this.hertz = this.attribueUnHertz();
		this.illustration = this.DessineMoi();
	}
	
	static attribueUnNumero(){
		let num = gamme.indexOf(this.nom);
		if(this.octave == 0){
			return num;
		}else{
			return 12*octave + num;
		}
	}
	
	static attribueUneCouleur()
	{
		/**
			Chaque note à une couleur de l'arc en ciel
		*/
		//teinte en %
		let tabColor = [0, 15, 30, 45, 60, 120, 150, 180, 210, 240, 255,270];
		let h = tabColor[this.noteNum]; //teinte
		let s = 100; //saturation
		
		/**
			On se base sur le LA 440 hertz, octave 3 : la luminosité est à 50% 
		*/
		//octave de 0 à 9. luminosité en %
		let tabLum = [10,20,35,50,60,67,74,80,85,90];
		let l = tabLum[this.octave]; //luminosité
		return 'hsl(${h},${s}%,${l}%)';
	}
	
	static attribueUnHertz()
	{
		//On se base sur le LA (indice 9 du tableau gamme) de la 3e octave (noteNum 45), soit 440 hertz. 
		/**
		Une octave est constituée de 12 demi-tons. (les 6 notes + les notes#) 
		Le double d'une fréquence donne un intervalle d'une octave.
		Pour calculer le rapport de fréquence entre 2 notes séparées d'un demi-tons il faut faire par exemple :
			440 * mdf et j’aurai le le la# de l'octave 3
			Si je fais 440 / mdf, j’aurai sol# de l'octave 3
		
			Si je fais 440 * mdf * mdf, j'aurai Si de l'octave 3
			Si je fais 440 / mdf / mdf, j'aurai sol de l'octave 3
		*/
		let mdf =  Math.pow(2,1/12); //multiplicateurDeFrequence
		
		/** nbreDemiTon
			============
			Nombre de demi tons qui sépare la note du LA octave 3 (noteNum 45)
				Si positif la note se trouve après le LA 
					on multiplie à la puissance de nbreDemiTon
				sinon elle se trouve avant le LA
					on divise par la puissance de nbreDemiTon
		*/
		let nbreDemiTon = noteNum - 45; // noteNum du LA octave 3
		return 440 * Math.pow(mdf,nbreDemiTon);
	}
	

	static dessineMoi(){
		let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		rect.id = this.nom;
		// rect.setAttribute("stroke", this.color);
		rect.setAttribute("fill", this.color);
		rect.setAttribute("width", 50);
		rect.setAttribute("height", 50);

		rect.setAttribute("x", x);
		rect.setAttribute("y", y);
		let texte = document.createTextNode(id);
		rect.appendChild(texte);
		return rect;
	}

	//s'allume lorsqu'on clique ou touche la note
	anime();
	{
		this.changement = '';//A faire
	}

	$publicVar_monApparence(){
		return {//les infos envoyées
			id:this.nom,
			octave:this.octave,
			color : this.color;
			hertz : this.hertz;
			x:this.x,
			y:this.y,
			dessin:this.illustration,
			changement:this.changement,
		}
	}
	
}