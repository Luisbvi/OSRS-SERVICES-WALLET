const { Client } = require('discord.js');
const mongoose = require("mongoose");
const {} = require('../../config.json')

module.exports = {
    name: "ready",
    once: true,

    /**
     * 
     * @param {Client} client 
     */

    async execute(client){
        console.log(`${client.user.tag} is online!`);
        client.user.setPresence({activities: [{name: "Services ", type: "WATCHING"}], status: "dnd"});

        if(!process.env.DATABASE) return
        mongoose.connect(DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            console.log(`${client.user.username} is now connected to the database!`);
        }).catch(err =>{
            console.log(err);
        });
        

        
    } 
}