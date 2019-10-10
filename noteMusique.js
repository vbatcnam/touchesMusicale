'use strict';

/**
L'interface AudioContext représente un graphe de traitement audio fait de modules audio reliés entre eux, chaque module correspondant à un AudioNode. Un contexte audio contrôle à la fois la création des nœuds qu'il contient et l'exécution du traitement audio, ou du décodage. On commence toujours par créer un contexte audio, et tout ce qui va se passer ensuite se situera dans ce contexte.
*/
var contexteAudio = new AudioContext();

/**
L'interface OscillatorNode représente un signal périodique, une sinusoïde par exemple. C'est un module de traitement audio AudioNode qui crée un signal sinusoïdal à une fréquence donnée — c'est-à-dire génère une tonalité constante.
*/
var oscillateur;

function créeNote(hertz){
	oscillateur = contexteAudio.createOscillator();
	oscillateur.frequency.value = hertz;
	oscillateur.type = 'triangle';
	oscillateur.connect(contexteAudio.destination);
	oscillateur.start();
}
/**
Chaîne de caractères indiquant la forme de l'onde générée. Différentes ondes produisent différentes tonalités.  Les valeurs standard sont "sine", "square", "sawtooth", "triangle" et "custom". La valeur par défault is "sine". custom permet d'utiliser une PeriodicWave pour décrire une forme d'onde personnalisée.
*/

//récupère le div.
var zoneMusicale = document.getElementById('zoneMusicale');

//tableau de la gamme avec note et fréquence.
var nomDesNotes = ['do', 'ré', 'mi', 'fa', 'sol', 'la', 'si'];

//generer les boutons
for(let note of nomDesNotes){
	let baliseBouton = document.createElement('button');
	baliseBouton.setAttribute('id', note);
	let texte = document.createTextNode(note);
	baliseBouton.appendChild(texte);
	//ajout un event
	baliseBouton.addEventListener('mousedown',function(){
		créeNote(262);
	});
	baliseBouton.addEventListener('mouseup',function(evt){
		oscillateur.stop();
	});
	zoneMusicale.appendChild(baliseBouton);
}


//Low Frequency Oscillator
var LFO = contexteAudio.createOscillator();
var VCA =  contexteAudio.createGain();

console.dir(contexteAudio);
