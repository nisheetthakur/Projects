const mongoCollection = require("../dbConfig/mongoCollection");
const users = mongoCollection.users;
// const uuid = require('node-uuid');
//const bcrypt = require('bcrypt'); 
const bcrypt = require('bcrypt-nodejs');

module.exports = {
    async getUserById(id) {
        if (!id) throw "You must provide an id to search for";
    
        const userCollection = await users();
        const userGo = await userCollection.findOne({ _id: id });
        if (userGo === null) throw "No user with that id";
    
        return userGo;
      },

      async getAllUsers() {
        const userCollection = await users();
    
        const usersFinder = await userCollection.find({}).toArray();
    
        return usersFinder;
      },
    
      async addUser(info) {
        console.log(info);
        //check the username and password, which must be provide at this time 
        if(!info.userName)throw"No userName was provided";
        if(!info.password)throw"No password was provided";
        
        
        const userCollection = await users();
        const saltRounds = 10;
        let myPassword = info.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        let hashedPassword = bcrypt.hashSync(myPassword, salt);
        console.log(hashedPassword);
        let newUser = {
          userName: info.userName,
          _id: info.userName,
          password: hashedPassword,
          adman: false,
          email: info.email,
          profile:{
            name: info.name,
            hobby: info.hobby,
            gender: info.gender,
          },
          team:info.team,
        };
        console.log(newUser);
        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) throw "Could not add user";
    
        const newId = insertInfo.insertedId;
    
        const user = await this.getUserById(newId);
        return user;
      },
      async removeUser(id) {
        if (!id) throw "You must provide an id to search for";
        const userCollection = await users();
        const deletionInfo = await userCollection.removeOne({ _id: id });
    
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete user with id of ${id}`;
        }
      },

      async updateUser(id, info) {
        if(!id)throw "No id was provided";
        if(!info)throw "No new Input"
        const userCollection = await users();
        let updatedUser = {};

        if(info.password){
          updatedUser.password = info.password;
        }
        if(info.gender){
          updatedUser.gender = info.gender;
        }
        if(info.email){
          updatedUser.email = info.email;
        }
        if(info.team){
          updatedUser.team = info.team;
        }
        let updateCommand = {
          $set: updatedUser
        };
        const query = {
          _id: id
         };

        const updatedInfo = await userCollection.updateOne(query, updateCommand);
        
        if (updatedInfo.modifiedCount === 0) {
          throw "could not update user successfully";
        }
    
        return await this.getUserById(id);
      },

      async  admanRight(id){
        const userCollection = await users();
        let updatedUser = {};
        updataedUser.adman = true;
        let updateCommand = {
          $set: updatedUser
        };
        const query = {
          _id: id
         };

        const updatedInfo = await userCollection.updateOne(query, updateCommand);
        
        if (updatedInfo.modifiedCount === 0) {
          throw "could not update user successfully";
        }
    
        let ADman =  await this.getUserById(id);
        return ADman.adman;
      }
      // async findUserByUserName(userName){
      //   let users = getAllUsers();
      //   console.log("findUser");
      //   for(let user of users){
      //     if(user.profile.userName === userName){
      //       return user;
      //     }else{
      //       console.log("not found");
      //       res.status(500).json({error: "User not found"});
      //     }
      //   }
      // },

      //  getUserByName(userName) {
      //   if (!userName) throw "You must provide an id to search for";
      //   console.log(userName);
      //   const userCollection =  users();
      //   const userGo =  userCollection.findOne({ userName: userName });
      //   console.log(userGo);
      //   if (userGo === null) throw "No user with that userName";
    
      //   return userGo;
      // },



      

    //   function getUserByName(username) {
    //     for (var i = 0; i < users.length; i++) {
    //         if (users[i].username === username ) {
    //             return users[i];
    //         }
    //     }
    //     return null;
    
    // }
};