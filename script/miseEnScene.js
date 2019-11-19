'use strict';
/**
	Auteur : Véronique Lion
	Date création : 2019-11-20
	Copyright : © Véronique Lion 2019
*/


var contexteAudio = new AudioContext()

//Dans ce programme il n'y a qu'un seuk instrument.
var wave_trombone = contexteAudio.createPeriodicWave(
	new Float32Array(trombone.real), 
	new Float32Array(trombone.imag)
);

instrument.addNote = monde.addProgram;

//créer un tableau avec les notes (il y a 9 games, on va en faire 3.

instrument.addNote(new NoteDeMusique(contexteAudio, nom, octave, x, y)));
