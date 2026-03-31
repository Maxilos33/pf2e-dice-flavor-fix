
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

import {MOD_ID, MOD_NAMESPACE, 
        PF_OPTIONS, PD0_OPTIONS, FLAGSETTINGS, PD1_OPTIONS,
        DAMAGES, DAMAGE_ICONS, 
        MATERIALS, MATERIAL_ICONS} from "./Util.js";

class FlavorByDmgTypeSubmenu extends HandlebarsApplicationMixin(ApplicationV2) {


  static DEFAULT_OPTIONS = {
    tag: "form",
    classes: [MOD_NAMESPACE],
    form: {
      handler: FlavorByDmgTypeSubmenu.myFormHandler,
      submitOnChange: false,
      closeOnSubmit: true
    },
    window: {
            title: "DICEFIX.FlavorByDmgType",
            contentClasses: ["standard-form"]
    },
    id: "flavorByDmgConfig",
    position: {
      width: 600,
      height: "auto"
    }
  };

  static PARTS = {
    options: {
      template: "modules/pf2e-dice-flavor-fix/templates/FlavorByTypeSubmenu.hbs"
    },
    footer: {
      template: "templates/generic/form-footer.hbs"
    }
  }

   async _prepareContext() {
    const context = {};

    context.toggles = [] 
    DAMAGES.forEach(element => {
      context.toggles.push({  type: "checkbox", label: `DICEFIX.${element}DamageToggleLabel`, 
                              name: `${element}Enable`, 
                              icon: DAMAGE_ICONS[element],
                              checked: game.settings.get(MOD_NAMESPACE,`${element}Enable`)
                            })
    });

    context.buttons = [
    { type: "close", action: "close", icon: "fa-solid fa-ban", label: "DICEFIX.discardButton" },
    { type: "submit", icon: "fa-solid fa-save", label: "DICEFIX.saveButton" },
    ]

    return context;
  }


  static async myFormHandler(event, form, formData) {
    for (const key in formData.object)
    {
      game.settings.set(MOD_NAMESPACE, key, formData.object[key])
    }
  }
}

class FlavorByMatTypeSubmenu extends HandlebarsApplicationMixin(ApplicationV2) {


  static DEFAULT_OPTIONS = {
    tag: "form",
    classes: [MOD_NAMESPACE],
    form: {
      handler: FlavorByMatTypeSubmenu.myFormHandler,
      submitOnChange: false,
      closeOnSubmit: true
    },
    window: {
            title: "DICEFIX.FlavorByMatType",
            contentClasses: ["standard-form"]
    },
    id: "flavorByMatConfig",
    position: {
      width: 600,
      height: "auto"
    }
  };

  static PARTS = {
    options: {
      template: "modules/pf2e-dice-flavor-fix/templates/FlavorByTypeSubmenu.hbs"
    },
    footer: {
      template: "templates/generic/form-footer.hbs"
    }
  }

   async _prepareContext() {
    const context = {};

    context.toggles = [] 
    MATERIALS.forEach(element => {
      context.toggles.push({  type: "checkbox", label: `DICEFIX.${element}DamageToggleLabel`, 
                              name: `${element}Enable`, 
                              icon: MATERIAL_ICONS[element],
                              checked: game.settings.get(MOD_NAMESPACE,`${element}Enable`)
                            })
    });

    context.buttons = [
    { type: "close", action: "close", icon: "fa-solid fa-ban", label: "DICEFIX.discardButton" },
    { type: "submit", icon: "fa-solid fa-save", label: "DICEFIX.saveButton" },
    ]

    return context;
  }


  static async myFormHandler(event, form, formData) {
    for (const key in formData.object)
    {
      game.settings.set(MOD_NAMESPACE, key, formData.object[key])
    }
  }
}

