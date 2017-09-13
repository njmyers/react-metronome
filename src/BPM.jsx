import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
// import { Knob } from 'react-knob'



class BPM extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bpm: 60
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			bpm: event.target.value
		});

		this.props.callback(Number(event.target.value));
	}

	render() {
		return (
			<div>
			<form name="controls">
				<label>
					BPM:
					<input type="text" name="bpm" value={this.state.bpm} onChange={this.handleChange} />
				</label>
			</form>
			</div>
		)
	}
}

export default BPM;

class Knob extends Component {

	render() {
		return (
			<div className="knob">
				<div className="circle">
				</div>
			<p>SASS TEXT</p>
			</div>
		)
	}

}