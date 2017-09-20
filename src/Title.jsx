import React, { Component } from 'react';

class Title extends Component {
	constructor(props) {
		super(props);
		this.text = this.props.text;
	}

	letterizer() {
		let arr = this.text.split('');
		let i = 0;
		let spanner = arr.map(function(letter) {
			i += 1;
			return (
				<span key={i}>{letter}</span>
			)
		});
		console.log(spanner);
		return spanner;
	}

	render() {
		let arr = this.letterizer();
		return (
			<div className="title">
				{arr}
			</div>

		)
	}

}

export default Title;