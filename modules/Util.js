export const MOD_NAMESPACE = "pf2e-dice-flavor-fix"

export const MOD_ID = "DICEFIX"

export const DAMAGES = [
    "fire","cold","electricity","sonic","poison","acid",
    "void","vitality","mental","spirit","force","bleed",
    "slashing","piercing","bludgeoning","precision", "untyped"
]

export const MATERIALS = [
    "cold-iron","silver","sisterstone-dusk","sisterstone-scarlet",
    "adamantine","dawnsilver","duskwood","inubrix","siccatite",
    "noqual","sovereign-steel","djezet","abysium","peachwood",
    "warpglass","keep-stone","orichalcum"
]

export const PHISICAL_DAMAGES = [
  "slashing","piercing","bludgeoning"
]

export const DAMAGE_ICONS = {
"fire":"fa-solid fa-fire icon",
"cold":"fa-solid fa-snowflake icon",
"electricity":"fa-solid fa-bolt icon",
"sonic":"fa-solid fa-waveform-lines icon",
"poison":"fa-solid fa-spider icon",
"acid":"fa-solid fa-vial icon",
"void":"fa-solid fa-skull icon",
"vitality":"fa-solid fa-sun icon",
"mental":"fa-solid fa-brain icon",
"spirit":"fa-solid fa-ghost icon",
"force":"fa-solid fa-sparkles icon",
"bleed":"fa-solid fa-droplet icon",
"slashing":"fa-solid fa-axe icon",
"piercing":"fa-solid fa-bow-arrow icon",
"bludgeoning":"fa-solid fa-hammer icon",
"precision":"fa-solid fa-crosshairs icon",
"untyped": "fa-solid fa-heart-crack icon"
}

export const MATERIAL_ICONS = {
"cold-iron":"fa-solid fa-dove icon", 
"silver":"fa-solid fa-moon icon",
"sisterstone-dusk":"fa-solid fa-circle-dot icon",
"sisterstone-scarlet":"fa-regular fa-circle-dot icon",
"adamantine":"fa-solid fa-meteor icon",
"dawnsilver":"fa-solid fa-feather-pointed icon",
"duskwood":"fa-solid fa-leaf icon",
"inubrix":"fa-solid fa-border-none icon icon",
"siccatite":"fa-solid fa-fire-flame-curved icon",
"noqual":"fa-solid fa-gem icon",
"sovereign-steel":"fa-solid fa-hand-fist icon",
"djezet":"fa-solid fa-water icon",
"abysium":"fa-solid fa-radiation icon",
"peachwood":"fa-solid fa-seedling icon",
"warpglass":"fa-solid fa-burst icon",
"keep-stone":"fa-solid fa-mountain icon",
"orichalcum":"fa-solid fa-clock-rotate-left icon"
}

export const PF_OPTIONS = [
    "background",
    "edge",
    "foreground",
    "outline",
    "texture"
]

export const PD0_OPTIONS = [
    "precision",
    "material",
    "damagetype",
    "personal"
]

export const PD1_OPTIONS = [
    "material",
    "damagetype",
    "personal"
]