class GeneralFlavorSubmenu extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    tag: "form",
    classes: [MOD_NAMESPACE],
    form: {
      handler: GeneralFlavorSubmenu.myFormHandler,
      submitOnChange: false,
      closeOnSubmit: true
    },
    window: {
            title: "DICEFIX.GeneralFlavor",
            contentClasses: ["standard-form"]
    },
    id: "generalFlavor",
    position: {
      width: 600,
      height: "auto"
    }
  };

  static PARTS = {
    options: {
      template: "modules/pf2e-dice-flavor-fix/templates/GeneralFlavorSubmenu.hbs"
    },
    footer: {
      template: "templates/generic/form-footer.hbs"
    }
  }

   async _prepareContext() {
    const context = {};

    context.maintoggle = {  type: "checkbox", label: `DICEFIX.FullFlavorLabel`, 
                              name: `fullFlavorEnable`, 
                              checked: game.settings.get(MOD_NAMESPACE,`fullFlavorEnable`)
                            };
    
    context.fullReplacement = {text: "DICEFIX.FullFlavorHint"}                        


    context.title = { text: "DICEFIX.PartialFlavorTitle"} ;
    context.customizable = { text: "DICEFIX.PartialFlavorHint"} ;


    context.pfoptions = []

    PF_OPTIONS.forEach(element => {
    context.pfoptions.push(
            {  type: "checkbox", label: `DICEFIX.${element}GeneralLabel`, 
                                name: `${element}GeneralEnable`, 
                                checked: game.settings.get(MOD_NAMESPACE,`${element}GeneralEnable`),
                                disabled: game.settings.get(MOD_NAMESPACE,`fullFlavorEnable`)
            }
        )
    })

    context.buttons = [
    { type: "close", action: "close", icon: "fa-solid fa-ban", label: "DICEFIX.discardButton" },
    { type: "submit", icon: "fa-solid fa-save", label: "DICEFIX.saveButton" },
    ]

    return context;
  }


  static async myFormHandler(event, form, formData) {
    for (const key in formData.object)
    {
      game.settings.set(MOD_NAMESPACE, key, formData.object[key])
    }
  }

   _postRender(context,options) {
    let affected =  this.window.content.querySelectorAll(".dynamic_disable_toggle")
    this.window.content.querySelector(".disable_controller").addEventListener('change', (event) => { 
        let is_checked = event.target.checked;
        affected.forEach((entry) =>{
            entry.disabled = is_checked;
        });
    });
    return super._postRender(context,options);
   }
}

