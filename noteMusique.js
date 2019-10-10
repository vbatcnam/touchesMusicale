'use strict';

/**
L'interface AudioContext représente un graphe de traitement audio fait de modules audio reliés entre eux, chaque module correspondant à un AudioNode. Un contexte audio contrôle à la fois la création des nœuds qu'il contient et l'exécution du traitement audio, ou du décodage. On commence toujours par créer un contexte audio, et tout ce qui va se passer ensuite se situera dans ce contexte.
*/
var contexteAudio = new AudioContext();

/**
L'interface OscillatorNode représente un signal périodique, une sinusoïde par exemple. C'est un module de traitement audio AudioNode qui crée un signal sinusoïdal à une fréquence donnée — c'est-à-dire génère une tonalité constante.
*/
//tableau de la gamme avec son numéro de demi-ton dans une octave.
var gamme = {
	'do': 0,
	'do#': 1,
	'réb': 1, 
	'ré': 2 ,
	'ré#': 3, 
	'mib': 3,
	'mi': 4, 
	'fa': 5, 
	'fa#': 6,
	'solb': 6, 
	'sol': 7, 
	'sol#': 8,
	'lab': 8, 
	'la': 9, 
	'la#': 10,
	'sib': 10, 
	'si': 11 
};

var tab_notesFrequences ={
	'do':[32.703,65.406,130.81,261.63,523.25,1046.5,2093,4186,8372,16744],
	'do#':[34.648,69.296,138.59,277.18,554.37,1108.7,2217.5,4434.9,8869.8,17740],
	'ré':[36.708,73.416,146.83,293.66,587.33,1174.7,2349.3,4698.6,9397.3,18795],
	'ré#':[38.891,77.782,155.56,311.13,622.25,1244.5,2489,4978,9956.1,19912],
	'mi':[41.203,82.407,164.81,329.63,659.26,1318.5,2637,5274.10548,21096],
	'fa':[43.654,87.307,174.61,349.23,698.46,1396.9,2793.8,5587.7,11175,22351],
	'fa#':[46.249,92.499,185,369.99,739.99,1480,2960,5919.9,11840,23680],
	'sol':[48.999,97.999,196,392,783.99,1568,3136,6271.9,12544,25088],
	'sol#':[51.913,103.83,207.65,415.3,830.61,1661.2,3322.4,6644.9,13290,26580],
	'la':[55,110,220,440,880,1760,3520,7040,14080,28160],
	'la#':[58.27,116.54,233.08,466.16,932.33,1864.7,3729.3,7458.6,14917,29834],
	'si':[61.735,123.47,246.94,493.88,987.77,1975.5,3951.1,7902.1,15804,31609]
};
//récupère le div.
var zoneMusicale = document.getElementById('zoneMusicale');

//generer les boutons
for(let note in tab_notesFrequences){
	let baliseBouton = document.createElement('button');
	baliseBouton.setAttribute('id', note);
	let texte = document.createTextNode(note);
	baliseBouton.appendChild(texte);
	//ajout un event
	baliseBouton.addEventListener('mousedown',function(){
		createNote(baliseBouton.id, 3);
	});
	baliseBouton.addEventListener('mouseup',function(evt){
		oscillateur.stop();
	});
	zoneMusicale.appendChild(baliseBouton);
}

//generer les touches
for(let note in tab_notesFrequences){
	let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	rect.id = note;
	rect.setAttribute("width", 23)
	let texte = document.createTextNode(note);
	baliseBouton.appendChild(texte);
	//ajout un event
	baliseBouton.addEventListener('mousedown',function(){
		createNote(baliseBouton.id, 3);
	});
	baliseBouton.addEventListener('mouseup',function(evt){
		oscillateur.stop();
	});
	zoneMusicale.appendChild(baliseBouton);
}


var oscillateur;

function createNote(str_note, int_octave){
	let hertz = tab_notesFrequences[str_note][int_octave];
	oscillateur = contexteAudio.createOscillator();
	oscillateur.frequency.value = hertz;
/**
Chaîne de caractères indiquant la forme de l'onde générée. Différentes ondes produisent différentes tonalités.  Les valeurs standard sont "sine", "square", "sawtooth", "triangle" et "custom". La valeur par défault is "sine". custom permet d'utiliser une PeriodicWave pour décrire une forme d'onde personnalisée.
*/
	oscillateur.type = 'triangle';
	oscillateur.connect(contexteAudio.destination);
	oscillateur.start();
}



//Low Frequency Oscillator
//var LFO = contexteAudio.createOscillator();
//var VCA =  contexteAudio.createGain();

