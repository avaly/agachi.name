const WebFontLoader = require('webfontloader');

function loadFonts() {
	WebFontLoader.load({
		google: {
			families: ['Share Tech Mono'],
		},
	});
}

loadFonts();
