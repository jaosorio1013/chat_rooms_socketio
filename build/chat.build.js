// para generar la minificacion de codigo se debe escribir el comando:
// node r.js -o chat.build.js
({
	baseUrl: '../js',
	name: '../js/chat',
	out: '../js/chat.min.js',
	preserveLicenseComments: false,
	paths: {
		requireLib: 'libs/require',
		jquery:     'libs/jquery'
	},
	// optimize: "none",
	include: 'requireLib'
})