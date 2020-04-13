module.exports = {
	name: 'resume',
	execute(message) {
		const dispatcher = require('./play').dispatcher;

		dispatcher.resume();

		message.reply('Song is :arrow_forward: resuming now.');
	},
};