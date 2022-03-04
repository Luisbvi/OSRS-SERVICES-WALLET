const {CommandInteraction, MessageEmbed} = require("discord.js");
const Bank = require("../../Schema/Bank");


module.exports = {
    name: "paid",
    description: "register the money paid from this services",
    options: [
        {
            name: "customer",
            type: "USER",
            description: "Customer who is paying",
            required: true
        },
        {
            name: "amount",
            type: "NUMBER",
            description: "Amount of money paid",
            required: true
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction){
        if(interaction.member.permissions.has("ADMINISTRATOR")) return;
        
        const customer = interaction.options.getUser("customer");
        const amount = interaction.options.getNumber("amount");
        let data = await Bank.findOne({userID: customer.id});
        if(!data){
            let newData = new Bank({
                userID: customer.id,
                money: 0,
                role: ""
            })
            await newData.save();
            return interaction.reply({embeds: [new MessageEmbed().setDescription("Wallet created in our bank system").setColor("GREEN")]});
        }
        let totalMoney = data.money;
        let balance = totalMoney + amount;
        if (balance > 99 && balance < 200 ){
            await Bank.findOneAndUpdate({userID: customer.id}, {role: "<@&856961746896289793>"})
        }
        if (balance > 199 && balance < 350){
            await Bank.findOneAndUpdate({userID: customer.id}, {role: "<@&929958088780447754>"})
        }
        if (balance > 349 && balance < 750){
            await Bank.findOneAndUpdate({userID: customer.id}, {role: "<@&929958488849932318>"})
        }
        if (balance > 749 && balance < 1250){
            await Bank.findOneAndUpdate({userID: customer.id}, {role: "<@&856961852180004904>"})
        }
        if (balance > 1249){
            await Bank.findOneAndUpdate({userID: customer.id}, {role: "<@&856962053640945705>"})
        }
        
        await Bank.findOneAndUpdate({userID: customer.id}, {money: totalMoney + amount})
        const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("<:BTC:853398763392466944> WALLET SYSTEM <:BTC:853398763392466944>")
        .setThumbnail(customer.avatarURL({dynamic: true, size: 512}))
        .setDescription(`- **Payment received:** \`\`\`diff\n- ${amount}$\`\`\`\n- **${customer.username}'s Balance:** \`\`\`diff\n- ${balance}$\`\`\`\nRole avaliable: ${await data.role}`)
        interaction.reply({embeds: [embed]});

    }
}