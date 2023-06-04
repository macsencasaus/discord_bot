module.exports = {
    name: 'reactionroleClass',
    description: "Sets up reaction role message!",
    async execute(message, args, Discord, client){
        const channel = '1011096658844590125'
        const seniorRole = message.guild.roles.cache.find(role => role.name === "CS 3");
        const juniorRole = message.guild.roles.cache.find(role => role.name === "AP CS A");
        const sophomoreRole = message.guild.roles.cache.find(role => role.name === "CS Pre-AP");
        const freshmanRole = message.guild.roles.cache.find(role => role.name === "AP CS Principles");

        const seniorEmoji = '🟢'
        const juniorEmoji = '🟣'
        const sophomoreEmoji = '🟤'
        const freshmanEmoji = '⚫'

        let embed = new Discord.EmbedBuilder()
        .setColor('#e42643')
        .setTitle('Pick Your Class')
        .setDescription('Choose your highest or current computer science class you are in!\n\n'
            + `${seniorEmoji} - Computer Science 3\n\n`
            + `${juniorEmoji} - AP Computer Science A\n\n`
            + `${sophomoreEmoji} - Computer Science Honors/Pre-Ap\n\n`
            + `${freshmanEmoji} - AP Computer Science Principles`);

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