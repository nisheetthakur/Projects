const express = require('express');
const router = express.Router();
const data = require("../data");
const userData  = data.user;

router.get('/', async(req, res) => {
    try{
        const getAllUsers = await userData.getAllUsers();
        res.json(getAllUsers);
    }catch(error){
        res.status(500).json({error: error});
    }
})

router.get('/:id', async(req, res) => {
    try{
        const getUserById = await userData.getUserById(req.params.id);
        res.json(getUserById);
    }catch(error){
        res.status(404).json({error: "User not found!"});
    }
})

router.post("/", async(req, res) => {
    let info = req.body;
    try{
        const addUser = await userData.addUser(info);
        res.status(200).json({success:"add user successfully"});
    }catch(error){
        res.status(500).json({error: "Could not add user"});
    }
})

router.patch('/:id', async (req, res) => {
    let info = req.body;
    try{
        await userData.getUserById(req.params.id);        
        const updateUser = await userData.updateUser(req.params.id, info);
        res.status(200).json(updateUser);
    }catch(error){
        res.status(404).json({error: "cannot found user"});
    }
})

router.delete('/:id', async (req, res) => {
    
    try{
        console.log(" The id should be delete is " + req.params.id);
        const removeUser = await userData.removeUser(req.params.id);
        res.status(200).json({success: "remove successfully"});
    }catch(error){
        res.status(404).json({error: "cannot found user"});
    }
})


router.get('/name/:name', async(req, res) => {
    try{
        console.log(req.params.name);
        const getUserByName = await userData.getUserByName(req.params.name);
        res.json(getUserByName);
    }catch(error){
        res.status(404).json({error: "User not found!"});
    }
})

module.exports = router;