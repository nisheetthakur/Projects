const mongoCollection = require("../dbConfig/mongoCollection");
const uuid = require("node-uuid");
const pokemonData = mongoCollection.pokemons;

let exportedMethods = {

    async getAllPokemons() {
        const pCollection = await pokemonData();
        return await pCollection.find({}).toArray();
    },

    async getPokemonByID(id) {
        if (!id) throw "There is no pokemon";
        console.log("Hello There..."+id);
        const pokemonCollection = await pokemonData();
        let ppokemon = await pokemonCollection.findOne({
            _id: id
        })
        if (ppokemon === null) throw "There is no pokemon";
        console.log("HEy ypu fasdjzbcx akdjxz,fhbcnaosjlx"+ppokemon);
        return ppokemon;
    },

    async addpokemonData(pname, ptype, pmax_atk, pmax_def, pmax_hp, pmax_cp, imagename, mimetype, imagepath){
        const pokemonCollection = await pokemonData();
        let newPokemon = {
            _id: uuid.v4(),
            pokename: pname,
            poketype: ptype,
            pokemax_atk: pmax_atk,
            pokemax_def: pmax_def,
            pokemax_hp: pmax_hp,
            pokemax_cp: pmax_cp,
            pokeimagename: imagename,
            pokemimetype: mimetype,
            pokeimagepath: imagepath
        }
        console.log(newPokemon);
        const insertpokemonsDB = await pokemonCollection.insertOne(newPokemon);
        if (insertpokemonsDB.insertedCount === 0) throw "Could not add post";
        return newPokemon;
    },
   
  };
  




module.exports = exportedMethods;