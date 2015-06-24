var React = require('react');
var MasonryMixin = require('react-masonry-mixin');
var maxTweetsPerPerson = 10;

var masonryOptions = {
    transitionDuration: 0
};

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
      <div className="pane item">
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
 mixins: [MasonryMixin('container', masonryOptions)],
 renderPanes: function(tweets){
    if (tweets !== {}){
      var panes_list = [];
      for (var userId in tweets){
          panes_list.push(
                          <Pane name={tweets[userId].name}
                          screenName={tweets[userId].screen_name}
                          profileImageUrlHttps={tweets[userId].profile_image_url_https}
                          texts={tweets[userId].texts}/>
                          );
      }
      return panes_list;
    }
  },
  render: function(){
    return(
      <div ref="container" className="panes">
        {this.renderPanes(this.props.tweets)}
      </div>
    );
  }
});

module.exports = Panes;
