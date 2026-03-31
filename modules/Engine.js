import {MOD_ID, MOD_NAMESPACE,
        DAMAGES, PHISICAL_DAMAGES, MATERIALS,
        PF_OPTIONS, PD0_OPTIONS, PD1_OPTIONS,
        COLORSETS} from "./Util.js";
import {FStringToObject} from "./Parser.js";

function parse_rolls(rolls){
    let result = [];
    rolls.forEach((roll) => {
        result = result.concat(FStringToObject(roll._formula))
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

function is_physical(flavor){
    return (PHISICAL_DAMAGES.includes(flavor))
}

//elemental should always be singular per die, so we just return the string
function get_elemental_flavor(flavor){
    let clean_flavor = flavor.filter((word) => DAMAGES.includes(word))
    return clean_flavor.length == 1 ? clean_flavor[0] : "untyped";
}

//I don't know why, I don't want to know why, I shouldn't
//have to wonder why, but for whatever reason this stupid
//inventor feat lets them have two materials (up to ten hypothetically) on a weapon
//so we return an array
function get_materials(flavor){
    let clean_flavor = flavor.filter((word) => MATERIALS.includes(word))

    return clean_flavor.length >= 1 ? clean_flavor : [];
}

function randomly_get_applicable_material(materials){
    if (materials.length == 0)
        return null;
    else if(materials.length == 1)
        return materials[0];
    else
        return  materials[Math.floor(Math.random() * materials.length)];
}

function apply_complex_style(primary_style, secondary_style, element){
        if(element == PF_OPTIONS[1] && "background" in secondary_style)
            primary_style[element] = secondary_style["background"];
        else if (element == PF_OPTIONS[3] && "background" in secondary_style)
            primary_style[element] = secondary_style["background"][0];
        else if (element == PF_OPTIONS[4] && element in secondary_style)
            primary_style[element] = secondary_style[element].name;
        else if (element in secondary_style)
            primary_style[element] = secondary_style[element];
}

function flavor_dice(die, roll_data, user){

    //remove the original flavor
    delete die.options.flavor;

    //extract data from roll_data
    let die_type = roll_data.term;
    let tags = roll_data.flavor;
    //if theres no flavor simply skip the die
    if(tags.length == 0)
        return;
    

    //infer useful information about the die
    let damage_flavor = get_elemental_flavor(tags);
    let material = get_materials(tags);
    //cull the material list from disabled materials, so they dont get taken into account when picking a random one
    material = material.filter((word)=>user.getFlag(MOD_NAMESPACE, `${word}Enable`))
    //simplify material to a random value from the array (we cant think of a better way to do this that doesnt involve the user having a degree)
    material = randomly_get_applicable_material(material);

    //check addtional information about the die
    let is_precision_die = is_precision(tags)
    let is_physical_die = is_physical(damage_flavor)

    //determine if extracted tags should be considered
    //if flavor is enabled
    let should_damage = user.getFlag(MOD_NAMESPACE, `${damage_flavor}Enable`)

    //if material is present and enabled
    let should_material = (material != null ? user.getFlag(MOD_NAMESPACE, `${material}Enable`) : false) && 
    // or if is physical and should be overriden
    (   (is_physical_die && user.getFlag(MOD_NAMESPACE, `materialOverridePhysical`))||
    // or if is elemental and should be overriden
        (!is_physical_die && user.getFlag(MOD_NAMESPACE, `materialOverrideElemental`)));

    //if precision is present and enabled
    let should_precision = user.getFlag(MOD_NAMESPACE, `precisionEnable`) && is_precision_die &&
    // and if material is not present or should be overriden
    (material == null || user.getFlag(MOD_NAMESPACE, `precisionOverrideMaterial`))

    //check if applying the style normally is enough
    //if full flavoring is enabled
    let traditional_flavor = (user.getFlag(MOD_NAMESPACE, `fullFlavorEnable`) || !should_damage) && 
    // if should not consider precision or precision setting is not advanced  
    ( !should_precision || !user.getFlag(MOD_NAMESPACE, `precisionAdvEnable`))&& 
    // if should not consider material or materials setting is not advanced
    ( !should_material || !user.getFlag(MOD_NAMESPACE, `materialAdvEnable`));

    //determine primary cascading colorset
    let primary_colorset = false;
    if(should_precision) //if is precision take precison
        primary_colorset = user.getFlag(MOD_NAMESPACE, 'primaryPrecisionDice');
    else if((primary_colorset == PD0_OPTIONS[1] && should_material)) // if was not precision and precision pointed to material take material
         primary_colorset = user.getFlag(MOD_NAMESPACE, 'primaryMaterialDice');

    if(primary_colorset == false && should_material){
        primary_colorset = user.getFlag(MOD_NAMESPACE, 'primaryMaterialDice');
    }

    //finally if it wasnt precision or material ir if the material points to damage, make the final distinction, damage or personal
    if(primary_colorset == false || (primary_colorset == PD0_OPTIONS[2] && should_damage))
    {
        if(user.getFlag(MOD_NAMESPACE, 'fullFlavorEnable'))
            primary_colorset = PD0_OPTIONS[2];
        else
            primary_colorset = PD0_OPTIONS[3];
    }

    //if no advanced options are applied simply apply it as flavor
    if(traditional_flavor){
        let primary = "";
        switch(primary_colorset){
            case PD0_OPTIONS[0]:
                primary = "precision"
                break;
            case PD0_OPTIONS[1]:
                primary = material
                break;
            case PD0_OPTIONS[2]:
                primary = damage_flavor
                break;
            case PD0_OPTIONS[3]:
            default:
                return;
                break;
        }
        die.options.flavor = primary;
        return;
    }

    //advanced die painting starts here
    //there has to be a smarter way to do this

    //fetch primary layer (base of the die) based off the previous calculations
    let primary_layer = false;
    switch(primary_colorset){
        case PD0_OPTIONS[0]:
            primary_layer = get_flavor_appearance('precision'); 
            break;
        case PD0_OPTIONS[1]:
            primary_layer = get_flavor_appearance(material); 
            break;
        case PD0_OPTIONS[2]:
            primary_layer = get_flavor_appearance(damage_flavor);  
            break;
        case PD0_OPTIONS[3]:
        default:
            primary_layer = get_base_appearance(user.getFlag("dice-so-nice", "appearance"), die_type);
            break;
    }

    //now check if a secondary layer will be applied and fetch it if applicable
    //secondary layer is always either absent or elemental
    let secondary_layer = false;
    let secondary_flags = [];
    //if damage is applicable and the advanced damage settings are engaged
    if((should_damage && !user.getFlag(MOD_NAMESPACE, `fullFlavorEnable`))){
        //if were doing a material precision roll
        if((should_material && should_precision))
            //set layer to true if it is picked in the advanced otions
            secondary_layer =  (user.getFlag(MOD_NAMESPACE, 'primaryPrecisionDice') == PD0_OPTIONS[2] ||
                                (user.getFlag(MOD_NAMESPACE, 'primaryPrecisionDice') == PD0_OPTIONS[1]  && user.getFlag(MOD_NAMESPACE, 'primaryMaterialDice') == PD1_OPTIONS[1]))
        //else if its just material
        else if(should_material)
            //set layer to true if material points to damage
            secondary_layer =  user.getFlag(MOD_NAMESPACE, 'primaryMaterialDice') == PD1_OPTIONS[1]
        //else if its just precison
        else if(should_precision)
            //set layer to true if precision points to damage
            secondary_layer =  user.getFlag(MOD_NAMESPACE, 'primaryPrecisionDice') == PD0_OPTIONS[2]
        //finally if its neither
        else
             secondary_layer = true
    }

    //now if secondary layer is true actually fetch it and get the flags
    if(secondary_layer != false){
        secondary_layer = get_flavor_appearance(damage_flavor);
         PF_OPTIONS.forEach( (element)=>{
            secondary_flags.push(user.getFlag(MOD_NAMESPACE, `${element}GeneralEnable`));   
        })
    }


    //check if ternary layer (material accents) should be applied
    let ternary_layer = false;
    let ternary_flags = [];
    //if we should do material and advanced material settings are enabled
    if(should_material && user.getFlag(MOD_NAMESPACE,'materialAdvEnable'))
    {
        //if were rolling precision we have to check if material die is used as base
        if(should_precision)
            ternary_layer = user.getFlag(MOD_NAMESPACE, 'primaryPrecisionDice') == PD0_OPTIONS[1]
        else
            ternary_layer = true;
    }

    //now if ternary layer should be applied fetch it and get the flags
    if(ternary_layer != false){
        switch(user.getFlag(MOD_NAMESPACE, 'secondaryMaterialDice')){
        case PD1_OPTIONS[0]:
            ternary_layer = get_flavor_appearance(material); 
            break;
        case PD1_OPTIONS[1]:
            ternary_layer = get_flavor_appearance(damage_flavor);  
            break;
        case PD1_OPTIONS[2]:
        default:
            ternary_layer = get_base_appearance(user.getFlag("dice-so-nice", "appearance"), die_type);
            break
        }
        
        PF_OPTIONS.forEach( (element)=>{
            ternary_flags.push(user.getFlag(MOD_NAMESPACE, `${element}MaterialEnable`));   
        })
    }

    //check if quaternary layer (precision) should be applied

    let quaternary_layer = false;
    let quaternary_flags = [];

    if(should_precision)
        quaternary_layer = user.getFlag(MOD_NAMESPACE, `precisionAdvEnable`);

    //now if quaternary layer should be applied fetch it and get the flags

    if(quaternary_layer != false){
          switch(user.getFlag(MOD_NAMESPACE, 'secondaryMaterialDice')){
        case PD0_OPTIONS[0]:
            quaternary_layer = get_flavor_appearance('precision'); 
            break;
        case PD0_OPTIONS[1]:
            quaternary_layer = get_flavor_appearance(material); 
            break;
        case PD0_OPTIONS[2]:
            quaternary_layer = get_flavor_appearance(damage_flavor);  
            break;
        case PD0_OPTIONS[3]:
        default:
            quaternary_layer = get_base_appearance(user.getFlag("dice-so-nice", "appearance"), die_type);
            break
        }

        PF_OPTIONS.forEach( (element)=>{
            quaternary_flags.push(user.getFlag(MOD_NAMESPACE, `${element}PrecisionEnable`));   
        })
    }

    //now finally apply all the layers
    if(secondary_layer != false){
         PF_OPTIONS.forEach( (element, index)=>{
            if(secondary_flags[index])
                apply_complex_style(primary_layer, secondary_layer, element)
        })
    }
    if(ternary_layer != false){
         PF_OPTIONS.forEach( (element, index)=>{
            if(ternary_flags[index])
                apply_complex_style(primary_layer, ternary_layer, element)
        })
    }
    if(quaternary_layer != false){
         PF_OPTIONS.forEach( (element, index)=>{
            if(quaternary_flags[index])
                apply_complex_style(primary_layer, quaternary_flags, element)
        })
    }

    //apply the appearance to the die object
    die.options.appearance = primary_layer;
    return;
}

Hooks.on("diceSoNiceRollStart", (messageID, context) => {
    //get the user for the roll to later extract personal die styles
    let user = context.user;
    
    //if the module is disabled just return
    if(!user.getFlag(MOD_NAMESPACE, `mainToggle`))
        return;

    //parse the formula from the message to circumvent the base faulty behavior
    let roll_data = parse_rolls(game.messages.get(messageID).rolls)
    //get the dice object
    let dice = context.dsnRoll || context.roll; 

    //clone and assign the roll object to dnsRoll to prevent inflencing anything outside the animation
    if(!context.dsnRoll)
    {
        //context.dsnRoll = Roll.fromData(context.roll.toJSON());
        context.dsnRoll = Object.assign(Object.create(Object.getPrototypeOf(context.roll)), context.roll)
        dice = context.dsnRoll
    }

    //move from the roll object to its dice array
    dice = dice.dice;    

    //check if the parsed formula data is the same lenght as the dice array, if not something went horribly wrong
    if(dice.length != roll_data.length)
    {
        console.log("ROLL MISMATCH, DOCUMENT THE ROLL MESSAGE AND REPORT THIS AS A BUG  `")
        return;
    }

    //for each die in the array take an appropiate term from the parsed data and apply flavor
    dice.forEach((die, index)=>{
        flavor_dice(die, roll_data[index], user)
    })

})