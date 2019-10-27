'use strict'

/** 
	SyntaxeSimplifieeSC.js
	Bibliothèque surcouche facilitation sugarCubes.js 
	Auteur : Claude Lion
	Date création : 10/10/2018
	Copyright : © Claude Lion 2018
*/

SC.titreInfoEmise = SC.evt;

//Fabrique un événement par char (
const g_AllSCevents = {}
function SCEVT(ps_nom) {
	if(g_AllSCevents[ps_nom] === undefined) {
		g_AllSCevents[ps_nom] = SC.evt(ps_nom)
	}
	return g_AllSCevents[ps_nom]
}

function parseInstr(ps_texte, pArrayS_nomInstr){
	// ps_methExtractionReste = 'reste' | 'nombre'
	for(let ls_nomInstr of pArrayS_nomInstr){
		if(ps_texte.startsWith(ls_nomInstr)){
			const ls_reste = ps_texte.substring(ls_nomInstr.length)
			const lArray_nombre = ps_texte.match(/\d+/g)
			return {instr: ls_nomInstr, reste: ls_reste, nombres: lArray_nombre}
		}
	}
	return false
}

function getPropertyUntilSCCube(pSCCube_proto) {
	if (pSCCube_proto.constructor !== undefined && pSCCube_proto.constructor !== SCCube) {
		return Object.getOwnPropertyNames(pSCCube_proto).concat( getPropertyUntilSCCube(pSCCube_proto.__proto__) )
	} else {
		return []
	}
}

//permet de créer un cube en même temps que l'objet.
class SCCube extends SC.cube().constructor {
	constructor(...pArray_args) {
		super(null, null)
		if(! pArray_args.length) pArray_args = [{}]
		this.o = this
		this.evtKillInstance = SC.evt('kill instance')
		
		const lArray_methodes = getPropertyUntilSCCube(this.__proto__)
		
		const lArray_prog = []
		for(let ls_nomMeth of lArray_methodes) {
			const pushWithKill = (pProg) => {
				this['kill_' + ls_nomMeth] = SC.evt('kill_' + ls_nomMeth)
				lArray_prog.push(
					SC.kill(
						SC.or(
							SCEVT('kill_' + this.constructor.name + '_' + ls_nomMeth),
							this['kill_' + ls_nomMeth]
						),
						pProg
					)
				)
			}
			
			if(ls_nomMeth.substring(0,1) == '$') {
				const {instr, reste, nombres} = parseInstr(ls_nomMeth, [
					'$actionForever_', '$repeat', '$on_', '$_', '$onNo_',
					'$const_', '$publicConst_',
					'$var_', '$publicVar_',
					'$property_', '$publicProperty_'
				])
				if(instr == '$actionForever_') {
					pushWithKill( SC.action(this[ls_nomMeth].bind(this), SC.forever) )
				}else if(instr == '$repeat'){
					const ln_nbFois = parseInt(nombres[0])
					pushWithKill(SC.repeat( ln_nbFois, ...this[ls_nomMeth]() ))
				}else if(instr == '$const_' || instr == '$publicConst_' || instr == '$var_' || instr == '$publicVar_'){
					const ls_nomVar = reste
					const lArray_args = (pArray_args[0][ls_nomMeth] == undefined)
							? []
							: pArray_args[0][ls_nomMeth]
					if(instr == '$const_' || instr == '$publicConst_'){
						this[ls_nomVar] = this[ls_nomMeth](...lArray_args)
					}else{
						this[ls_nomVar] = this[ls_nomMeth].bind(this, ...lArray_args)
					}
					if(instr == '$publicVar_' || instr == '$publicConst_'){
						pushWithKill(SC.generate(
							SCEVT(ls_nomVar),
							this[ls_nomVar],
							SC.forever
						))
					}
				}else if(instr == '$property_' || instr == '$publicProperty_'){
					const ls_nomProperty = reste
					const lArray_parts = this[ls_nomMeth]()
					this[ls_nomProperty] = this.defineProperty(...lArray_parts)
					pushWithKill(SC.repeat( SC.forever, this[ls_nomProperty] ))
					if(instr == '$publicProperty_'){
						pushWithKill(SC.generate(
							SCEVT(ls_nomProperty),
							this[ls_nomProperty].valeur,
							SC.forever
						))
					}
				}else if(instr == '$on_'){//uniquement avec undefined, SC.forever
					const ls_nomEvt = ls_nomMeth.match(/_[A-Za-z0-9]+(?=_|$)/g)[0].substring(1)
					pushWithKill(SC.actionOn(
						SCEVT(ls_nomEvt),
						(pArray_allEvt, pMachine)=>{
							const lArray_evt = pArray_allEvt[SCEVT(ls_nomEvt)]
							this[ls_nomMeth](lArray_evt, pMachine)
						},
						undefined,
						SC.forever
					))
				}else if(instr == '$onNo_'){//uniquement avec SC.NO_ACTION, SC.forever
					const ls_nomEvt = ls_nomMeth.match(/_[A-Za-z0-9]+(?=_|$)/g)[0].substring(1)
					pushWithKill(SC.actionOn(
						SCEVT(ls_nomEvt),
						SC.NO_ACTION,
						(pMachine)=>{
							this[ls_nomMeth]([], pMachine)
						},
						SC.forever
					))
				}else if(instr == '$_') {
					pushWithKill( this[ls_nomMeth]() )
				}
			}
		}
		
		this.p = SC.kill(SC.or(SCEVT('kill_' + this.constructor.name), this.evtKillInstance),
			SC.par(...lArray_prog)
		)
	}
	defineProperty(p_initVal, pArrayS_evt, pFunc) { // function pFunc(p_val, ...pArray_valEnvoyees)
		const symb = Symbol()
		this[symb] = p_initVal;
		if(typeof pFunc === 'string' || pFunc instanceof String) {
			pFunc = this[pFunc].bind(this)
		}
		const lCell = SC.cell({
			target: this,
			field: symb,
			sideEffect: (val, evts)=>{
				const lArray_evts = pArrayS_evt.map(ps_evt=>evts[SCEVT(ps_evt)])
				const l_ret = pFunc(val, ...lArray_evts)
				return l_ret
			},
			eventList: pArrayS_evt.map(SCEVT)
		})
		lCell.valeur = ()=>lCell.val()
		return lCell
	}
}

SC.idem = (val, pArray_valEnvoyees)=>val
SC.count = (val, pArray_valEnvoyees)=>(pArray_valEnvoyees || []).reduce((acc, curr)=>acc+1, 0)
SC.somme = (val, pArray_valEnvoyees)=>(pArray_valEnvoyees || []).reduce((acc, curr)=>acc+curr, 0)
SC.min = (val, pArray_valEnvoyees)=>(pArray_valEnvoyees || []).reduce((acc, curr)=>Math.min(acc,curr), Infinity)

SC.reactProperty = function(p_cell, pn_times) {
	if(undefined === pn_times) pn_times = 1
	return SC.repeat(pn_times, p_cell)
}
