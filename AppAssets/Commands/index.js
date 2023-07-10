module.exports = {
	Slash: new Map([
		['discohook', require('./Slash/discohook')],
		['embed', require('./Slash/embed')],
		['ping', require('./Slash/ping')],
		['purge', require('./Slash/purge')],
		['switchtoken', require('./Slash/switchtoken')],
	]),
};
