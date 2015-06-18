var React = require('react');

var texts = [];
var tweets = {};

var ws = new WebSocket('ws://localhost:3000');
console.log(ws);
ws.onmessage = function (event) {
  try{
    data = JSON.parse(event.data);
    pushTweet(data.user.screen_name, data.text);
    console.log(tweets);
    React.render(<Panes tweets={tweets}/>, document.body);
  }catch(SyntaxError){
    console.log(event);
  }
}

function pushTweet(user, text){
  if (typeof tweets[user] === "undefined"){
    tweets[user] = [text];
  }else{
    tweets[user].push(text);
  }
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

var Pane = React.createClass({
  propTypes: {
    screenName: React.PropTypes.string.isRequired,
    texts: React.PropTypes.array
  },
  render: function(){
    return(
      <div className="pane">
        <dive className="screenName">{this.props.screenName}</dive>
        <Tweets texts={this.props.texts}/>
      </div>
    );
  }
});

var Panes = React.createClass({
  propTypes: {
    tweets: React.PropTypes.object
  },
  renderPanes: function(tweets){
    var panes_list = [];
    for (screenName in tweets){
      console.log(tweets);
      console.log(tweets[screenName])
      panes_list.push(<Pane screenName={screenName} texts={tweets[screenName]}/>);
    }
    return panes_list;
  },
  render: function(){
    return(
      <div className="panes">
        {this.renderPanes(this.props.tweets)}
      </div>
    );
  }
})
