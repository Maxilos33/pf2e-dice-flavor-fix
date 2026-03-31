function is_a_die(string){
    return /\d+d\d+/g.test(string)
}

function is_fully_reduced(term){
    const dieRegex = /\d+d\d+/g;
    const constRegex = /\d+/g;

    //look for constand and die matches
    let diematch = term.match(dieRegex);
    let constmatch = term.match(constRegex);

    //if die or constant matched check if it is the whole string
    if(diematch != null && diematch.length != 0){
        if(diematch[0].length == term.length)
            return true;
    }
    else if(constmatch != null && constmatch.length != 0){
        if(constmatch[0].length == term.length)
            return true;
    }

    //else return false
    return false;
}

function check_bracket_parity(formula_string, ro = true, sq = true, cu = true){
    return      (ro ? ((formula_string.match(/\(/g) || []).length - (formula_string.match(/\)/g) || []).length) : 0) == 0
            &&  (sq ? ((formula_string.match(/\[/g) || []).length - (formula_string.match(/\]/g) || []).length) : 0) == 0
            &&  (cu ? ((formula_string.match(/\{/g) || []).length - (formula_string.match(/\}/g) || []).length) : 0) == 0
}

function try_strip_from_outter_par(formula_string){
    const openers = ['(', '[', '{'];
    const closers = [')', ']', '}'];
    //get the first character
    let first = formula_string.slice(0,1)
    //if it isnt one of the brackets just return
    if(!(openers.includes(first)))
    {
        return formula_string;
    }
    //get the appropiate closer
    let app_closer = closers[openers.indexOf(first)]

    //now we have to follow the string until we find bracket parity
    // only then we know for sure if the formula is entirely enclosed in a bracket
    let last_good_index = 0;
    do{
        let next_closer = formula_string.indexOf(app_closer, last_good_index+1)
        last_good_index = next_closer;
        if(last_good_index == -1){
            console.log("UNCLOSED BRACKET IN SPLIT!")
            return formula_string
        }
    }while(!check_bracket_parity(formula_string.substring(0,last_good_index+1)))
    //if parity was reached with the last character brackets can be safrly removed
    //else maintain the entire string

    if(last_good_index == formula_string.length-1){
        return formula_string.substring(1, formula_string.length - 1)
    }
    else{
        return formula_string
    }
}

function is_simple_term(formula_string){
    //check if term is simple
    //test if it contains complex signs (, * / + -), after replacing falvor brackets with nothing (since they may contain ,s)
    return !/[\,\*\/\+\-]/.test(formula_string.replaceAll(/\[[^\[]*\]/g, ''));
}

function try_split_by_symbol(formula_string){
    //naively split at every comma
    let matches = formula_string.match(/[\,\*\/\+\-]/g)
    let parts = formula_string.split(/[\,\*\/\+\-]/g)
    //if no split occured just return parts
    if(parts.length == 1)
        return parts;
    //else for each part 
    let restored = 0;
    for(let i = 0; i<parts.length; i++)
    {
        //if parity was disrturbed merge with next element and reevaluate
        if(!check_bracket_parity(parts[i])){
            if(i == parts.length-1){
                console.log("PARITY MISMATCH AT LAST SPLIT ATTEMPT!")
                return parts;
            }
            parts[i] = parts[i] + matches[restored] +  parts[i+1];
            parts.splice(i+1, 1);
            i--;
        }
        restored++;
    }
    //return parts re-merged with maintained bracket parity
    return parts
}

function strip_of_whitespace(formula_string){
    return formula_string.replaceAll(' ', '');
}

function try_get_global_flavors(formula_string){
    let flavors = [];
    //find last occurance of open square bracket
    let first_posiotion = formula_string.lastIndexOf('[');
    if(first_posiotion == -1){
        return flavors;
    }
    //find last position of closed square bracket
    let last_position = formula_string.indexOf(']', first_posiotion);
    if(last_position == -1){
        console.log("UNCLOSED FLAVOR BRACKET IN SPLIT!")
        return flavors;
    }
    if(last_position != formula_string.length-1){
        return flavors;
    }
    //if this flavor bracket ends the string and the string is fully split
    //we assume this flavor applies to the entire term
    //there may be a better way to do this but it works
    flavors = formula_string.substring(first_posiotion+1, last_position).split(',');
    return flavors;
}

function try_remove_global_flavors(formula_string){
    let first_posiotion = formula_string.lastIndexOf('[');
    if(first_posiotion == -1){
        return formula_string;
    }
    let last_position = formula_string.indexOf(']', first_posiotion);
    if(last_position == -1){
        console.log("UNCLOSED FLAVOR BRACKET IN SPLIT!")
        return formula_string;
    }
    if(last_position != formula_string.length-1){
        return formula_string;
    }
    //if this flavor bracket ends the string and the string is fully split
    //we assume this flavor applies to the entire term
    //there has to be a better way to do this
    //dont touch
    return formula_string.substring(0, first_posiotion);
}

function termCycler(term, globalflavors = []){
    //if the term is fully reduced then simply return it as an object with flavors

    if(is_fully_reduced(term)){
        return {term: term, flavor: globalflavors}
    }

    //prepare spots for flavors and stripped formula
    let sanitized_formula = "";
    {        
        // else we test if the term is simple (singular simple term with flavor attached)
        let simple = is_simple_term(term)
        //try to extract furthest flavors and remove it along with outtermost brackets
        let flavor_candidates = try_get_global_flavors(term);
        let no_flavor_term = try_remove_global_flavors(term);
        let stripped_term = try_strip_from_outter_par(no_flavor_term);
        //if stripped term is identical to no flavor term and the term is not simple, it means the flavor wasnt global
        //in that case we want to work on the full original
        //else we want to work on the stripped formula and consider extracted flavors global for this branch of the tree
        if(stripped_term == no_flavor_term && !simple){
            sanitized_formula = term;
        }
        else{
            globalflavors = globalflavors.concat(flavor_candidates); 
            sanitized_formula = stripped_term;
        }
    }

    //try to split the term into subterms and then repeat the procedure on each
    let terms = try_split_by_symbol(sanitized_formula);
    let return_value = []
    terms.forEach((elemnt) =>{
        return_value.push(termCycler(elemnt, globalflavors))
    })

    //return the parsed tree structure
    return return_value;
}

function flatten_results(recursive_array){
    //flattening to level 100, not the best solution but we assume no formula will have more than 100 nests
    return [recursive_array].flat(100)
}

function strip_non_dice_terms(flat_array){
    //filter the array to retain only dice terms
    return flat_array.filter((element) => is_a_die(element.term))
}


export function FStringToObject(formula){
    //first strip the formula off whitespaces
    //then parse it into a tree of terms and flavors
    //then flatten the tree into a list
    //then strip the list of non dice terms
    return strip_non_dice_terms(flatten_results(termCycler(strip_of_whitespace(formula))));
}



//>
//o-<
//>