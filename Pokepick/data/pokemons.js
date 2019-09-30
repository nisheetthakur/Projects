const mongoCollection = require("../dbConfig/mongoCollection");
const pokemons = mongoCollection.pokemons;
const uuid = require("node-uuid");


// let exportedMethods = {
var newPokemon = {
    _id: "",
    name: "",
    type: "",
    max_atk: 0,
    max_def: 0,
    max_hp: 0,
    max_cp: 0,
    imageinfo : {},
    comments: ""
}

async function getAllpokemon() {
    const pokemonCollection = await pokemons();
    let getAll = await pokemonCollection.find({}).toArray();
    return getAll
}
    // getAllPokemons() {
    //     return pokemons().then(pokemonCollection => {
    //         let pokelist = pokemonCollection.find({}).toArray();
    //         return pokelist;
    //     })
    // },
// async function getPokemonById(id) {
//     if(!id) {
//         throw "The id is not correct, Please enter a correct id";
//     }
//     const pokemonCollection = await pokemons();
//     let getById = pokemonCollection.findOne({_id : id });
//     if(getById == null) {
//         throw "The pokemon is not existed with this id"
//     }
//     return getById;
// }
    // getPokemonById(id) {
    //     return pokemons().then(pokemonCollection => {
    //         return pokemonCollection.findOne({_id : id }).then(pokemon => {
    //             if(!pokemon) throw "There isn't this pokemon";
    //             return pokemon;
    //         })
    //     })                      
    // },
async function getPokemonByName(name) {
    if(!name) {
        throw "The name is not correct, Please enter a correct name"
    }
    const pokemonCollection = await pokemons();
    let getByName = pokemonCollection.findOne({name : name });
    if(getByName == null) {
        throw "The pokemon is not existed with this name"
    }
    return getByName;
}
    // getPokemonByName(name) {
    //     return pokemons().then(pokemonCollection => {
    //         return pokemonCollection.findOne({name : name }).then(pokemon => {
    //             if(!pokemon) throw "There isn't this pokemon";
    //             return pokemon;
    //         })
    //     })
    // },
async function getPokemonByType(type) {
    if(!type) {
        throw "The type is not correct, Please enter a correct type"
    }
    const pokemonCollection = await pokemons();
    let getByType = pokemonCollection.find({type : type }).toArray();
    if(getByType == null) {
        throw "The pokemons are not existed with this type"
    }
    return getByType;
}
    // getPokemonByType(type) {
    //     return pokemons().then(pokemonCollection => {
    //         return pokemonCollection.find({type : type }).toArray().then(pokemon => {
    //             if(!pokemon) throw "There isn't this kind of pokemon";
    //             return pokemon;
    //         })
    //     })
    // }

async function addPokemon(id, name, type, max_atk, max_def, max_hp, max_cp, imageinfo, comments) {
    if(!id || typeof id !== "string" || id.length === 0) {
        throw "Please enter the correct id with a string";
    }

    if(!name || typeof name !== "string" ||name.length === 0) {
        throw "Please enter the correct name with a string";
    }

    if(!type || typeof type !== "string" ||type.length === 0) {
        throw "Please enter the correct type with a string";
    }

    if(!max_atk || typeof max_atk !== "number" ||max_atk.length === 0) {
        throw "Please enter the correct max_atk with a number";
    }

    if(!max_def || typeof max_def !== "number" ||max_def.length === 0) {
        throw "Please enter the correct max_def with a number";
    }

    if(!max_hp || typeof max_hp !== "number" ||max_hp.length === 0) {
        throw "Please enter the correct max_hp with a number";
    }

    if(!max_cp || typeof max_cp !== "number" ||max_cp.length === 0) {
        throw "Please enter the correct max_cp with a number";
    }


    newPokemon._id = id;
    newPokemon.name = name;
    newPokemon.type = type;
    newPokemon.max_atk = max_atk;
    newPokemon.max_def = max_def;
    newPokemon.max_hp = max_hp;
    newPokemon.max_cp = max_cp;
    newPokemon.imageinfo = imageinfo;
    newPokemon.comments = comments;

    const pokemonCollection = await pokemons();
    let add = await pokemonCollection.insertOne(newPokemon);
    if(add.insertedCount === 0) {
        throw "Creating the pokemon is not successful";
    }
    return newPokemon;
    // const newId = add.insertedId;
    // let act = await this.getPokemonById(newId);
    // return act;

}
    // addPokemon( name, type, max_atk, max_def, max_hp, max_cp, comments) {
    //     return pokemons().then(pokemonCollection => {
    //         let newPokemon = {
    //             _id: name, 
    //             name: name,
    //             type: type,
    //             max_atk: max_atk,
    //             max_def: max_def,
    //             max_hp: max_hp,
    //             max_cp: max_cp,
    //             comments: comments
    //         }
    //         return pokemonCollection.insertOne(newPokemon).then(newInsertInformation => {
    //             return newInsertInformation.insertedId;
    //         }).then(newId => {
    //             return this.getPokemonById(newId);
    //         })
    //     })
    // },
async function removePokemon(id) {
    if(!id) {
        throw "Please enter a correct id for removing"
    }
    const pokemonCollection = await pokemons();
    let deletion = await pokemonCollection.removeOne({_id: id});
    if(deletion.deleteCount === 0) {
        throw `Deleting the pokemon with ${id} is not successful`;
    }
    return `${id} removed successfully`;
}
    // removePokemon(id) {
    //     return pokemons().then(pokemonCollection => {
    //         return pokemonCollection.removeOne({_id: id}).then(deleteInfo => {
    //             if(deleteInfo.deleteCount === 0) {
    //                 throw `The id of ${id} could not be deleted`;
    //             } else {
    //             }
    //         })
    //     })
    // },
    // async addcomment(id, updatePokemon) {
    //     if(!id) {
    //         throw "You should enter a correct id";
    //     }
    //     const pokemonCollection = await pokemons();
    //     let pokemonobject = await pokemonCollection.findOne({_id : id});
    //     if(pokemonobject === null) {
    //         throw "no such pokemon";
    //     }

    //     let updatePokemonData = {};

    //     if(updatePokemon.comments) {
    //         updatePokemonData.comments =  updatePokemon.comments;
    //     }

    //     let updateCommand = {
    //         $set: updatePokemonData
    //     };
    //     const update = await pokemonCollection.updateOne({_id : id}, updateCommand);
    //     if(update.modifiedCount === 0) {
    //         throw "Updating the pokemon is not successful";
    //     }
    //     return await this.getPokemonById(id);
    // },
function addComment(id, updatePokemon) {
    return pokemons().then(pokemonCollection => {
        let updatePokemonData = {};

        if(updatePokemon.comments) {
            updatePokemonData.comments =  updatePokemon.comments;
        }

        let updateCommand = {
            $set: updatePokemonData
        };

        return pokemonCollection.updateOne({_id: id}, updateCommand).then(result => {
            return this.getPokemonById(id);
        })
    })
}
// }

// module.exports = exportedMethods;
module.exports = {
    getAllpokemon,
    getPokemonByName,
    getPokemonByType,
    addPokemon,
    removePokemon,
    addComment 
}