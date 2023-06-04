module.exports = {
    name: 'reactionroleGrade',
    description: "Sets up reaction role message!",
    async execute(message, args, Discord, client){
        const channel = '1011096658844590125'
        const seniorRole = message.guild.roles.cache.find(role => role.name === "Senior");
        const juniorRole = message.guild.roles.cache.find(role => role.name === "Junior");
        const sophomoreRole = message.guild.roles.cache.find(role => role.name === "Sophomore");
        const freshmanRole = message.guild.roles.cache.find(role => role.name === "Freshman");

        const seniorEmoji = '🔴'
        const juniorEmoji = '🟠'
        const sophomoreEmoji = '🟡'
        const freshmanEmoji = '🔵'

        let embed = new Discord.EmbedBuilder()
        .setColor('#e42643')
        .setTitle('Pick Your Grade')
        .setDescription('Choose the grade you are currently in!\n\n'
            + `${seniorEmoji} - Senior\n\n`
            + `${juniorEmoji} - Junior\n\n`
            + `${sophomoreEmoji} - Sophomore\n\n`
            + `${freshmanEmoji} - Freshman`);

        let messageEmbed = await message.channel.send({embeds: [embed]});
        messageEmbed.react(seniorEmoji);
        messageEmbed.react(juniorEmoji);
        messageEmbed.react(sophomoreEmoji);
        messageEmbed.react(freshmanEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === seniorEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(seniorRole);
                }
                if(reaction.emoji.name === juniorEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(juniorRole);
                }
                if(reaction.emoji.name === sophomoreEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(sophomoreRole);
                }
                if(reaction.emoji.name === freshmanEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(freshmanRole);
                }
            }else {
                return;
            }

        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === seniorEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(seniorRole);
                }
                if(reaction.emoji.name === juniorEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(juniorRole);
                }
                if(reaction.emoji.name === sophomoreEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(sophomoreRole);
                }
                if(reaction.emoji.name === freshmanEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(freshmanRole);
                }
            }else{
                return;
            } 

            
        });

    }
}