function init_flavors(dice3d){

dice3d.addColorset({
  name: 'vitality',
    description: 'PF2E.TraitVitality',
    category: 'DICEFIX.DamageTypes',
    foreground: '#a85a00',
    background: ['#fcf1c2', '#edd987','#eddea4','#f7e9b0','#f7e28b'],
    outline: 'black',
    texture: 'stone'
  });

dice3d.addColorset({
  name: 'sonic',
    description: 'PF2E.TraitSonic',
    category: 'DICEFIX.DamageTypes',
    foreground: '#58F6FF',
    background: ['#2bb0b5','#0dbbde','#4ec2d9','#009996','#09b2b8'],
    outline: 'black',
    texture: 'stone'
  });

dice3d.addColorset({
  name: 'electricity',
    description: 'PF2E.TraitElectricity',
    category: 'DICEFIX.DamageTypes',
    foreground: '#fff200',
    background: ['#f1d505', '#f2dc3a','#ffcb21','#fcd33a','#ffd829'],
    outline: 'black',
    texture: 'ice'
  });

dice3d.addColorset({
  name: 'mental',
    description: 'PF2E.TraitMental',
    category: 'DICEFIX.DamageTypes',
    foreground: '#D6A8FF',
    background: ['#313866','#504099','#66409E','#934FC3','#C949FC','#313866'],
    outline: 'black',
    texture: 'speckles'
  });

dice3d.addColorset({
  name: 'void',
    description: 'PF2E.TraitVoid',
    category: 'DICEFIX.DamageTypes',
    foreground: '#b023e8',
    background: ['#2d002e','#19031a','#260726','#23052b','#2e0f3b','#1b0221'],
    outline: 'black',
    texture: 'marble'
  });

dice3d.addColorset({
  name: 'bleed',
    description: 'PF2E.TraitBleed',
    category: 'DICEFIX.DamageTypes',
    foreground: '#cc3f3f',
    background: ['#5c0000', '#470101','#6D0101','#470101','#630c0c','#801111'],	
    outline: 'black',
    texture: 'marble'
  });

  
  //override of existing / matching DSN! flavors
  
dice3d.addColorset({
  name: 'poison',
    description: 'PF2E.TraitPoison',
    category: 'DICEFIX.DamageTypes',
    foreground: '#A9FF70',
    background: ['#a6ff00', '#83b625','#5ace04','#69f006','#b0f006','#93bc25'],	
    outline: 'black',
    texture: 'cloudy',
  });
  
dice3d.addColorset({
  name: 'acid',
    description: 'PF2E.TraitAcid',
    category: 'DICEFIX.DamageTypes',
    foreground: '#84c758',
    background: ['#71ad02', '#60851c','#439c02','#367d01','#81b004','#708f1e'],
    outline: 'black',
    texture: 'marble',
    material: 'plastic'
  });
  
dice3d.addColorset({
  name: 'cold',
    description: 'PF2E.TraitCold',
    category: 'DICEFIX.DamageTypes',
    foreground: '#60E9FF',
    background: ['#214fa3','#3c6ac1','#253f70','#0b56e2','#09317a'],
    outline: 'black',
    texture: 'ice',
  });
  
dice3d.addColorset({
  name: 'fire',
    description: 'PF2E.TraitFire',
    category: 'DICEFIX.DamageTypes',
    foreground: '#f8d84f',
    background: ['#f8d84f','#f9b02d','#f43c04','#910200','#4c1009'],
    outline: 'black',
    texture: 'fire',
  });
  
dice3d.addColorset({
  name: 'spirit',
    description: 'PF2E.TraitSpirit',
    category: 'DICEFIX.DamageTypes',
    foreground: '#ffadff',
    background: ['#313866','#504099','#66409e','#934fc3','#8c2bb3'],
    outline: 'black',
    texture: 'stars',
  });
  
dice3d.addColorset({
  name: 'force',
    description: 'PF2E.TraitForce',
    category: 'DICEFIX.DamageTypes',
    foreground: 'white',
    background: ['#FF97FF', '#FF68FF','#C651C6'],
    outline: 'black',
    texture: 'stars',
  });
  

dice3d.addColorset({
  name: 'piercing',
    description: 'PF2E.TraitPiercing',
    category: 'DICEFIX.DamageTypes',
    foreground: '#FFFFFF',
    background: ['#bfbfbf','#c9c9c9','#b0b0b0','#cccccc'],
    outline: 'black',
	  //edge: '#c9c9c9',
    texture: 'paper',
	  material: 'metal'
  });
  
dice3d.addColorset({
  name: 'slashing',
    description: 'PF2E.TraitSlashing',
    category: 'DICEFIX.DamageTypes',
    foreground: '#FFFFFF',
    background: ['#bfbfbf','#c9c9c9','#b0b0b0','#cccccc'],
    outline: 'black',
	  //edge: '#c9c9c9',
    texture: 'stone',
	  material: 'metal'
  });
  
dice3d.addColorset({
  name: 'bludgeoning',
    description: 'PF2E.TraitBludgeoning',
    category: 'DICEFIX.DamageTypes',
    foreground: '#FFFFFF',
    background: ['#bfbfbf','#c9c9c9','#b0b0b0','#cccccc'],
    outline: 'black',
	  //edge: '#c9c9c9',
    texture: 'speckles',
	  material: 'metal'
  });
  

dice3d.addColorset({
  name: 'precision',
    description: 'PF2E.TraitPrecision',
    category: 'DICEFIX.DamageTypes',
    foreground: '#FFFFFF',
    background: ['#bfbfbf','#c9c9c9','#b0b0b0','#cccccc'],
    outline: 'black',
	  //edge: '#c9c9c9',
    texture: 'bronze01',
	  material: 'metal'
  });


    //precious materials colorsets

dice3d.addColorset({
  name: 'cold-iron',
    description: 'PF2E.PreciousMaterialColdIron',
    category: 'DICEFIX.Materials',
    foreground: '#ababab',
    background: ['#4f4f4f','#4a4a4a','#707070'],
	  outline: 'black',
    texture: 'stone',
	  material: 'metal'
  });

dice3d.addColorset({
  name: 'silver',
    description: 'PF2E.PreciousMaterialSilver',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#c4c4c4','#f0f0f0','#d6d6d6'],
	  outline: 'black',
    texture: 'stone',
	  material: 'metal'
  });

  dice3d.addColorset({
  name: 'dawnsilver',
    description: 'PF2E.PreciousMaterialDawnsilver',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#d1faff','#d1faff','#d1faff'],
	  outline: 'black',
    texture: 'stone',
	  material: 'chrome'
  });

dice3d.addColorset({
  name: 'sisterstone-dusk',
    description: 'PF2E.PreciousMaterialSisterstoneDusk',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#ffab66','#ee9953','#d69057'],
	  outline: 'black',
    texture: 'bronze04',
	  material: 'metal'
  });

dice3d.addColorset({
  name: 'sisterstone-scarlet',
    description: 'PF2E.PreciousMaterialSisterstoneScarlet',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#cf4b2a','#b03e21','#ec4527'],
	  outline: 'black',
    texture: 'bronze04',
	  material: 'metal'
  });

dice3d.addColorset({
  name: 'adamantine',
    description: 'PF2E.PreciousMaterialAdamantine',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: 'black',
	  outline: 'black',
    texture: 'stone',
	  material: 'chrome'
  });

dice3d.addColorset({
  name: 'silver',
    description: 'PF2E.PreciousMaterialSilver',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#ffffff','#e0e0e0','#ebebeb'],
	  outline: 'black',
    texture: 'stone',
	  material: 'chrome'
  });

dice3d.addColorset({
  name: 'duskwood',
    description: 'PF2E.PreciousMaterialDuskwood',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#260b32','#310b41','#250e2f'],
	  outline: 'black',
    texture: 'wood',
	  material: 'wood'
  });

dice3d.addColorset({
  name: 'inubrix',
    description: 'PF2E.PreciousMaterialInubrix',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#a99489','#a99489','#a4968e'],
	  outline: 'black',
    texture: 'paper',
	  material: 'metal'
  });

dice3d.addColorset({
  name: 'siccatite',
    description: 'PF2E.PreciousMaterialSiccatite',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#43c2d8','#439cac','#148fa5'],
	  outline: 'black',
    texture: 'paper',
	  material: 'metal'
  });

dice3d.addColorset({
  name: 'noqual',
    description: 'PF2E.PreciousMaterialNoqual',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#3e4f36','#415936','#384332'],
	  outline: 'black',
    texture: 'stone',
	  material: 'glass'
  });

dice3d.addColorset({
  name: 'sovereign-steel',
    description: 'PF2E.PreciousMaterialSovereignSteel',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#cbd6c7','#bbc8b6','#c9dcc1'],
	  outline: 'black',
    texture: 'stone',
	  material: 'chrome'
  });

dice3d.addColorset({
  name: 'djezet',
    description: 'PF2E.PreciousMaterialDjezet',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#9d2b0b','#aa2704','#ac3a1b'],
	  outline: 'black',
    texture: 'stone',
	  material: 'chrome'
  });

dice3d.addColorset({
  name: 'abysium',
    description: 'PF2E.PreciousMaterialAbysium',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#27b7b9','#37bbbe','#1cc7ca'],
	  outline: 'black',
    texture: 'bronze03b',
	  material: 'iridescent'
  });

dice3d.addColorset({
  name: 'peachwood',
    description: 'PF2E.PreciousMaterialPeachwood',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#98311f','#a32e19','#821e0d'],
	  outline: 'black',
    texture: 'wood',
	  material: 'wood'
  });

dice3d.addColorset({
  name: 'warpglass',
    description: 'PF2E.PreciousMaterialWarpglass',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#b34432','#6cb332','#32b377','#3288b3','#5932b3','#b33291','#b33232'],
	  outline: 'black',
    texture: 'cloudy',
	  material: 'iridescent'
  });

dice3d.addColorset({
  name: 'keep-stone',
    description: 'PF2E.PreciousMaterialKeepStone',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#4b4949','#413e3e','#343232'],
	  outline: 'black',
    texture: 'marble',
	  material: 'metal'
  });

dice3d.addColorset({
  name: 'orichalcum',
    description: 'PF2E.PreciousMaterialOrichalcum',
    category: 'DICEFIX.Materials',
    foreground: '#ffffff',
    background: ['#d48516','#c87809','#d58920'],
	  outline: 'black',
    texture: ['bronze01','bronze02','bronze04'],
	  material: 'metal'
  });
}


export var COLORSETS;
//edit this value from a new module that registers new colorsets
Hooks.on('diceSoNiceReady', (dice3d) => {
init_flavors(dice3d);
COLORSETS = dice3d.exports.COLORSETS;

});

export function FLAGSETTINGS(){
  for(const [key, value] of game.settings.settings){
    if(value.namespace == MOD_NAMESPACE)
    {
       game.user.setFlag(MOD_NAMESPACE, value.key, game.settings.get(MOD_NAMESPACE, value.key));
    }
  };
}