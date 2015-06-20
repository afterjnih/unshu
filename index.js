var React = require('react');
var mediaList = require('react-bootstrap');
var texts = [];
var tweets = {};

var ws = new WebSocket('ws://localhost:3000');
console.log(ws);
ws.onmessage = function (event) {
    data = JSON.parse(event.data);
    console.log(data);
    if (typeof data.user === "undefined"){
      for (userId in data){ //初回接続時
        tweets[userId] = {name:                    data[userId].name,
                          screen_name:             data[userId].screen_name,
                          profile_image_url_https: data[userId].profile_image_url_https,
                          texts:                   [data[userId].text]
                          }
      }
      console.log(tweets);
    }else{
      pushTweet(data.user.id, data.text);
      console.log(tweets);
    }
    React.render(<Panes tweets={tweets}/>, document.body);
}

function pushTweet(userId, text){
  if (typeof tweets[userId] === "undefined"){
    tweets[userId].texts = [text];
  }else{
    tweets[userId].texts.push(text);
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
      if (text === ''){
         return <br></br>;
      }else{
        return <Tweet text={text}/>;
      }
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
    name: React.PropTypes.string.isRequired,
    screenName: React.PropTypes.string.isRequired,
    profileImageUrlHttps: React.PropTypes.string.isRequired,
    texts: React.PropTypes.array
  },
  render: function(){
    return(
      <div className="pane">
        <div className="pull-left">
          <img className="icon" src={this.props.profileImageUrlHttps} />
        </div>
        <div className="media-body">
          <span className="name"><small>{this.props.name}</small></span>
          <span className="screenName"><small><small>{" @" + this.props.screenName}</small></small></span>
          <Tweets texts={this.props.texts}/>
        </div>
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
    for (var userId in tweets){
        panes_list.push(<li className="media col-xs-12 col-sm-4 col-md-3 col-lg-2">
                          <Pane name={tweets[userId].name}
                          screenName={tweets[userId].screen_name}
                          profileImageUrlHttps={tweets[userId].profile_image_url_https}
                          texts={tweets[userId].texts}/>
                        </li>
                        );
    }
    return panes_list;
  },
  render: function(){
    return(
      <ul className="panes media-list">
        <div className="row">
          {this.renderPanes(this.props.tweets)}
        </div>
      </ul>
    );
  }
})
