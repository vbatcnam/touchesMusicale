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
		let t = tabColor[this.nom]; //teinte
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
		return {t:t, s:s l:l};
	}
	
	static getHertz()
	{
		//calculer
	}
	
	dessineMoi()
	{}
	
	//s'allume lorsqu'on clique ou touche la note
	anime();
	{}

	$publicVar_monApparence(){
		return {//les infos envoyées
			id:this.nom,
			octave:this.octave,
			this.color = this.getColor();
			this.hertz = this.getHertz();
			x:this.x,
			y:this.y,
			dessin:this.illustration,
			changement:this.changement,
		}
	}
	
}