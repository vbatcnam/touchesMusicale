'use strict';

/**
L'interface AudioContext représente un graphe de traitement audio fait de modules audio reliés entre eux, chaque module correspondant à un AudioNode. Un contexte audio contrôle à la fois la création des nœuds qu'il contient et l'exécution du traitement audio, ou du décodage. On commence toujours par créer un contexte audio, et tout ce qui va se passer ensuite se situera dans ce contexte.
*/
var contexteAudio = new AudioContext();

//créer le son du trombone
var wave_trombone = contexteAudio.createPeriodicWave(
	new Float32Array(trombone.real), 
	new Float32Array(trombone.imag)
);

/**
L'interface OscillatorNode représente un signal périodique, une sinusoïde par exemple. C'est un module de traitement audio AudioNode qui crée un signal sinusoïdal à une fréquence donnée — c'est-à-dire génère une tonalité constante.
*/
var oscillateur;

/** oscillateur.type :
Chaîne de caractères indiquant la forme de l'onde générée. Différentes ondes produisent différentes tonalités.  Les valeurs standard sont "sine", "square", "sawtooth", "triangle" et "custom". La valeur par défault is "sine". custom permet d'utiliser une PeriodicWave pour décrire une forme d'onde personnalisée.
*/
function createNote(str_note, int_octave, str_type, wave){
	let hertz = tab_notesFrequences[str_note][int_octave];
	oscillateur = contexteAudio.createOscillator();
	oscillateur.frequency.value = hertz;

	// oscillateur.type = str_type;
	// console.log('eeeee');
	if(str_type === "custom"){
		oscillateur.setPeriodicWave(wave);
	} else {
		oscillateur.type = str_type;
	}
	oscillateur.connect(contexteAudio.destination);
	oscillateur.start();
}

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
var notes ={
	'do':{
		freq :[32.703,65.406,130.81,261.63,523.25,1046.5,2093,4186,8372,16744],
		color:"rgb(220, 20, 60)"//crimson
	},
	'do#':{
		freq :[34.648,69.296,138.59,277.18,554.37,1108.7,2217.5,4434.9,8869.8,17740],
		color:"rgb(165, 42, 42)"//brown
	},
	'ré':{
		freq :[36.708,73.416,146.83,293.66,587.33,1174.7,2349.3,4698.6,9397.3,18795],
		color:"rgb(255, 127, 80)"//corail
	},
	'ré#':{
		freq :[38.891,77.782,155.56,311.13,622.25,1244.5,2489,4978,9956.1,19912],
		color:"rgb(210, 105, 30)"//chocolat
	},
	'mi':{
		freq :[41.203,82.407,164.81,329.63,659.26,1318.5,2637,5274.10548,21096],
		color:"rgb(255, 215, 0)"//gold
	},
	'fa':{
		freq :[43.654,87.307,174.61,349.23,698.46,1396.9,2793.8,5587.7,11175,22351],
		color:"rgb(173, 255, 47)"//greenYellow
	},
	'fa#':{
		freq :[46.249,92.499,185,369.99,739.99,1480,2960,5919.9,11840,23680],
		color:"rgb(0, 128, 0)"//green
	},
	'sol':{
		freq :[48.999,97.999,196,392,783.99,1568,3136,6271.9,12544,25088],
		color:"rgb(0, 191, 255)"//deepSkyBlue
	},
	'sol#':{
		freq :[51.913,103.83,207.65,415.3,830.61,1661.2,3322.4,6644.9,13290,26580],
		color:"rgb(30, 144, 255)"//dodgerBlue
	},
	'la':{
		freq :[55,110,220,440,880,1760,3520,7040,14080,28160],
		color:"rgb(100, 149, 237)"//CornflowerBlue
	},
	'la#':{
		freq :[58.27,116.54,233.08,466.16,932.33,1864.7,3729.3,7458.6,14917,29834],
		color:"rgb(0, 0, 139)"//darkBlue
	},
	'si':{
		freq :[61.735,123.47,246.94,493.88,987.77,1975.5,3951.1,7902.1,15804,31609]
		color:"rgb(138, 43, 226)"//BlueViolet
	},
};

//récupère le div.
var zoneMusicale = document.getElementById('zoneMusicale');

function createToucheRect(id, h, w, x, y, fond,  bordure){
	let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	rect.id = id;
	rect.setAttribute("stroke", bordure);
	console.log(id);
	console.log(/#$/.test(id));
	if(/#$/.test(id)){
		rect.setAttribute("fill", bordure);
		// rect.setAttribute("width", w);
		// rect.setAttribute("height", h/1.5);
	}else{
		rect.setAttribute("fill", fond);
		// rect.setAttribute("width", w);
		// rect.setAttribute("height", h);
	}
	rect.setAttribute("width", w);
	rect.setAttribute("height", h);

	rect.setAttribute("x", x);
	rect.setAttribute("y", y);
	let texte = document.createTextNode(id);
	rect.appendChild(texte);
	return rect;
}

var zoneSVG = document.getElementById('zoneMusique');
//générer les touches en svg
var positionTouche = {x:0,y:0};
var wTouche = 50;
var hTouche = 50;
for(let note in tab_notesFrequences){
	let touche = createToucheRect (note, hTouche, wTouche, positionTouche.x, positionTouche.y, 'coral', 'chocolate');
	positionTouche.x += wTouche;
	
	//ajout un event
	touche.addEventListener('mousedown',function(){
		createNote(touche.id, 3, 'triangle');
	});
	touche.addEventListener('mouseup',function(evt){
		oscillateur.stop();
	});
	zoneSVG.appendChild(touche);
}


//Low Frequency Oscillator
//var LFO = contexteAudio.createOscillator();
//var VCA =  contexteAudio.createGain();