class PrecisionFlavorSubmenu extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    tag: "form",
    classes: [MOD_NAMESPACE],
    form: {
      handler: PrecisionFlavorSubmenu.myFormHandler,
      submitOnChange: false,
      closeOnSubmit: true
    },
    window: {
            title: "DICEFIX.PrecisionFlavor",
            contentClasses: ["standard-form"]
    },
    id: "generalFlavor",
    position: {
      width: 600,
      height: "auto"
    }
  };

  static PARTS = {
    options: {
      template: "modules/pf2e-dice-flavor-fix/templates/AdvancedFlavorSubmenu.hbs"
    },
    footer: {
      template: "templates/generic/form-footer.hbs"
    }
  }
  


   async _prepareContext() {
    const context = {};

    //primary dice slect
    context.primarydice = { 
                    label: `DICEFIX.PrimaryPrecisionDice`, 
                     name: `primaryPrecisionDice`, 
                     options: [],          
                    };
    
    let currentprimdice = game.settings.get(MOD_NAMESPACE, "primaryPrecisionDice")

    PD0_OPTIONS.forEach(element => {
          context.primarydice.options.push(
            { opt: element, 
              lang: [MOD_ID,".dice",element].join(''), 
              enabled: (currentprimdice==element)})
    });

    context.fullReplacement = {text: "DICEFIX.PrecisionFlavorHint"}
    context.inherited = {}
    context.inherited.fullReplacement = {
      cond : game.settings.get(MOD_NAMESPACE, "fullFlavorEnable"),
      label : "DICEFIX.DiceFullyReplaced"
    }
    context.inherited.partialReplacement = {
      label : "DICEFIX.DicePartiallyReplaced",
      list : []
    }
    
    PF_OPTIONS.forEach(element => {
      if(game.settings.get(MOD_NAMESPACE,`${element}GeneralEnable`))
      {
          context.inherited.partialReplacement.list.push(`DICEFIX.${element}GeneralLabel`)
      }
    })

    context.inherited.fullReplacement2 = {
      cond : !game.settings.get(MOD_NAMESPACE, "materialAdvEnable"),
      label : "DICEFIX.MaterialDiceFullyReplaced",
      label2 : `${MOD_ID}.dice${game.settings.get(MOD_NAMESPACE, "primaryMaterialDice")}`,
    }
    context.inherited.partialReplacement2 = {
      label : "DICEFIX.MaterialDicePartiallyReplaced",
      list : []
    }

    context.inherited.partialReplacement2.list.push(`${MOD_ID}.dice${game.settings.get(MOD_NAMESPACE, "primaryMaterialDice")}`)
    context.inherited.partialReplacement2.list.push(`${MOD_ID}.dice${game.settings.get(MOD_NAMESPACE, "secondaryMaterialDice")}`)

    PF_OPTIONS.forEach(element => {
      if(game.settings.get(MOD_NAMESPACE,`${element}MaterialEnable`))
      {
          context.inherited.partialReplacement2.list.push(`DICEFIX.${element}GeneralLabel`)
      }
    })

    if(context.inherited.partialReplacement.list.length == 0)
    {
        context.inherited.partialReplacement.list.push(`DICEFIX.NoneLabel`)
    }


    //adv checkbox
    context.advReplacement = {  type: "checkbox", label: `DICEFIX.advReplacementLabel`, 
                                name: `precisionAdvEnable`, 
                                checked: game.settings.get(MOD_NAMESPACE,`precisionAdvEnable`)
            }

    //secondary dice
     context.secondarydice = { 
                    label: `DICEFIX.SecondaryPrecisionDice`, 
                     name: `secondaryPrecisionDice`, 
                     options: [],
                     disabled: !game.settings.get(MOD_NAMESPACE, "precisionAdvEnable")          
                    }; 
                    
        let currentsecdice = game.settings.get(MOD_NAMESPACE, "secondaryPrecisionDice")

      PD0_OPTIONS.forEach(element => {
          context.secondarydice.options.push(
            { opt: element, 
              lang: [MOD_ID,".dice",element].join(''), 
              enabled: (currentsecdice==element)})
      });

    context.partialReplacement = {text: "DICEFIX.PrecisionFlavorHintSecondaryDice"}       
    

    context.title = { text: "DICEFIX.PartialFlavorTitle"} ;
    context.customizable = { text: "DICEFIX.PartialPrecisionFlavorHint"} ;


    context.pfoptions = []

    PF_OPTIONS.forEach(element => {
    context.pfoptions.push(
            {  type: "checkbox", label: `DICEFIX.${element}GeneralLabel`, 
                                name: `${element}PrecisionEnable`, 
                                checked: game.settings.get(MOD_NAMESPACE,`${element}PrecisionEnable`),
                                disabled: !game.settings.get(MOD_NAMESPACE, "precisionAdvEnable")
            }
        )
    })

    context.buttons = [
    { type: "close", action: "close", icon: "fa-solid fa-ban", label: "DICEFIX.discardButton" },
    { type: "submit", icon: "fa-solid fa-save", label: "DICEFIX.saveButton" },
    ]

    return context;
  }


  static async myFormHandler(event, form, formData) {
    for (const key in formData.object)
    {
      game.settings.set(MOD_NAMESPACE, key, formData.object[key])
    }
  }

   _postRender(context,options) {
    let affected =  this.window.content.querySelectorAll(".dynamic_disable_toggle")
    this.window.content.querySelector(".disable_controller").addEventListener('change', (event) => { 
        let is_checked = event.target.checked;
        affected.forEach((entry) =>{
            entry.disabled = !is_checked;
        });
    });
    return super._postRender(context,options);
   }
   
}

