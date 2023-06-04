const { Client, GatewayIntentBits, Partials } = require('discord.js');

const Discord = require('discord.js');

const myItents = new Discord.IntentsBitField(32767);


const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildEmojisAndStickers
    ], 
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const token = "YOUR API KEY";

const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('CHHS CompSci Club is online!');
});

client.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }else if(command === 'reactionrolegrade'){
        client.commands.get('reactionroleGrade').execute(message, args, Discord, client);
    }else if(command === 'reactionroleclass'){
        client.commands.get('reactionroleClass').execute(message, args, Discord, client);
    }
});

client.login(token);

