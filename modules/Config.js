
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

import {MOD_ID, DAMAGES, DAMAGE_ICONS, MOD_NAMESPACE, PF_OPTIPINS, PD0_OPTIPINS, FLAGSETTINGS} from "./Util.js";

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
      template: "modules/pf2e-dice-flavor-fix/templates/FlavorByDmgSubmenu.hbs"
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

    PF_OPTIPINS.forEach(element => {
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
      template: "modules/pf2e-dice-flavor-fix/templates/PrecisionFlavorSubmenu.hbs"
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

    PD0_OPTIPINS.forEach(element => {
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
    
    PF_OPTIPINS.forEach(element => {
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

      PD0_OPTIPINS.forEach(element => {
          context.secondarydice.options.push(
            { opt: element, 
              lang: [MOD_ID,".dice",element].join(''), 
              enabled: (currentsecdice==element)})
      });

    context.partialReplacement = {text: "DICEFIX.PrecisionFlavorHintSecondaryDice"}       
    

    context.title = { text: "DICEFIX.PartialFlavorTitle"} ;
    context.customizable = { text: "DICEFIX.PartialPrecisionFlavorHint"} ;


    context.pfoptions = []

    PF_OPTIPINS.forEach(element => {
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

Hooks.once('init', () => {
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

   PF_OPTIPINS.forEach(element => {
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

  //register options for precision damage

  game.settings.register(MOD_NAMESPACE, 'primaryPrecisionDice', {
  config: false,
  scope: "client",
  type: String,
  default: PD0_OPTIPINS[0],
  onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `primaryPrecisionDice`, value);
    }
  });

    game.settings.register(MOD_NAMESPACE, 'secondaryPrecisionDice', {
  config: false,
  scope: "client",
  type: String,
  default: PD0_OPTIPINS[0],
  onChange: value => {
      game.user.setFlag(MOD_NAMESPACE, `secondaryPrecisionDice`, value);
    }
  });

  PF_OPTIPINS.forEach(element => {
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


})

Hooks.once('ready', () => {
  FLAGSETTINGS()
})