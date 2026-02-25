Hooks.on('diceSoNiceReady', (dice3d) => {

  dice3d.addColorset({
    name: 'vitality',
      description: 'PF2E.TraitVitality',
      category: 'DICESONICE.DamageTypes',
      foreground: '#a85a00',
      background: ['#fcf1c2', '#edd987','#eddea4','#f7e9b0','#f7e28b'],
	  outline: '#a39600',
      texture: 'stone'
  });

  dice3d.addColorset({
    name: 'sonic',
      description: 'PF2E.TraitSonic',
      category: 'DICESONICE.DamageTypes',
      foreground: '#00f6ff',
      background: ['#2bb0b5','#0dbbde','#4ec2d9','#009996','#09b2b8'],
      outline: 'black',
      texture: 'stone'
  });

  dice3d.addColorset({
    name: 'electricity',
      description: 'PF2E.TraitElectricity',
      category: 'DICESONICE.DamageTypes',
      foreground: '#fff200',
      background: ['#f1d505', '#f2dc3a','#ffcb21','#fcd33a','#ffd829'],
      outline: 'black',
      texture: 'ice'
  });

  dice3d.addColorset({
    name: 'mental',
      description: 'PF2E.TraitMental',
      category: 'DICESONICE.DamageTypes',
      foreground: '#D6A8FF',
      background: ['#313866','#504099','#66409E','#934FC3','#C949FC','#313866'],
      outline: 'black',
      texture: 'speckles'
  });

  dice3d.addColorset({
    name: 'void',
      description: 'PF2E.TraitVoid',
      category: 'DICESONICE.DamageTypes',
      foreground: '#b023e8',
      background: ['#2d002e','#19031a','#260726','#23052b','#2e0f3b','#1b0221'],
      outline: 'black',
      texture: 'marble'
  });

  dice3d.addColorset({
    name: 'bleed',
      description: 'PF2E.TraitBleed',
      category: 'DICESONICE.DamageTypes',
      foreground: '#CDB800',
      background: '#6F0000',
      outline: 'black',
      texture: 'marble'
  });

  
  //override of existing / matching DSN! flavors
  
  dice3d.addColorset({
    name: 'poison',
    description: 'PF2E.TraitPoison',
    category: 'DICESONICE.DamageTypes',
    foreground: '#A9FF70',
    background: ['#a6ff00', '#83b625','#5ace04','#69f006','#b0f006','#93bc25'],	
    outline: 'black',
    texture: 'cloudy',
  });
  
    dice3d.addColorset({
    name: 'acid',
    description: 'PF2E.TraitAcid',
    category: 'DICESONICE.DamageTypes',
    foreground: '#84c758',
    background: ['#71ad02', '#60851c','#439c02','#367d01','#81b004','#708f1e'],
    outline: 'black',
    texture: 'marble',
    material: 'plastic'
  });
  
    dice3d.addColorset({
    name: 'cold',
    description: 'PF2E.TraitCold',
    category: 'DICESONICE.DamageTypes',
    foreground: '#60E9FF',
    background: ['#214fa3','#3c6ac1','#253f70','#0b56e2','#09317a'],
    outline: 'black',
    texture: 'ice',
  });
  
    dice3d.addColorset({
    name: 'fire',
    description: 'PF2E.TraitFire',
    category: 'DICESONICE.DamageTypes',
    foreground: '#f8d84f',
    background: ['#f8d84f','#f9b02d','#f43c04','#910200','#4c1009'],
    outline: 'black',
    texture: 'fire',
  });
  
    dice3d.addColorset({
    name: 'spirit',
    description: 'PF2E.TraitSpirit',
    category: 'DICESONICE.DamageTypes',
    foreground: '#ffadff',
    background: ['#313866','#504099','#66409e','#934fc3','#8c2bb3'],
    outline: '#bf82bf',
    texture: 'stars',
  });
  
  /*
      dice3d.addColorset({
    name: 'piercing',
    description: 'PF2E.TraitPiercing',
    category: 'DICESONICE.DamageTypes',
    foreground: '#FFFFFF',
    background: ['#bfbfbf','#c9c9c9','#b0b0b0','#cccccc'],
    texture: 'metal',
	material: 'metal'
  });
  
        dice3d.addColorset({
    name: 'slashing',
    description: 'PF2E.TraitPiercing',
    category: 'DICESONICE.DamageTypes',
    foreground: '#FFFFFF',
    background: ['#bfbfbf','#c9c9c9','#b0b0b0','#cccccc'],
    texture: 'bronze01',
	material: 'metal'
  });
  
          dice3d.addColorset({
    name: 'bludgeoning',
    description: 'PF2E.TraitBludgeoning',
    category: 'DICESONICE.DamageTypes',
    foreground: '#FFFFFF',
    background: ['#bfbfbf','#c9c9c9','#b0b0b0','#cccccc'],
    texture: 'speckles',
	material: 'metal'
  });

*/ 
});
