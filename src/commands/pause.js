module.exports = {
	name: 'pause',
	execute(message) {
		const dispatcher = require('./play').dispatcher;

		dispatcher.pause(true);

		message.reply('Song is :pause_button: paused now.');
	},
};