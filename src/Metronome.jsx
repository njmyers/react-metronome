class Metronome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ticker: 'l'};
    this.bpm = 140;
    this.ms = 60 * 1000 / this.bpm;
  }
    
componentDidMount() {
  this.timerID = setInterval(() => {
    this.tick()
  }, this.ms);
}
  
  
  componentWillUnmount() {
    clearInterval(this.timerID)
  }

    tick() {
    this.ticker === 'l' ? this.ticker = 'r' : this.ticker = 'l';
    console.log(this.ticker);
    this.setState({
      ticker: this.ticker
    });
  }
  
  render() {
    return (
      <div>
        <p>{this.state.ticker}</p>
      </div>
    );
  }
}
        
ReactDOM.render(<Metronome />, document.getElementById('root'));