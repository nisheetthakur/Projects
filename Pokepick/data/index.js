const userData = require('./user');
const pokemonRoutes = require("./pokemons");
const pokemonimageData = require("./uploadpokemon")
module.exports = {
    user: userData,
    pokemons: pokemonRoutes,
    pokemonsimage: pokemonimageData
}