import React, { Component } from 'react';
import wand from './metronome-wand.svg';

class Wand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: this.props.toggle,
      ms: this.props.ms,
      counter: this.props.counter,
      rotation: 26,
      direction: true,
      style: {
        transform: `rotate(26deg)`,
      },
    };

    // animation
  }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  // componentDidUpdate(prevProps, prevState) {
  // 		console.log(`props: ${prevProps.toggle}`);
  // 		console.log(`state: ${prevState.toggle}`);
  // 		if (prevProps.toggle !== prevState.toggle) {
  // 			this.setState({
  // 				toggle: prevProps.toggle
  // 			});

  // 			// prevState.toggle ? this.stopAnimation() : this.startAnimation();
  // 		}

  // 		// prevState.toggle ? this.startAnimation() : this.stopAnimation();

  // }

  componentDidUpdate(prevProps, prevState) {
    this.setState(function(prevState) {
      if (prevProps.ms !== prevState.ms) {
        return {
          ms: prevProps.ms,
        };
      }

      // console.log(prevProps.counter);s

      // let rotation = this.calcRotation(prevState.counter, prevState.direction);
      // let counter, direction

      // if (prevState.counter === this.ms) {
      // 	prevState.direction ? direction = false : direction = true;
      // } else {
      // 	counter = prevState.counter + this.frameRate;
      // 	direction = prevState.direction;
      // }

      // // set state
      // return {
      // 	counter: counter,
      // 	rotation,
      // 	direction,
      // 	style: {
      // 		transform: `rotate(${rotation}deg)`
      // 	}
      // }
    });
  }

  // startAnimation() {
  // 	console.log('started');
  // 	this.wandID = setInterval(() => {
  // 		this.updateRotation()
  // 	}, this.frameRate)
  // }

  // stopAnimation() {
  // 	console.log('stopped');
  // 	clearInterval(this.wandID);
  // }

  calcRotation(counter, direction) {
    let ratio = counter / this.ms;
    if (direction) {
      return ratio * (-1 * 52) + 26;
    } else {
      return ratio * (1 * 52) - 26;
    }
  }

  render() {
    return (
      <div>
        <img src={wand} style={this.state.style} className="wand" />
      </div>
    );
  }
}

export default Wand;