class MaterialFlavorSubmenu extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    tag: "form",
    classes: [MOD_NAMESPACE],
    form: {
      handler: MaterialFlavorSubmenu.myFormHandler,
      submitOnChange: false,
      closeOnSubmit: true
    },
    window: {
            title: "DICEFIX.MaterialFlavor",
            contentClasses: ["standard-form"]
    },
    id: "generalFlavor",
    position: {
      width: 600,
      height: "auto"
    }
  };

  static PARTS = {
    options: {
      template: "modules/pf2e-dice-flavor-fix/templates/AdvancedFlavorSubmenu.hbs"
    },
    footer: {
      template: "templates/generic/form-footer.hbs"
    }
  }
  


   async _prepareContext() {
    const context = {};             

    //primary dice slect
    context.primarydice = { 
                     label: `DICEFIX.PrimaryMaterialDice`, 
                     name: `primaryMaterialDice`, 
                     options: [],          
                    };
    
    let currentprimdice = game.settings.get(MOD_NAMESPACE, "primaryMaterialDice")

    PD1_OPTIONS.forEach(element => {
          context.primarydice.options.push(
            { opt: element, 
              lang: [MOD_ID,".dice",element].join(''), 
              enabled: (currentprimdice==element)})
    });

    context.fullReplacement = {text: "DICEFIX.MaterialFlavorHint"}
    context.inherited = {}
    context.inherited.fullReplacement = {
      cond : game.settings.get(MOD_NAMESPACE, "fullFlavorEnable"),
      label : "DICEFIX.DiceFullyReplaced"
    }
    context.inherited.partialReplacement = {
      label : "DICEFIX.DicePartiallyReplaced",
      list : []
    }
    
    PF_OPTIONS.forEach(element => {
      if(game.settings.get(MOD_NAMESPACE,`${element}GeneralEnable`))
      {
          context.inherited.partialReplacement.list.push(`DICEFIX.${element}GeneralLabel`)
      }
    })

    if(context.inherited.partialReplacement.list.length == 0)
    {
        context.inherited.partialReplacement.list.push(`DICEFIX.NoneLabel`)
    }


    //adv checkbox
    context.advReplacement = {  type: "checkbox", label: `DICEFIX.advReplacementLabelMaterial`, 
                                name: `materialAdvEnable`, 
                                checked: game.settings.get(MOD_NAMESPACE,`materialAdvEnable`)
            }

    //secondary dice
     context.secondarydice = { 
                    label: `DICEFIX.SecondaryMaterialDice`, 
                     name: `secondaryMaterialDice`, 
                     options: [],
                     disabled: !game.settings.get(MOD_NAMESPACE, "materialAdvEnable")          
                    }; 
                    
        let currentsecdice = game.settings.get(MOD_NAMESPACE, "secondaryMaterialDice")

      PD1_OPTIONS.forEach(element => {
          context.secondarydice.options.push(
            { opt: element, 
              lang: [MOD_ID,".dice",element].join(''), 
              enabled: (currentsecdice==element)})
      });

    context.partialReplacement = {text: "DICEFIX.materialFlavorHintSecondaryDice"}       
    

    context.title = { text: "DICEFIX.PartialFlavorTitle"} ;
    context.customizable = { text: "DICEFIX.PartialmaterialFlavorHint"} ;


    context.pfoptions = []

    PF_OPTIONS.forEach(element => {
    context.pfoptions.push(
            {  type: "checkbox", label: `DICEFIX.${element}GeneralLabel`, 
                                name: `${element}MaterialEnable`, 
                                checked: game.settings.get(MOD_NAMESPACE,`${element}MaterialEnable`),
                                disabled: !game.settings.get(MOD_NAMESPACE, "materialAdvEnable")
            }
        )
    })

    context.buttons = [
    { type: "close", action: "close", icon: "fa-solid fa-ban", label: "DICEFIX.discardButton" },
    { type: "submit", icon: "fa-solid fa-save", label: "DICEFIX.saveButton" },
    ]

    return context;
  }


  static async myFormHandler(event, form, formData) {
    for (const key in formData.object)
    {
      game.settings.set(MOD_NAMESPACE, key, formData.object[key])
    }
  }

   _postRender(context,options) {
    let affected =  this.window.content.querySelectorAll(".dynamic_disable_toggle")
    this.window.content.querySelector(".disable_controller").addEventListener('change', (event) => { 
        let is_checked = event.target.checked;
        affected.forEach((entry) =>{
            entry.disabled = !is_checked;
        });
    });
    return super._postRender(context,options);
   }
   
}

