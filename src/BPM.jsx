import React, { Component } from 'react';
// import { DragSource } from 'react-dnd';
// import { Knob } from 'react-knob'

class BPM extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bpm: 60,
			beat: 1,
			tolerance: 6,
		}

		this.handleBPMChange = this.handleBPMChange.bind(this);
		this.handleBeatChange = this.handleBeatChange.bind(this);
		this.handleToleranceChange = this.handleToleranceChange.bind(this);
	}

	handleBPMChange(event) {
		this.setState({
			bpm: event.target.value
		});

		this.props.inheritBPM(event.target.value);
	}

	handleBeatChange(event) {
		this.setState({
			beat: event.target.value
		})

		this.props.inheritBeat(event.target.value);
	}

	handleToleranceChange(event) {
		this.setState({
			tolerance: event.target.value
		})

		this.props.inheritTolerance(event.target.value);
	}

	render() {
		return (
			<div className="row">
				<div className="controls">
					<span>
						<label>BPM: {this.state.bpm}</label>
						<input type="range" min="30" max="320" name="bpm" value={this.state.bpm} onChange={this.handleBPMChange} />
					</span>
					<span>
						<label>Beat: {this.state.beat}</label>
						<input type="range" min="0" max="7" name="beat" value={this.state.beat} onChange={this.handleBeatChange} />
					</span>
					<span>
						<label>Tolerance: {this.state.tolerance}</label>
						<input type="range" min="0" max="10" name="beat" value={this.state.tolerance} onChange={this.handleToleranceChange} />
					</span>
				</div>
			</div>
		)
	}
}

export default BPM;