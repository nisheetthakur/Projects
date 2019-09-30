const express = require("express");
const router = express.Router();

router.get("/pokemons", (req, res) => {

   
    res.redirect('/pokemons');
    
});

module.exports = router;