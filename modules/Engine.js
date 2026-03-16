import {MOD_ID, DAMAGES, MOD_NAMESPACE, PF_OPTIPINS, PD0_OPTIPINS, COLORSETS} from "./Util.js";


function parse_formula(formula){
    //regex to find dice expressions
    const dieRegex = /\d+d\d+/g;

    //find all die in the roll
    let diceMatches = [];
    let temp_match = -1;
    while ((temp_match = dieRegex.exec(formula)) != null) {
        diceMatches.push(temp_match.index);
    }

    //find flavors for all die
    let flavorList = []
    temp_match = -1;
    diceMatches.forEach((diceHit) => {
        let last_position = formula.indexOf(',', diceHit);
        let relevant_portion = formula.substring(diceHit, (last_position != -1) ? last_position : formula.length)
        let flavors = []
        DAMAGES.forEach((damageType)  => {
            if(relevant_portion.includes(damageType)){
                flavors.push(damageType)
            }
        })
        if (flavors.length == 0) flavors.push("untyped");
        flavorList.push(flavors);
    })

    //find all die names (for custom player settings)

    const diceTerminators = [' ', '+', '(', ')', '[', ']', ',']
    let diceList = [];
    temp_match = -1;
    diceMatches.forEach((diceHit) => {
        let first_place = formula.indexOf('d', diceHit);
        let last_place = (() => {
            let candidates = []
            diceTerminators.forEach((element) =>{
            let candidate = formula.indexOf(element, diceHit);
            candidates.push(candidate > first_place ? candidate : formula.length)
            })
            return Math.min(...candidates);
        })()
        diceList.push(formula.substring(first_place, last_place))
    })

    return {flavors: flavorList, dice: diceList};
}

function parse_rolls(rolls){
    let result = {flavors: [], dice: []};
    rolls.forEach((roll) => {
        let partial_result = parse_formula(roll._formula)
        result.flavors = result.flavors.concat(partial_result.flavors);
        result.dice = result.dice.concat(partial_result.dice);
    })
    return result;
}

function get_base_appearance(user_presets, die){
    let base = user_presets[die] || user_presets.global;
    
    return {
        colorset: base.colorset || '',        
        foreground: base.labelColor || '',
        background: base.diceColor || '',
	    edge: base.edgeColor || '',
        font: base.font || '',
        outline: base.outlineColor || '',
        texture: base.texture || '',
	    material: base.material || '',
    }

}

function get_flavor_appearance(flavor){
    if(flavor in COLORSETS) 
        return {
        colorset: '',        
        foreground: COLORSETS[flavor].foreground || '',
        background: COLORSETS[flavor].background || '',
	    edge: COLORSETS[flavor].edge || '',
        font: COLORSETS[flavor].font || '',
        outline: COLORSETS[flavor].outline || '',
        texture: COLORSETS[flavor].texture?.name || '',
	    material: COLORSETS[flavor].material || '',
    }
    else
        return  {};
}

function is_precision(flavor){
    return (flavor.includes("precision"))
}

function get_elemental_flavor(flavor){
    let banned_phrases = ["precision", "damage", "healing"]
    let clean_flavor = flavor.filter((word) => !banned_phrases.includes(word))
    return clean_flavor.length == 1 ? clean_flavor[0] : "untyped";
}

function apply_complex_style(primary_style, secondary_style, element){
        if(element == PF_OPTIPINS[1] && "background" in secondary_style)
            primary_style[element] = secondary_style["background"];
        else if (element == PF_OPTIPINS[3] && "background" in secondary_style)
            primary_style[element] = secondary_style["background"][0];
        else if (element == PF_OPTIPINS[4] && element in secondary_style)
            primary_style[element] = secondary_style[element].name;
        else if (element in secondary_style)
        primary_style[element] = secondary_style[element];
}

