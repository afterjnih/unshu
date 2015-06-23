var React = require('react');
var Dialog = require('./dialog.js');
var Form = require('./form.js');
var Panes = require('./panes.js');
var texts = [];
var tweets = {};
var maxTweetsPerPerson = 10;

var ws = new WebSocket('ws://localhost:3000');
console.log(ws);
ws.onmessage = function (event) {
  console.log(event);
  if (event.data === ''){
    React.render(<Form/>, document.body);
    // React.render(<Dialog/>, document.body);
  }else{
    data = JSON.parse(event.data);
    console.log(data);
    if (typeof data.events !== "undefined"){
      React.render(<Dialog events={data.events}/>, document.body);
     console.log('getevent!!!!!!');
    }else if (typeof data.user === "undefined"){
      tweets = [];
    console.log("connect");
      for (userId in data){ //初回接続時
        tweets[userId] = {name:                    data[userId].name,
                          screen_name:             data[userId].screen_name,
                          profile_image_url_https: data[userId].profile_image_url_https,
                          texts:                   [data[userId].text]
                          }
      }
      console.log(tweets);
      React.render(<Content tweets={tweets}/>, document.body);
    }else{
      pushTweet(data.user.id, data.text);
      console.log(tweets);
      React.render(<Content tweets={tweets}/>, document.body);
    }
    // React.render(<Content tweets={tweets}/>, document.body);
  }
}

function pushTweet(userId, text){
  if (typeof tweets[userId] === "undefined"){
    tweets[userId].texts = [text];
  }else{
    tweets[userId].texts.push(text);
    if (tweets[userId].texts.length > maxTweetsPerPerson)
      tweets[userId].texts.shift();
  }
}

var Content = React.createClass({
  propTypes: {
    tweets: React.PropTypes.object
  },
  render: function(){
    return <div className="content">
            <Form/>
            <Panes tweets={this.props.tweets}/>
           </div>
           ;
  }
});
