const {CommandInteraction } = require("discord.js");
var Client = require("coinbase").Client;
var client = new Client({ 'apiKey': '4a7fPWwK3n3aFdas', 'apiSecret': 'hhi1pmu4oHwxEBfrwwZQn3lRkPxIzu3c','strictSSL': false });

module.exports = {
    name: "test",
    description: "Test coinbase",

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        try {
            interaction.reply({content: "test", ephemeral: true})
            client.getAccount('6c68fa4b-ace3-51bb-9493-bae7ea707767', function(err, accounts) {
                console.log(accounts);
              });

        } catch (error) {
            console.log(error);
        }


    }
}