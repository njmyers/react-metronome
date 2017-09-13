import React, { Component } from 'react';

// components
import BPM from './BPM';
import Explanation from './Explanation';
// assets
import tick from './audio/tick.mp3';
import tock from './audio/tock.mp3';
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

		this.tickSound = new Audio(tick);
		this.tockSound = new Audio(tock);
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
		if (parseInt(beat, 10) === 1) {
			this.tick()
		} else {
			if (tockCounter) {
				this.tick();
			} else {
				this.tock();
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
		this.tockSound.pause();
		this.tockSound.currentTime = 0;
		this.tockSound.play();		
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
				<div className="row">
					<h1>Reactronome</h1>
				</div>
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
				<Explanation />
			</div>
		);
	}

}
		
export default Metronome;