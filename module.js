//list of accepted damage flavors
const flavorList = ["slashing", "bludgeoning", "piercing", "fire","cold","electricity","sonic","poison","acid","void","vitality","mental","force","spirit","bleed","fallback"];
//regex to find dice expressions
const dieRegex = /[0-9]+d[0-9]+/g;

//hook onto dsn message processed event, it fires before each dice roll
Hooks.on('diceSoNiceMessageProcessed', (cmid, intercept) => {
    //use message id to 
    let message = game.messages.get(cmid)

    //if message is not a roll return
    if(!message.isRoll)
        return;
    //else add missing flavors

    //for each roll of the message
    message.rolls.forEach(roll => {

        //get damage formula
        let dmgFormula = roll._formula;

        //if the formula contains no flavors there's no need for further action
        if(!flavorList.some(v =>  dmgFormula.includes(v)))
            return;


        //find positions of dice expressions
        let diceMatches = [];
        let match;
        while ((match = dieRegex.exec(dmgFormula)) != null) {
            diceMatches.push(match.index);
        }

        //if no dice expressions were found there's no need for further action
        if(diceMatches.length == 0 )
            return;

        //for each die in the roll
        //(order of dice expressions is identical to the order of dice in the object)
        roll.dice.forEach((diceTerm, diceIndex) => {

            //remove healing and damage flavors, as they seem to disable the custom appearance sometimes
            if(diceTerm.options.flavor){
                diceTerm.options.flavor = diceTerm.options.flavor
                    .replaceAll("healing", "")
                    .replaceAll("damage", "")
                   .replaceAll(",", "");
                if (diceTerm.options.flavor == "")
                    delete diceTerm.options.flavor;
            }

            //if the die has no flavor (some die are flavored correctly, so they're skipped)
            if(!diceTerm.options.flavor){
                let finalFlavor = "";
                //get the position of the dice in damage formula
                let dicePosition = diceMatches[diceIndex];
                //get the position of the next closing square bracket
                //damage formula is constructed in a way there's no need too look further
                //flavors are always contained within square brackets and only the next one may apply
                let flavorPosition = dmgFormula.indexOf("]", dicePosition);

                //only try to apply flavor if it was found in the formula
                if(flavorPosition != -1){
                    //get the relevant string
                    let relString = dmgFormula.substring(dicePosition, flavorPosition);

                    //special case for unflavored dice
                    //if the last operand in the relevant string is outside of the scope
                    //abort the flavoring (so it doesnt carry over for unflavored die)
                    if(relString.lastIndexOf('+') > relString.lastIndexOf(')'))
                        return;

                    //find the string for the found flavor
                    flavorList.some(v => {finalFlavor = v ;return relString.includes(v)});
                    //if the found flavor string is not empty or the fallback value apply it to the die
                    if(finalFlavor != "" && finalFlavor != "fallback")
                        diceTerm.options.flavor = finalFlavor;
                }
            }
        })

    })


})
