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
				DO rouge : 0
				Ré orange: 30
				Mi jaune : 60
				Fa vert : 120
				Sol aqua: 180
				La bleu: 240
				Si violet: 270
			Pour les # on change la saturation
				note normale saturation 100%, note # saturation 50%
			Pour l'octave 3 (LA) la luminosité est à 50% (9 octaves)
				Octave 0 = 10%
				Octave 1 = 20%
				Octave 2 = 35%
				Octave 3 = 50%
				Octave 4 = 60%
				Octave 5 = 67%
				Octave 6 = 74%
				Octave 7 = 80%
				Octave 8 = 85%
				Octave 9 = 90%
		*/
		let tabColor = {'do':0, 'ré':30}
	}
	
	static getHertz()
	{
		//calculer
	}
	
	DessineMoi()
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
			age:this.age, // si c'est un jeune veau
			taille:this.taille, //pour le mettre à l’échelle à l'écran
		}
	}
	
}