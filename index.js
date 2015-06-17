var React = require('react');

var texts = [];

var ws = new WebSocket('ws://localhost:3000');
console.log(ws);
ws.onmessage = function (event) {
  texts.push(event.data);
  console.log(texts);
  React.render(<Tweets texts={texts}/>, document.body);
}

var Tweet = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },
  render: function(){
    return (
      <div className="tweet">
        <div className="text"> {this.props.text} </div>
      </div>
    );
  }
});

var Tweets = React.createClass({
  propTypes: {
    texts: React.PropTypes.array
  },
  getDefaultProps: function(){
    return{
      texts: ["notweet"]
    };
  },
  renderTweets: function(texts){
    return texts.map(function (text, i){
      return <Tweet text={text}/>;
    }.bind(this));
  },
  render: function(){
    return(
      <div className="tweets">
        {this.renderTweets(this.props.texts)}
      </div>
    );
  }
});
