import React from 'react';

export default function Explanation() {
return (
	<div className="explanation">

		<h4>Technical Explanation</h4>
		<p>For this project I set a baseline 'framerate' so that the animations are smooth and so the sounds and animations are both measured off the same `setInterval` clock. The interval isn't the time keeper though. Time is kept by measuring time passed between `new Date()` function calls. One can see by measuring the differences between calls that there is quite a range of in the alotted time passed. With a 'framerate' of 4ms these incremental additions of time passed will add up to a number but more importantly the resounding fact that the metronome will hardly ever calculate the exact amount of expired time required before the next beat. Consider the code below example.</p>

<pre>{`
// ms needed to pass for 60 BPM
let goal = 1000;
let oldDate = new Date();
let counter = 0; // time expired in ms

setInterval(function() {
  let newDate = new Date();
  let difference = newDate - oldDate;
  counter += difference;
}, 4) // framerate
`}
</pre>

		<p>Some time will pass and we will reach these states</p>

<pre>{`
// interval x 
// counter = 9988;
let difference = 4;
counter += difference; // 9992

// interval x + 1
// counter = 9992;
let difference = 5;
counter += difference; // 9997

// interval x + 2
// counter = 9997;
let difference = 7;
counter += difference; // 1004
`}
</pre>

		<p>Now should the metronome tick at round 2 or at round 3? At round 2 it will be ahead and at round 3 it will be behind in terms of precision. The implementation of a tolerance (ms) means that the metronome can be configured to prefer earlier or later. At tolerance of 4ms the metronome ticks on round 2 and at a lower tolerance would tick on round 3.</p>
		<p>For some musicians a metronome that 'rushes' is preferable to one that 'drags'. Of course the metronome dragging and rushing has inspired many music jokes but in this instances they are actually correct. This metronome allows the user to choose.</p>
		<p>A higher tolerance will result in a faster metronome and a lower tolerance will result in a slower metronome. Personally I need it bothe ways depending on the style of music I am playing! A value of 6 seems to work just perfectly and is more accurate then <a href="https://www.google.com/search?q=metronome" target="_blank" rel="noopener noreferrer">google's metronome</a>.</p>
		<p>Metronome graphic used with <i className="fa fa-creative-commons"></i> license. Original work available <a href="https://thenounproject.com/term/metronome/28819/" target="_blank" rel="noopener noreferrer">here</a></p>	
	</div>
	)
}