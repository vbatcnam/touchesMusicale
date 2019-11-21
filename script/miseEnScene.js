'use strict';
/**
	Auteur : Véronique Lion
	Date création : 2019-11-20 17h00
	Copyright : © Véronique Lion 2019
*/


//On récupère le zone SVG
var zoneSVG = document.getElementById('zoneMusique');

// création du contexte audio
var contexteAudio = new AudioContext()

//Dans ce programme il n'y a qu'un seul instrument.
var wave_trombone = contexteAudio.createPeriodicWave(
	new Float32Array(trombone.real), 
	new Float32Array(trombone.imag)
);

//Création de la machine SugarCubes
var instrument = SC.machine(25)
instrument.addNote = instrument.addProgram;

//créer un tableau avec les notes (il y a 9 gammes, on va en faire 3.
//teste une gamme
var x = 10;
for(var note of gamme){
	instrument.addNote( new NoteDeMusique( note, 3, x, 10) );
	x = x+50;
}
//console.log("instrument");
//console.log(instrument);