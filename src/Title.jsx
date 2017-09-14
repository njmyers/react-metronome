import React, { Component } from 'react';

class Title extends Component {
	constructor(props) {
		super(props);
		this.title = this.props.title;
	}

	letterizer() {
		let arr = this.title.split('');
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