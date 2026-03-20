import {MOD_ID, DAMAGES, MOD_NAMESPACE, PF_OPTIPINS, PD0_OPTIPINS, COLORSETS} from "./Util.js";

function get_variant_ending_last_index(input, terminator_list, first_place = 0){
    let last_place = input.length;
    let candidates = []
    terminator_list.forEach((element) => {
        let candidate = input.indexOf(element, first_place);
        candidates.push(candidate > first_place ? candidate : input.length)
    })
    return Math.min(...candidates);
}

function get_flavors(formula, dice_pos){
    const flavorTerminators = [',']
    const nest_regex = /\([^\(\)]+\)/g
    const open_regex = /\(/
    const close_regex = /\)/

    let final_flavors = [];

    //from current dice position to the next comma as it always terminates an expression we think
    let relevant_formula = formula.substring(dice_pos, get_variant_ending_last_index(formula, [','], dice_pos));
    //replace all nexted expressions with dummies
    //recursively find nexted expressions until there are none left
    let nests = relevant_formula.match(nest_regex) || [];
    do{
        nests.forEach((element) =>{
            relevant_formula = relevant_formula.replace(element, "NEST")
        })
        nests = relevant_formula.match(nest_regex) || [];
    }while(nests.length > 0)
    //now only the closing brackets including the considered dice remain
    //now the flavor should apply ONLY if 
    //1 the flavor is right next to the die (the die itself is flavored)
    //2 the flavor is preceeded by a closing bracket (expression containing the die is flavored)

    //get all flavor candidates in relevant formula
    let flavor_candidates = []
    let flavor_index = relevant_formula.indexOf("[")
    while(flavor_index != -1)
    {
        let flavor_end_index = relevant_formula.indexOf("]", flavor_index)
        flavor_candidates.push({
            flavor:  relevant_formula.substring(flavor_index+1, flavor_end_index),
            position: flavor_index
        })
        flavor_index = relevant_formula.indexOf("[", flavor_end_index)
    }

    //if the flavor is proceeded by a ')' (it flavors a broader expression containing the dice) (2nd possibility)
    //or has no empty spaces between the dice expression and the flavor (1st possibility)
    //add it to final flavors
    flavor_candidates.forEach((element)=>{
        if(DAMAGES.includes(element.flavor)){
            if(relevant_formula[element.position-1] == ")")
                final_flavors.push(element.flavor)
            else if(get_variant_ending_last_index(relevant_formula, [' ']) > element.position)
                final_flavors.push(element.flavor)
        }
    })
    return final_flavors;
}

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
        let flavors = get_flavors(formula, diceHit);
        if (flavors.length == 0) flavors.push(["untyped"]);
        flavorList.push(flavors);
    })

    //find all die names (for custom player settings)

    const diceTerminators = [' ', '+', '(', ')', '[', ']', ',']
    let diceList = [];
    temp_match = -1;
    diceMatches.forEach((diceHit) => {
        let first_place = formula.indexOf('d', diceHit);
        let last_place = get_variant_ending_last_index(formula, diceTerminators, first_place)
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

    // if(is_precision(flavor))
    // {
    //     die.options.message = "precision"
    // }
    
    if(die.options.flavor) delete die.options.flavor;
    
    if(isPrecision){
        traditional_flavor = traditional_flavor && (user.getFlag(MOD_NAMESPACE, `precisionAdvEnable`) == false);

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

    if(isPrecision && user.getFlag(MOD_NAMESPACE, `precisionAdvEnable`))
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
    let roll_data = parse_rolls(game.messages.get(messageID).rolls)

    let dice = context.dsnRoll || context.roll; 
    


    if(!context.dsnRoll)
    {
        context.dsnRoll = Roll.fromJSON(JSON.stringify(context.roll.toJSON()));
        dice = context.dsnRoll
    }

    
    dice = dice.dice;
    
    if(!user.getFlag(MOD_NAMESPACE, `mainToggle`))
        return;

    if(dice.length != roll_data.flavors.length || dice.length != roll_data.dice.length)
    {
        console.log("ROLL MISMATCH, DOCUMENT THE ROLL MESSAGE AND REPORT THIS AS A BUG  `")
        return;
    }

    dice.forEach((die, index)=>{
        if(roll_data.flavors[index][0] != "untyped")
        flavor_dice(die, roll_data.flavors[index], roll_data.dice[index], user)
    })

    //console.log(context.roll)
    //console.log(context.dsnRoll)

})