function flavor_dice(die, flavor, dice_type, user){
    let traditional_flavor = user.getFlag(MOD_NAMESPACE, `fullFlavorEnable`);
    let isPrecision = is_precision(flavor) && user.getFlag(MOD_NAMESPACE, `precisionEnable`);
    let elemental_flavor = get_elemental_flavor(flavor);
    let should_color_this_flavor = user.getFlag(MOD_NAMESPACE, `${elemental_flavor}Enable`);
    
    if(die.options.flavor) delete die.options.flavor;
    
    if(isPrecision){
        traditional_flavor = traditional_flavor && !user.getFlag(MOD_NAMESPACE, `precisionAdvEnable`);

        if(!should_color_this_flavor)
            elemental_flavor = "untyped";
        else if(elemental_flavor == "untyped") 
            elemental_flavor = "precision";

        if(traditional_flavor){
            switch(user.getFlag(MOD_NAMESPACE, 'primaryPrecisionDice')){
            case PD0_OPTIPINS[0]:
                elemental_flavor = "precision";
                break;
            case PD0_OPTIPINS[1]:
                //do nothing
                break;
            case PD0_OPTIPINS[2]:
                elemental_flavor = "untyped";
                break;
            default:
                break;
        }
        }


    }else if(!should_color_this_flavor) {
        return;
    }

    if(traditional_flavor)
    {
        die.options.flavor = elemental_flavor;
        return;
    }

    let primary_style = get_base_appearance(user.getFlag("dice-so-nice", "appearance"), dice_type);

    let secondary_style = get_flavor_appearance(elemental_flavor);
    if(isPrecision){
        switch(user.getFlag(MOD_NAMESPACE, 'primaryPrecisionDice')){
            case PD0_OPTIPINS[0]:
                primary_style = get_flavor_appearance("precision")
                break;
            case PD0_OPTIPINS[1]:
                primary_style = get_flavor_appearance(elemental_flavor)
                break;
            case PD0_OPTIPINS[2]:
                //do nothing as base is already personal die
                break;
            default:
                break;
        }
        
        if(primary_style == null)
            primary_style = get_base_appearance(user.getFlag("dice-so-nice", "appearance"), dice_type);
    }

    //apply first portion of custom elements

    PF_OPTIPINS.forEach( (element)=>{
        if(user.getFlag(MOD_NAMESPACE, `${element}GeneralEnable`))
            apply_complex_style(primary_style, secondary_style, element);
    })

    if(isPrecision)
    {
        let ternary_style = get_base_appearance(user.getFlag("dice-so-nice", "appearance"), dice_type);
         switch(user.getFlag(MOD_NAMESPACE, 'secondaryPrecisionDice')){
            case PD0_OPTIPINS[0]:
                ternary_style = get_flavor_appearance("precision")
                break;
            case PD0_OPTIPINS[1]:
                ternary_style = get_flavor_appearance(elemental_flavor)
                break;
            case PD0_OPTIPINS[2]:
                //do nothing as base is already personal die
                break;
            default:
                break;
        }

        if(ternary_style == null)
            ternary_style = get_base_appearance(user.getFlag("dice-so-nice", "appearance"), dice_type);

        PF_OPTIPINS.forEach( (element)=>{
            if(user.getFlag(MOD_NAMESPACE, `${element}PrecisionEnable`))
                apply_complex_style(primary_style, ternary_style, element);
        })
    }

    die.options.appearance = primary_style;
}

Hooks.on("diceSoNiceRollStart", (messageID, context) => {
        let user = context.user;
    
    if(!user.getFlag(MOD_NAMESPACE, `mainToggle`))
        return;


    let roll_data = parse_rolls(game.messages.get(messageID).rolls)

    let dice = context.dsnRoll || context.roll; dice = dice.dice;
    


    if(dice.length != roll_data.flavors.length || dice.length != roll_data.dice.length)
    {
        console.log("ROLL MISMATCH, DOCUMENT THE ROLL MESSAGE AND REPORT THIS AS A BUG")
        return;
    }

    dice.forEach((die, index)=>{
        if(roll_data.flavors[index][0] != "untyped")
        flavor_dice(die, roll_data.flavors[index], roll_data.dice[index], user)
    })

})