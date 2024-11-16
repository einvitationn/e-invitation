const button = $('button');
const envelope = $('.envelope');
var flipped = false;

function pullOut() {
	return new TimelineMax()
		.to('.flap', 1, {
			rotationX: 180,
			ease: Power1.easeInOut
		}, 'scaleBack')
		.to('.invitation', 1, {
			scale: 0.8,
			ease: Power4.easeInOut,
		}, 'scaleBack')
		.set('.flap', {
			zIndex: 0
		})
		.to('.card', 1, {
			y: '0%',
			scaleY: 1.2,
			ease: Circ.easeInOut,
		})
		.set('.mask', {
			overflow: 'visible',
			onComplete: function() {
				envelope.toggleClass('is-open');
			}
		})
		.to('.mask', 1.3, {
			'clip-path': 'inset(0 0 0% 0)',
			ease: Circ.easeInOut,
		}, 'moveDown')
		.to('.card', 1.3, {
			y: '100%',
			scaleY: 1,
			ease: Circ.easeInOut,
		}, 'moveDown')
		.to('button', 1, {
			y: '180px', // Adjust this value as needed
			ease: Circ.easeInOut,
			onComplete: toggleText
		}, 'moveDown+=0.15')
		.set(button, { // Change the top position after the animation
			top: '97px' // Set this to your desired value
		});
}

function toggleFlip() {
	if (!envelope.hasClass('is-open')) {
		return;
	}

	const ry = (!flipped) ? 180 : 0;
	flipped = (!flipped) ? true : false;

	TweenMax.to('.card', 1, {
		rotationY: ry,
		ease: Power4.easeInOut,
		onComplete: toggleText
	});
}

function toggleText() {
	var text = !flipped ? 'Tell me more!' : 'See you there!';
	button.toggleClass('invert', !flipped).text(text);
}

button.one('click', pullOut);
button.on('click', toggleFlip);
