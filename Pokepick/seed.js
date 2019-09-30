const dbConnection = require('./dbConfig/mongoConnection');
const data = require("./data");
const users = data.user;
const pokemons = data.pokemons;

dbConnection().then(
  db => {
    return db
      .dropDatabase()
      .then(() => {
        return dbConnection;
      })
      .then(db => {
        return pokemons
          .addPokemon("1", "BULBASAUR", "grass", 118, 111, 128, 1115)
          .then(() => {
            return pokemons.addPokemon(
                "147",
                "DRATINI",
                "dragon",
                119,
                91,
                121,
                1004
            );
          })
          .then(() => {
            return pokemons.addPokemon(
                "371",
                "BAGON",
                "dragon",
                134,
                93,
                128,
                1156
            );
          });
      })
      .then(() => {
        console.log("Done seeding database");

      });
  },
  error => {
    console.error(error);
  }
);
