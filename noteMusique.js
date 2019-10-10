'use strict';

/**
L'interface AudioContext représente un graphe de traitement audio fait de modules audio reliés entre eux, chaque module correspondant à un AudioNode. Un contexte audio contrôle à la fois la création des nœuds qu'il contient et l'exécution du traitement audio, ou du décodage. On commence toujours par créer un contexte audio, et tout ce qui va se passer ensuite se situera dans ce contexte.
*/
var contexteAudio = new AudioContext();

/**
L'interface OscillatorNode représente un signal périodique, une sinusoïde par exemple. C'est un module de traitement audio AudioNode qui crée un signal sinusoïdal à une fréquence donnée — c'est-à-dire génère une tonalité constante.
*/
//tableau de la gamme.
var nomDesNotes = [
	['do'],
	['do#','réb'], 
	['ré'],
	['ré#', 'mib'],
	['mi'], 
	['fa'], 
	['fa#', 'solb'], 
	['sol'], 
	['sol#','lab'], 
	['la'], 
	['la#','sib'], 
	['si']
];
var tab_notesFrequences =[
	[32.703,65.406,130.81,261.63,523.25,1046.5,2093,4186,8372,16744],
	[34.648,69.296,138.59,277.18,554.37,1108.7,2217.5,4434.9,8869.8,17740.],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
];
//récupère le div.
var zoneMusicale = document.getElementById('zoneMusicale');

//generer les boutons
for(let note of nomDesNotes){
	let baliseBouton = document.createElement('button');
	baliseBouton.setAttribute('id', note);
	let texte = document.createTextNode(note);
	baliseBouton.appendChild(texte);
	//ajout un event
	baliseBouton.addEventListener('mousedown',function(){
		console.log(baliseBouton.id);
		createNote(baliseBouton.id, 3);
	});
	baliseBouton.addEventListener('mouseup',function(evt){
		oscillateur.stop();
	});
	zoneMusicale.appendChild(baliseBouton);
}

var oscillateur;

function createNote(str_note, int_octave){
	let hertz = calculeHertz(str_note, int_octave);
	oscillateur = contexteAudio.createOscillator();
	oscillateur.frequency.value = hertz;
	oscillateur.type = 'triangle';
	oscillateur.connect(contexteAudio.destination);
	oscillateur.start();
}

function calculeHertz(str_note, int_octave){
	if(str_note === 'la' && int_octave === 3){
		return 440;
	}else{
	//Combien de demi ton par rapport au LA octave 3 ?
	//chercher le numero dans le tableau nomDesNotes
	
		switch(str_note){
			case 'do' :
				return 261.6;
			case 'ré' :
				return 293.7;
			case 'mi' :
				return 329.6;
			case 'fa' :
				return 349.2;
			case 'sol' :
				return 349.2;

		}
		return 292;
	}
}
/**
Chaîne de caractères indiquant la forme de l'onde générée. Différentes ondes produisent différentes tonalités.  Les valeurs standard sont "sine", "square", "sawtooth", "triangle" et "custom". La valeur par défault is "sine". custom permet d'utiliser une PeriodicWave pour décrire une forme d'onde personnalisée.
*/


//Low Frequency Oscillator
//var LFO = contexteAudio.createOscillator();
//var VCA =  contexteAudio.createGain();

