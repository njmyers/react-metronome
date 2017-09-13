import React, { Component } from 'react';
import wand from './metronome-wand.svg';

class Wand extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toggle: false,
			counter: 0,
			rotation: 26,
			direction: true,
			style: {
				transform: `rotate(26deg)`
			}
		}
		this.ms = this.props.state.ms;
		this.toggle = this.props.toggle;

		// animation
		this.frameRate = 4;

		this.switch = this.switch.bind(this);
	}

	switch() {
		this.setState(function(prevState) {
			// start or stop
			prevState.toggle ? this.stopAnimation() : this.startAnimation();
			// set state
			return {
				toggle: !prevState.toggle,
			}
		});
	}

	updateRotation() {
		this.setState(function(prevState) {

			console.log(prevState.direction);
			// console.log(prevState.counter);
			let rotation = this.calcRotation(prevState.counter, prevState.direction);
			let counter, direction

			if (prevState.counter === this.ms) {
				counter = 0;
				prevState.direction ? direction = false : direction = true;
			} else {
				counter = prevState.counter + this.frameRate;
				direction = prevState.direction;
			}

			// set state
			return {
				counter: counter,
				rotation,
				direction,
				style: {
					transform: `rotate(${rotation}deg)`
				}
			}			
		})
	}

	startAnimation() {
		this.wandID = setInterval(() => {
			this.updateRotation()
		}, this.frameRate)		
	}

	stopAnimation() {
		clearInterval(this.wandID);
	}

	calcRotation(counter, direction) {
		let ratio = counter / this.ms;
		if (direction) {
			return ratio * (-1 * 52) + 26;
		} else {
			return ratio * (1 * 52) - 26
		}
	}


	render() {
		return (
			<div>
				<img src={wand} style={this.state.style} className="wand" />
				<button onClick={this.switch}>animate</button>
			</div>
		)
	}

}

export default Wand;