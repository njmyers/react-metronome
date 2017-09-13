import React, { Component } from 'react';

// components
import BPM from './BPM';

// assets
import click from './click.mp3';
import wand from './metronome-wand.svg';

class Metronome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle: false,
			ms: 1000,
			counter: 0,
			// wand stuff
			rotation: 26,
			direction: true,
			style: this.transformPrefixer('rotate(26deg)'),
			beat: 0,
			tockCounter: 0,
			tolerance: 6
		};

		this.tickSound = new Audio(click);
		this.frameRate = 4;
		this.switch = this.switch.bind(this);
	}
	
	// must keep this binding and named function to inherit values from BPM/Beat counter children

	inheritBPM = (bpm) => {
		this.setState({
			ms: this.ms(bpm)
		});
	}

	inheritBeat = (beat) => {
		this.setState({	beat });
	}

	inheritTolerance = (tolerance) => {
		this.setState({ tolerance });
	}

	ms(bpm) {	
		return 60 * 1000 / bpm
	}

	switch() {
		this.setState(function(prevState) {
			prevState.toggle ? this.stop() : this.start();
			return {
				toggle: !prevState.toggle
			}
		});
	}

	start() {
		this.resetState();
		this.timerID = setInterval(() => {
			this.frame()
		}, this.frameRate);
	}

	stop() {
		clearInterval(this.timerID);
	}

	resetState() {
		this.setState({
			date: new Date(),
			counter: 0,
			// wand stuff
			rotation: 26,
			direction: true,
			style: this.transformPrefixer('rotate(26deg)'),
			tockCounter: 0
		})
	}

	transformPrefixer(property) {
		return {
			WebkitTransform: property,
			msTransform: property,
			transform: property
		}
	}

	// only update setInterval state here
	frame() {
		this.setState(function(prevState) {
			let counter, direction, tockCounter, date;

			// this sets accuracy so that the metronome does not 'drag' 
			// metronome will click up to tolerance level milliseconds before
			if (Math.abs(prevState.counter - prevState.ms) < this.state.tolerance || prevState.counter >= prevState.ms) {
				date = new Date();
				counter = 0;
				prevState.direction ? direction = false : direction = true;
				({ tockCounter } = this.tickTock(prevState.beat, prevState.tockCounter));
			} else {
				date = new Date();
				let difference = (date - prevState.date);

				counter = prevState.counter + difference;
				direction = prevState.direction;
				tockCounter = prevState.tockCounter;
			}
			
			let { style } = this.animateWand(prevState.counter, prevState.direction);

			// console.log(counter);
			return {
				date,
				counter,
				direction,
				style,
				tockCounter
			}
		})
	}

	// ticking and tocking and helpers
	tickTock(beat, tockCounter) {
		if (beat == 1) {
			this.tock()
		} else {
			if (tockCounter) {
				this.tock();
			} else {
				this.tick();
			}
		}

		tockCounter += 1;
		tockCounter >= beat ? tockCounter = 0 : undefined;
		return { tockCounter }; 
	}

	tick() {
		console.log('tick');

		// ensures sounds don't run into each other
		this.tickSound.pause();
		this.tickSound.currentTime = 0;
		this.tickSound.play();
	}

	tock() {
		console.log('tock');

		// ensures sounds don't run into each other
		// this.tockSound.pause();
		// this.tockSound.currentTime = 0;
		// this.tockSound.play();		
	}

	// wand animation and helpers
	animateWand(counter, direction) {
		let rotation = this.calcRotation(counter, direction);

		return {
			style: this.transformPrefixer(`rotate(${rotation}deg)`)
		}
	}

	calcRotation(counter, direction) {
		let ratio = counter / this.state.ms;
		if (direction) {
			return ratio * (-1 * 52) + 26;
		} else {
			return ratio * (1 * 52) - 26
		}
	}

	render() {
		return (
			<div>
				<BPM inheritBPM={this.inheritBPM} inheritBeat={this.inheritBeat} inheritTolerance={this.inheritTolerance} />
				<div className="row">
					<div className="metronome">
						<img src={wand} style={this.state.style} className="wand" alt="metronome-wand" />
					</div>
				</div>
				<div className="row">
					<button className="button" onClick={this.switch}>
						{this.state.toggle ? "OFF" : "ON"}
					</button>
				</div>
				<div className="explanation">
					<h4>Technical Explanation</h4>
					<p>In the search for a more accurate digital metronome I have discovered that by reading time from the Date function using SetInterval gives quite a range of differences in the alotted time passed. This adds up to the fact that the metronome hardly ever calculates the exact amount of expired time before the next beat.</p>
					<code>
						// round 1 <br/>
						let counter = 9992; // time expired in ms <br/>
						let goal = 1000; // ms needed to pass for 60 BPM <br/>
						<br/>
						// round 2 <br/>
						let timePassed = 5; <br/>
						counter = 9992 + timePassed; // 9997 ms <br/>
						<br/> 
						// round 3 <br/>
						let timePassed = 7;<br/>
						counter = 9997 + timePassed // 1004 ms<br/>
					</code>
					<p>Now should the metronome click at round 2 or at round 3? At round 2 it will be ahead and at round 3 it will be behind. The implementation of a tolerance (ms) means that the metronome can be configured to click 'early'. At tolerance of >4 ms the metronome would click on round 2 and at a lower tolerance would click on round 3.</p>
					<p>For some musicians a metronome that 'rushes' is preferable to one that 'drags'. Of course the metronome dragging and rushing has inspired many music jokes but in this instances they are actually correct. This metronome allows the user to choose.</p>
				</div>
			</div>
		);
	}

}
		
export default Metronome;