module.exports = {
	name: 'play',
	description: 'make bot join into server',
	songlist: [],
	dispatcher: '',
	async execute(message, arg) {
		const voiceChannel = message.member.voice.channel;

		if (voiceChannel) {
			const connection = await voiceChannel.join();

			if (arg && arg.length > 0) {
				this.songlist.push(String(arg));

				if (this.songlist.length > 1) {
					message.channel.send({ embed: { author: { name: `A música ${arg} foi adicionada a fila` }, color: '#0099ff' } });
				}
				else {
					this.songmessage(message, arg);
					this.playsong(connection);
				}
			}
			else {
				message.reply('forneça pelo menos um argumento para o comando.');
			}

		}
	},
	playsong(connection) {
		const ytdl = require('ytdl-core');
		const dispatcher = connection.play(ytdl(this.songlist[0], { quality: 'lowestaudio' }));

		this.dispatcher = dispatcher;

		dispatcher.on('start', () => {
			console.log('Playing');
		});

		dispatcher.on('finish', () => {
			this.songlist.shift();
			if (this.songlist.length > 0) {
				this.playsong(connection, this.songlist[0]);
			}
			console.log(this.songlist);
			this.dispatcher = '';
		});
	},
	songmessage(message, arg) {
		const Discord = require('discord.js');
		const embedMessage = new Discord.MessageEmbed()
			.setAuthor(`Now playng: ${arg}`, 'attachment://musical_note.png')
			.setColor('#0099ff')
			.attachFiles(['./src/images/musical_note.png']);

		message.channel.send(embedMessage);
	},
};