Hooks.once('init', () => {
   //register settings for damageneral flavorgetype submenu
   game.settings.register(MOD_NAMESPACE, `fullFlavorEnable`, {
    type: Boolean,
    scope: "client",
    config: false,
    default: true,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, "fullFlavorEnable", value);
    }
   });

   PF_OPTIONS.forEach(element => {
   game.settings.register(MOD_NAMESPACE, `${element}GeneralEnable`, {
    type: Boolean,
    scope: "client",
    config:false,
    default: false,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `${element}GeneralEnable`, value);
    }
   })
  });

   //register general flavor menu  
   game.settings.registerMenu(MOD_NAMESPACE, "GeneralFlavor",{
    name: "DICEFIX.GeneralFlavor",
    label: "DICEFIX.GeneralFlavorLabel",
    hint: "DICEFIX.GeneralFlavorHint",
    icon: "fa-solid fa-dice",
    type: GeneralFlavorSubmenu,
    restricted: false
  })
  
  //register settings for damagetype submenu
  DAMAGES.forEach(element => {
   game.settings.register(MOD_NAMESPACE, `${element}Enable`, {
    type: Boolean,
    scope: "client",
    config:false,
    default: true,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `${element}Enable`, value);
    }
   })
  })

  //register damagetype submenu
    game.settings.registerMenu(MOD_NAMESPACE, "FlavorByDmgType",{
    name: "DICEFIX.FlavorByDmgType",
    label: "DICEFIX.FlavorByDmgTypeLabel",
    hint: "DICEFIX.FlavorByDmgTypeHint",
    icon: "fa-solid fa-fire",
    type: FlavorByDmgTypeSubmenu,
    restricted: false
  })

    //register options for materials

    game.settings.register(MOD_NAMESPACE, `materialOverridePhysical`, {
    name: "DICEFIX.materialOverridePhysicalLabel",
    hint: "DICEFIX.materialOverridePhysicalHint",
    type: Boolean,
    scope: "client",
    default: true,
    config: true,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, "materialOverridePhysical", value);
    }
   });

    game.settings.register(MOD_NAMESPACE, `materialOverrideElemental`, {
    name: "DICEFIX.materialOverrideElementalLabel",
    hint: "DICEFIX.materialOverrideElementalHint",
    type: Boolean,
    scope: "client",
    default: false,
    config: true,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, "materialOverrideElemental", value);
    }
   });

  game.settings.register(MOD_NAMESPACE, 'primaryMaterialDice', {
  config: false,
  scope: "client",
  type: String,
  default: PD1_OPTIONS[0],
  onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `primaryMaterialDice`, value);
    }
  });

    game.settings.register(MOD_NAMESPACE, 'secondaryMaterialDice', {
  config: false,
  scope: "client",
  type: String,
  default: PD1_OPTIONS[0],
  onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `secondaryMaterialDice`, value);
    }
  });

  PF_OPTIONS.forEach(element => {
   game.settings.register(MOD_NAMESPACE, `${element}MaterialEnable`, {
    type: Boolean,
    scope: "client",
    config:false,
    default: false,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `${element}MaterialEnable`, value);
    }
   })
  });

  //if advanced flavor options should be enabled
   game.settings.register(MOD_NAMESPACE, `materialAdvEnable`, {
    type: Boolean,
    scope: "client",
    config: false,
    default: false,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `materialAdvEnable`, value);
    }
   });

     //register material flavor menu  
   game.settings.registerMenu(MOD_NAMESPACE, "MaterialFlavor",{
    name: "DICEFIX.MaterialFlavor",
    label: "DICEFIX.MaterialFlavorLabel",
    hint: "DICEFIX.MaterialFlavorHint",
    icon: "fa-solid fa-tarp-droplet",
    type: MaterialFlavorSubmenu,
    restricted: false
  })


  // materials toggles menu
  MATERIALS.forEach(element => {
   game.settings.register(MOD_NAMESPACE, `${element}Enable`, {
    type: Boolean,
    scope: "client",
    config:false,
    default: true,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `${element}Enable`, value);
    }
   })
  })

  //register materialtype submenu
  game.settings.registerMenu(MOD_NAMESPACE, "FlavorByMatType",{
    name: "DICEFIX.FlavorByMatType",
    label: "DICEFIX.FlavorByMatTypeLabel",
    hint: "DICEFIX.FlavorByMatTypeHint",
    icon: "fa-solid fa-sheet-plastic",
    type: FlavorByMatTypeSubmenu,
    restricted: false
  })


  //register options for precision damage
    game.settings.register(MOD_NAMESPACE, `precisionOverrideMaterial`, {
    name: "DICEFIX.precisionOverrideMaterialLabel",
    hint: "DICEFIX.precisionOverrideMaterialHint",
    type: Boolean,
    scope: "client",
    default: true,
    config: true,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, "precisionOverrideMaterial", value);
    }
   });

  game.settings.register(MOD_NAMESPACE, 'primaryPrecisionDice', {
  config: false,
  scope: "client",
  type: String,
  default: PD0_OPTIONS[0],
  onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `primaryPrecisionDice`, value);
    }
  });

  game.settings.register(MOD_NAMESPACE, 'secondaryPrecisionDice', {
  config: false,
  scope: "client",
  type: String,
  default: PD0_OPTIONS[0],
  onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `secondaryPrecisionDice`, value);
    }
  });

  PF_OPTIONS.forEach(element => {
   game.settings.register(MOD_NAMESPACE, `${element}PrecisionEnable`, {
    type: Boolean,
    scope: "client",
    config:false,
    default: false,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `${element}PrecisionEnable`, value);
    }
   })
  });

  //if advanced flavor options should be enabled
   game.settings.register(MOD_NAMESPACE, `precisionAdvEnable`, {
    type: Boolean,
    scope: "client",
    config: false,
    default: false,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `precisionAdvEnable`, value);
    }
   });
  

   //register precision flavor menu  
   game.settings.registerMenu(MOD_NAMESPACE, "PrecisionFlavor",{
    name: "DICEFIX.PrecisionFlavor",
    label: "DICEFIX.PrecisionFlavorLabel",
    hint: "DICEFIX.PrecisionFlavorHint",
    icon: "fa-solid fa-crosshairs",
    type: PrecisionFlavorSubmenu,
    restricted: false
  })

  //General toggle
   game.settings.register(MOD_NAMESPACE, `mainToggle`, {
    name: "DICEFIX.MainToggle",
    hint: "DICEFIX.MainToggleHint",
    type: Boolean,
    scope: "client",
    config: true,
    default: true,
    onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, "mainToggle", value);
    }
   });
})

