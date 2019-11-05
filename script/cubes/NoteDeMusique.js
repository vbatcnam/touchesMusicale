'use strict';
/**
	Auteur : Véronique Lion
	Date création : 2019-10-31 17:27
	Copyright : © Véronique Lion 2019
*/

class NoteDeMusique extends SCCube{
	constructor(nom, octave, x, y){
		super(); //Cube
		this.nom = nom;
		this.octave = octave;
		this.x = x; 
		this.y = y;
		this.color = this.getColor();
		this.hertz = this.getHertz();
		this.illustration = this.DessineMoi();
	}
	
	static getColor()
	{
		/**
			couleurs de l'arc en ciel
				Do rouge : 0
				Ré orange: 30
				Mi jaune : 60
				Fa vert : 120
				Sol aqua: 180
				La bleu: 240
				Si violet: 270
			Pour les # on change la saturation
				note normale saturation 100%, note # saturation 50%
		*/
		let tabColor = {'do':0, 'ré':30, 'mi':60, 'fa':120, 'sol':180, 'la':240, 'si':270};
		let h = tabColor[this.nom]; //teinte
		let s = 100; //saturation
		//Pour les # on change la saturation
		if(/#/.test(this.nom)){
			s = s/2;
		}
		
		/**
			On se base sur le LA 440 hertz, octave 3 : la luminosité est à 50% 
		*/
		//octave de 0 à 9. luminosité en %
		let tabLum = [10,20,35,50,60,67,74,80,85,90];
		let l = tabLum[this.octave]; //luminosité
		return 'hsl(${h},${s}%,${l}%)';
	}
	
	static getHertz()
	{
		//On se base sur le LA de la 3e octave, soit 440 hertz. 
		/**
		Une octave est constituée de 12 demi-tons. (les 6 notes + les notes#) 
		Le double d'une fréquence donne un intervalle d'une octave.
		pour calculer le rapport de fréquence entre 2 notes séparées d'un demi-tons il faut faire par exemple 440 * mdf et j’aurai le le la# de l'octave 3
		Si je fais 440 / mdf, j’aurai sol# de l'octave 3
		
		Si je fais 440 * mdf * mdf, j'aurai Si de l'octave 3
		Si je fais 440 / mdf / mdf, j'aurai sol de l'octave 3
		*/
		let mdf =  Math.pow(2,1/12); //multiplicateurDeFrequence
	}
	
	dessineMoi()
	{
		
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