function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function generateBackgroundColor() {
	const hue = random(0, 360);
	const saturation = random(70, 100);
	const brightness = random(10, 25);
	const color = 'hsl(' + hue + ', ' + saturation + '%, ' + brightness + '%)';

	document.documentElement.style.setProperty('--bg-color', color);
}

generateBackgroundColor();
