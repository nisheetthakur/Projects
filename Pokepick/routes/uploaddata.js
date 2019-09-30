const express = require("express");
const data = require("../data");
const pokedata = data.pokemonsimage;
const router = express.Router();
const multer = require("multer");
const path = require("path");
const requireCookie = require("./user");

// For storing Images & Videos
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/bmp') {
    callback(null, './public/uploads/recipeImages/');
    } else {
        callback(null, false);
    }
  },
  filename: function (req, file, callback) {
    callback(null, (new Date().toISOString().replace(/:/g, '_') + file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/bmp' )
        callback(null, true);
    else
        callback(null, false);
    };
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 10000024 * 10000024 * 60000
        },
    fileFilter: fileFilter
});


router.post("/",upload.single('file'), async (req, res) => {
    try {
        let filetype= req.file.mimetype;
        if (filetype == 'image/png' || filetype == 'image/jpeg' || filetype == 'image/bmp') {
        try {
        //upload.single('uploadtitleimage');
            const newPokemon = await pokedata.addpokemonData(
            req.body.name,
            req.body.type,
            req.body.max_atk,
            req.body.max_def,
            req.body.max_hp,
            req.body.max_cp,
            req.file.originalname,
            req.file.mimetype,
            (req.file.path).replace(/\\/g, "/")
        );
      
    } catch (e) {
        res.status(500).json({
          error: e
        });
      }
     }
    res.redirect("/");
  } catch (e) {
    res.status(500).json({
      error: e
    });
  }

});
router.get("/:id", async (req, res) => {
    let getPokemon = await pokedata.getPokemonByID(req.params.id);
    let arrExt = getPokemon.rmimetype;
    if (arrExt == 'image/png' || arrExt == 'image/jpeg' || arrExt == 'image/bmp') {
        ppokemon = JSON.stringify(getRecipe);
        res.render("openPokemon", { pokemons: JSON.parse(ppokemon), css: "styles.css" });
  }

});
module.exports = router;