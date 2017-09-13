import React, { Component } from 'react';

// components
import BPM from './BPM';
import Wand from './Wand';

// assets
import click from './click.mp3';
import base from './metronome-base.svg';

class Metronome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ticker: true,
			toggle: false,
			bpm: 60,
			ms: this.ms(60)
		};
		this.click = new Audio(click);
		this.beat = 4;
		this.tock = 1;

		this.metronomeSwitch = this.metronomeSwitch.bind(this);
	}
	
	// must keep this binding and named function
	// to inherit values from BPM counter child
	inheritBPM = (bpm) => {
		this.setState({
			bpm,
			ms: this.ms(bpm)
		});
	}

	ms(bpm) {	
		return 60 * 1000 / bpm
	}

	startTicking() {
		this.timerID = setInterval(() => {
			this.tick()
		}, this.state.ms);
	}
	
	metronomeSwitch() {
		console.log(this);
		this.setState(function(prevState) {
			prevState.toggle ? this.stopTicking() : this.startTicking();
			return {
				toggle: !prevState.toggle
			}
		});
	}

	stopTicking() {
		clearInterval(this.timerID)
	}

	tick() {
		if (this.tock === this.beat) {
			this.ticker = 'r';
			this.tock = 0;
		} else {
			this.ticker = 'l';
		}

		this.click.pause();
		this.click.currentTime = 0;
		this.click.play();
		this.tock ++;

		console.log(this.ticker);
		console.log(this.state)

		this.setState({
			ticker: this.ticker
		});
	}
	
	render() {
		return (
			<div>
				<p>{this.state.ticker}</p>
				<BPM callback={this.inheritBPM} />
				<div className="metronome">
					<Wand state={this.state} />
				</div>
				<div className="row">
					<button className="button" onClick={this.metronomeSwitch}>{this.state.toggle ? "OFF" : "ON"}</button>
				</div>
			</div>
		);
	}

}
		
export default Metronome;