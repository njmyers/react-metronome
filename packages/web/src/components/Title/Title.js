// @flow
import * as React from 'react';
import './title.sass';

type Props = {
  text: string,
};

class Title extends React.Component<Props> {
  static defaultProps = {
    text: 'Title',
  };

  letterizer() {
    let arr = this.props.text.split('');
    let i = 0;
    let spanner = arr.map(function(letter) {
      i += 1;
      return <span key={i}>{letter}</span>;
    });

    return spanner;
  }

  render() {
    let arr = this.letterizer();
    return <div className="title">{arr}</div>;
  }
}

export default Title;
