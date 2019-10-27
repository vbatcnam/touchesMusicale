"use strict";
/**
	Auteurs : Claude Lion
	Date création : ‎13 février ‎2019, ‏‎15:52:51
	Copyright : © Claude Lion 2019
*/

class Couleur {
	//variables d'instance : ai_r, ai_v, ai_b, 

	//=========================================
	//constructeurs
	//=========================================
	static fromDetection(ps_couleur) {
		if (ps_couleur.charAt(0) == '#') return Couleur.fromRVB_hexa(ps_couleur);
		else return Couleur.fromRVB_parenthese(ps_couleur);
	}
	static fromRVB_parenthese(ps_couleur) { // rgb ( 234 , 34, 45 )
		const lArrayString_morceaux = ps_couleur.match(/\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
		return Couleur.fromRVB_255_int(
			lArrayString_morceaux[1],
			lArrayString_morceaux[2],
			lArrayString_morceaux[3]
		);
	}
	static fromRVB_255_int(pi_r, pi_v, pi_b) {
		const l_obj = new Couleur();
		l_obj.ai_r = pi_r;
		l_obj.ai_v = pi_v;
		l_obj.ai_b = pi_b;
		return l_obj;
	}
	static fromRVB_hexa(ps_color) {
		const l_obj = new Couleur();
		l_obj.ai_r = parseInt( ps_color.substr(1,2), 16 );
		l_obj.ai_v = parseInt( ps_color.substr(3,2), 16 );
		l_obj.ai_b = parseInt( ps_color.substr(5,2), 16 );
		return l_obj;
	}
	static fromRVB_0to1(pf_r, pf_v, pf_b) {
		//A faire
		// const l_obj = new Couleur();
		//l_obj.ai_r = ;
		//l_obj.ai_v = ;
		//l_obj.ai_b = ;
		// return l_obj;
	}
	static fromHSL_CSS(ps_color) {
		//A faire
		// const l_obj = new Couleur();
		//l_obj.ai_r = ;
		//l_obj.ai_v = ;
		//l_obj.ai_b = ;
		// return l_obj;
	}
	static fromHSL_0to1(h_deg, s0to1, l0to1) {
		const l_obj = new Couleur();
		let rTemp, vTemp, bTemp;
		let c, x, m;
		//On verifie que c'est bien dans les bornes
		if(h_deg >= 0 && h_deg < 360 && s0to1 >= 0 && s0to1 <= 1 && l0to1 >= 0 && l0to1 <= 1 ){
			c = (1 - Math.abs(2 * l0to1 - 1)) * s0to1 ; 
			x = c * (1 - Math.abs((h_deg / 60) % 2 - 1));
			m = l0to1 - c/2;
		}else {
			console.error("la teinte doit être entre 0 et 360 °. \n Votre valeur est : " + h_deg);
			return null;
		}
		
		if(h_deg >= 0 && h_deg < 60){
			rTemp=c; vTemp=x; bTemp=0;
		}else if(h_deg >= 60 && h_deg < 120){
			rTemp=x; vTemp=c; bTemp=0;
		}else if(h_deg >= 120 && h_deg < 180){
			rTemp=0; vTemp=c; bTemp=x;
		}else if(h_deg >= 180 && h_deg < 240){
			rTemp=0; vTemp=x; bTemp=c;
		}else if(h_deg >= 240 && h_deg < 300){
			rTemp=x; vTemp=0; bTemp=c;
		}else if(h_deg >= 300 && h_deg < 360){
			rTemp=c; vTemp=0; bTemp=x;
		}else{
			console.error(" erreur hsl non conforme : " + h_deg);
			return null;
		}
		
		l_obj.ai_r = Math.round( (rTemp + m)*255 );
		l_obj.ai_v = Math.round( (vTemp + m)*255 );
		l_obj.ai_b = Math.round( (bTemp + m)*255 );
		return l_obj;
	}
	static fromHSL_240_int(pi_r, pi_v, pi_b) {
		//A faire
		// const l_obj = new Couleur();
		//l_obj.ai_r = ;
		//l_obj.ai_v = ;
		//l_obj.ai_b = ;
		// return l_obj;
	}
	
	//=========================================
	// conversions
	//=========================================
	toRVB_255_int() {
		return {r: ai_r, v: ai_v, b: ai_b};
	}
	toRVB_hexa() {
		let r = formate(this.ai_r.toString(16), 2);
		let v = formate(this.ai_v.toString(16), 2);
		let b = formate(this.ai_b.toString(16), 2);
		return "#" + r + v + b;
	}
	toHSL_CSS() {
		let coul = this.toHSL_deg_0to1();
		return "hsl("+ coul.h + "," + coul.s*100 +"%," + coul.l*100 + "%)";
	}
	toRVB_0to1() {
		return {r: this.ai_r/255, v:this.ai_v/255, b:this.ai_b /255};
	}
	toHSL_deg_0to1() {
		let coul = this.toRVB_0to1();

		//conversion
		let cMax = Math.max(coul.r, coul.v, coul.b);
		let cMin = Math.min(coul.r, coul.v, coul.b);
		let diff = cMax - cMin;
		
		let light = (cMax + cMin) / 2 ;
		let saturate;
		let teinte;
		
		//saturation
		if(diff == 0){
			saturate = 0;
		}else{
			saturate = diff / (1 - Math.abs(2 * light -1))
		}
		
		//teinte
		if(diff == 0){
			teinte = 0;
		}else{
			switch(cMax){
				case coul.r :
					teinte = 60 * ( mod( (coul.v - coul.b)/diff, 6) );
					break;
				case coul.v :
					teinte = 60 * ( (coul.b - coul.r) / diff + 2);
					break;
				case coul.b :
					teinte = 60 *  ( (coul.r - coul.v) / diff + 4);
					break;
				default :
					console.error("erreur de calcul dans la teinte ! \n Rouge : " + coul.r + ", vert : " + coul.v + ", bleu : "+ coul.v + " et cMax :" +cMax);
					return null;
			}
		}
		return {h: teinte, s: saturate, l: light};
	}
	
	//=========================================
	//autres
	//=========================================
	compareLight(pCouleur)
	{
		let coulOrigine = this.toHSL_deg_0to1();
		let coulChange = pCouleur.toHSL_deg_0to1();
		//changement/origine
		return coulChange.l/coulOrigine.l;

	}
	getDarker(pf_proportion){
		let coul = this.toHSL_deg_0to1();
		return Couleur.fromHSL_0to1(coul.h, coul.s, coul.l*pf_proportion);
	}
	
	getAvecAutreTeinte(teinte){
		let coul = this.toHSL_deg_0to1();
		return Couleur.fromHSL_0to1(teinte, coul.s, coul.l);
	}
	// eclairciToi(){A faire}

}

