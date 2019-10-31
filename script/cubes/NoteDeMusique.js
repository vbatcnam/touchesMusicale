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
	
	getColor()
	{}
	
	getHertz()
	{}
	
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