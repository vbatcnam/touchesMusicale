'use strict';
/**
	Auteur : Véronique Lion
	Date création : 2019-10-31 17:27
	Copyright : © Véronique Lion 2019
*/

var gamme = ['do', 'do#', 'ré', 'ré#', 'mi', 'fa', 'fa#', 'sol', 'sol#', 'la','la#','si'];

class NoteDeMusique extends SCCube{
	constructor(nom, octave, x, y){
		super(); //Cube
		this.oscillateur;
		this.nom = nom;
		this.octave = octave;
		this.noteNum = this.attribueUnNumero();
		this.x = x; 
		this.y = y;
		this.height = 50;
		this.width = 50;
		this.color = this.attribueUneCouleurHSL();
		this.hertz = this.attribueUnHertz();
		this.rectToucheMusicale = this.drawMe();
	}
	
	attribueUnNumero(){
		let num = gamme.indexOf(this.nom);
		if(this.octave == 0){
			return num;
		}else{
			return 12*this.octave + num;
		}
	}
	
	attribueUneCouleurHSL()
	{
		/**
			Chaque note à une couleur de l'arc en ciel
		*/
		//teinte en %
		let tabColor = [0, 20, 30, 45, 60, 100, 160, 180, 210, 220, 260,270];
		let num = gamme.indexOf(this.nom)
		this.hue = tabColor[num]; //teinte
		this.saturation = 100; //saturation
		
		/**
			On se base sur le LA 440 hertz, octave 3 : la luminosité est à 50% 
		*/
		//octave de 0 à 9. luminosité en %
		let tabLum = [10,20,35,50,60,67,74,80,85,90];
		this.lightness = tabLum[this.octave]; //luminosité
		return `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`;
	}
	
	attribueUnHertz()
	{
		//On se base sur le LA (indice 9 du tableau gamme) de la 3e octave (noteNum 45), soit 440 hertz. 
		/**
		Une octave est constituée de 12 demi-tons. (les 6 notes + les notes#) 
		Le double d'une fréquence donne un intervalle d'une octave.
		Pour calculer le rapport de fréquence entre 2 notes séparées d'un demi-tons il faut faire par exemple :
			440 * mdf et j’aurai le le la# de l'octave 3
			Si je fais 440 / mdf, j’aurai sol# de l'octave 3
		
			Si je fais 440 * mdf * mdf, j'aurai Si de l'octave 3
			Si je fais 440 / mdf / mdf, j'aurai sol de l'octave 3
		*/
		let mdf =  Math.pow(2,1/12); //multiplicateurDeFrequence
		/** nbreDemiTon
			============
			Nombre de demi tons qui sépare la note du LA octave 3 (noteNum 45)
				Si positif la note se trouve après le LA 
					on multiplie à la puissance de nbreDemiTon
				sinon elle se trouve avant le LA
					on divise par la puissance de nbreDemiTon
		*/
		let nbreDemiTon = this.noteNum - 45; // noteNum du LA octave 3		
		return 440 * Math.pow(mdf,nbreDemiTon);
	}
	

	drawMe(){
		//Crée la balise rect
		let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		rect.id = this.nom;
		// rect.setAttribute("stroke", this.color);
		rect.setAttribute("fill", this.color);
		rect.setAttribute("width", this.width);
		rect.setAttribute("height", this.height);
		rect.setAttribute("x", this.x);
		rect.setAttribute("y", this.y);
		let texte = document.createTextNode(this.nom);
		rect.appendChild(texte);
		
		//ajout un event
		rect.addEventListener('mousedown',this.joueNote.bind(this));
		rect.addEventListener('mouseout',this.stopNote.bind(this));
		rect.addEventListener('mouseup',this.stopNote.bind(this));
		rect.addEventListener('touchstart',this.joueNote.bind(this));
		rect.addEventListener('touchend',this.stopNote.bind(this));
		
		
		//Se dessine à l'écran
		zoneSVG.appendChild(rect);
		//console.log("Fabrique-moi => oscilateur");
		//console.log(this.oscillateur);
		//console.log(this.oscillateur.frequency.value = this.hertz);
		return rect;
	}

	joueNote(evt){console.log("je joue", evt.type, evt.target.id);
		//Création de l'ossiateur
		this.oscillateur = contexteAudio.createOscillator();
		this.oscillateur.type = "triangle"
		this.oscillateur.frequency.value = this.hertz;
		this.oscillateur.connect(contexteAudio.destination);
		this.oscillateur.start();
		
		//changement de couleur du rectangle
		this.lightness = 35; 
		this.color = `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`;
		this.rectToucheMusicale.fill = this.color;
	}
	
	stopNote(evt){
		if(this.oscillateur){//tester si une note est en train de se jouer
			console.log("je ne joue plus", evt.type, evt.target.id);
			this.oscillateur.stop()
			this.lightness = 50; 
			this.color = `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`;
			this.rectToucheMusicale.fill = this.color;
		}
		else{console.log("Il n'y avait aucun son !", evt.type, evt.target.id)
			return;
		}
	}

	$publicVar_monApparence(){
		return {//les infos envoyées
			id:this.nom,
			octave:this.octave,
			color : this.color,
			oscillateur : this.oscillateur,
			hertz : this.hertz,
			x:this.x,
			y:this.y,
			h:this.h,
			w:this.w,
			rectToucheMusicale:this.rectToucheMusicale,//Le rect svg
		}
	}
}