Hooks.once('ready', () => {
  FLAGSETTINGS()
})


//preetify the settings menu, kind of whacky, should work most of the time
Hooks.on('renderApplicationV2', (application, html, data) => {
  //if the rendered application is not settings config, return
  if(data.rootId != "settings-config")
  return;

  //get our settings section
  let dicefixtab = html.querySelector('section[data-tab="pf2e-dice-flavor-fix"]');

  //create and insert headers at indexes
  {
    let header = document.createElement('h4')
    header.classList.toggle("divider")
    header.innerHTML = game.i18n.localize(`${MOD_ID}.BasicMenuTitle`);
    dicefixtab.insertBefore(header, dicefixtab.children[0]);
  }
  {
    let header = document.createElement('h4')
    header.classList.toggle("divider")
    header.innerHTML = game.i18n.localize(`${MOD_ID}.MaterialMenuTitle`);
    dicefixtab.insertBefore(header, dicefixtab.children[3]);
  }
  {
    let header = document.createElement('h4')
    header.classList.toggle("divider")
    header.innerHTML = game.i18n.localize(`${MOD_ID}.PrecisionMenuTitle`);
    dicefixtab.insertBefore(header, dicefixtab.children[6]);
  }
  {
    let header = document.createElement('h4')
    header.classList.toggle("divider")
    header.innerHTML = game.i18n.localize(`${MOD_ID}.MiscMenuTitle`);
    dicefixtab.insertBefore(header, dicefixtab.children[8]);
  }

  //move options to appropiate sections

  {
    let element = dicefixtab.querySelector('div>label[for="settings-config-pf2e-dice-flavor-fix.materialOverridePhysical"]').parentElement
    element = dicefixtab.removeChild(element)
    dicefixtab.insertBefore(element, dicefixtab.children[4]);
  }
  {
    let element = dicefixtab.querySelector('div>label[for="settings-config-pf2e-dice-flavor-fix.materialOverrideElemental"]').parentElement
    element = dicefixtab.removeChild(element)
    dicefixtab.insertBefore(element, dicefixtab.children[5]);
  }
  {
    let element = dicefixtab.querySelector('div>label[for="settings-config-pf2e-dice-flavor-fix.precisionOverrideMaterial"]').parentElement
    element = dicefixtab.removeChild(element)
    dicefixtab.insertBefore(element, dicefixtab.children[9]);
  }
})