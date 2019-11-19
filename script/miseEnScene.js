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

instrument.addNote = monde.addProgram;

//créer un tableau avec les notes (il y a 9 games, on va en faire 3.
//teste une note
instrument.addNote(new NoteDeMusique("la", 3, 10, 10)));
