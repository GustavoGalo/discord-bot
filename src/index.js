/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const fs = require('fs');

client.commands = new Discord.Collection;

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async msg => {
	if (!msg.content.startsWith(config.prefix)) return;

	const args = msg.content.slice(config.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	console.info(`Called command: ${command}. Args: ${args}`);

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(msg, args);
	}
	catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

client.login(config.token);