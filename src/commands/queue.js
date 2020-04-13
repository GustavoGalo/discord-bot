module.exports = {
	name: 'queue',
	description: 'show queue song',
	execute(message) {
		const songlist = require('./play').songlist;

		if (songlist.length > 0) {
			const fields = [];
			songlist.map(song => {
				fields.push({
					name: `${songlist.indexOf(song) + 1}`,
					value: `${song}`,
				});
			});

			const embedmessage = {
				color: '#0099ff',
				title: 'Queue song',
				fields: fields,
			};

			message.channel.send({ embed: embedmessage });
		}
		else {
			const embedmessage = {
				author: {
					name: 'Não há nenhuma música para tocar',
				},
				color: '#0099ff',
			};

			message.channel.send({ embed: embedmessage });
		}
	},
};