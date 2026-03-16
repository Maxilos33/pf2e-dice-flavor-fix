export const MOD_NAMESPACE = "pf2e-dice-flavor-fix"

export const MOD_ID = "DICEFIX"

export const DAMAGES = [
    "fire","cold","electricity","sonic","poison","acid",
    "void","vitality","mental","spirit","force","bleed",
    "slashing","piercing","bludgeoning","precision", "untyped"
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

export const PF_OPTIPINS = [
    "background",
    "edge",
    "foreground",
    "outline",
    "texture"
]

export const PD0_OPTIPINS = [
    "precision",
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
	  edge: '#c9c9c9',
    texture: 'paper',
	  material: 'metal'
  });
  
dice3d.addColorset({
  name: 'slashing',
    description: 'PF2E.TraitSlashing',
    category: 'DICEFIX.DamageTypes',
    foreground: '#FFFFFF',
    background: ['#bfbfbf','#c9c9c9','#b0b0b0','#cccccc'],
	  edge: '#c9c9c9',
    texture: 'stone',
	  material: 'metal'
  });
  
dice3d.addColorset({
  name: 'bludgeoning',
    description: 'PF2E.TraitBludgeoning',
    category: 'DICEFIX.DamageTypes',
    foreground: '#FFFFFF',
    background: ['#bfbfbf','#c9c9c9','#b0b0b0','#cccccc'],
	  edge: '#c9c9c9',
    texture: 'speckles',
	  material: 'metal'
  });
  

dice3d.addColorset({
  name: 'precision',
    description: 'PF2E.TraitPrecision',
    category: 'DICEFIX.DamageTypes',
    foreground: '#FFFFFF',
    background: ['#bfbfbf','#c9c9c9','#b0b0b0','#cccccc'],
	  edge: '#c9c9c9',
    texture: 'bronze01',
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