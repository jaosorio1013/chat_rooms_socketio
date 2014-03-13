// para generar la minificacion de codigo se debe escribir el comando:
// node r.js -o room.build.js
({
	baseUrl: '../js',
	name: '../js/room',
	out: '../js/room.min.js',
	preserveLicenseComments: false,
	paths: {
		requireLib: 'libs/require',
		jquery:     'libs/jquery'
	},
	// optimize: "none",
	include: 'requireLib'
})