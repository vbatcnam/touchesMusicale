'use strict';
/**
	Auteur : Véronique Lion
	Date création : 2019-10-31 17:27
	Copyright : © Véronique Lion 2019
*/

class NoteDeMusique extends SCCube{
	constructor(nom, octave){
		super(); //Cube
		this.nom = nom;
		this.octave = octave;
		this.color = this.getColor();
		this.hertz = this.getHertz();
		this.DessineMoi();
	}
	
	getColor()
	{}
	
	getHertz()
	{}
	
	DessineMoi()
	{}
}