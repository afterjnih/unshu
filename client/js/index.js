var React = require('react');
var Dialog = require('./dialog.js');
var Form = require('./form.js');
var Panes = require('./panes.js');
var texts = [];
var tweets = {};
var data = {};
var maxTweetsPerPerson = 10;

var ws = new WebSocket('ws://localhost:3000');
console.log(ws);
ws.onmessage = function (event) {
  console.log(event);
  if (event.data === ''){
    // React.render(<Form/>, document.body);
  }else{
    data = JSON.parse(event.data);
    // console.log(data);
    if (typeof data.events !== "undefined"){ //
      // React.render(<Dialog events={data.events}/>, document.body);
    //  console.log('getevent!!!!!!');
    }else if(typeof data.message !== "undefined"){ //人数が多いまたは0のとき
      data.events = {message: data.message};
    }else if (typeof data.user === "undefined"){ //初回接続時
      tweets = [];
    // console.log("connect");
    // console.log(data.events);
      for (userId in data){ //初回接続時
        tweets[userId] = {name:                    data[userId].name,
                          screen_name:             data[userId].screen_name,
                          profile_image_url_https: data[userId].profile_image_url_https,
                          texts:                   [data[userId].text]
                          }
      }
      // console.log(tweets);
      // React.render(<Content tweets={tweets}/>, document.body);
    }else{ //通常のtweet受信時
      pushTweet(data.user.id, data.text, data);
      console.log(tweets);
      // React.render(<Content tweets={tweets}/>, document.body);
    }
    // React.render(<Content tweets={tweets} events={data.events}/>, document.body);
  }
  // console.log(data.events);
    React.render(<Content tweets={tweets} events={data.events}/>, document.body);
}

function pushTweet(userId, text, data){
  if (typeof tweets[userId] === "undefined"){
    // tweets[userId].texts = [text];
    tweets[userId] = {name: data.user.name,
                      screen_name: data.user.screen_name,
                      profile_image_url_https: data.user.profile_image_url_https,
                      texts: data.text
                    };
  }else{
    tweets[userId].texts.push(text);
    if (tweets[userId].texts.length > maxTweetsPerPerson)
      tweets[userId].texts.shift();
  }
}

var Content = React.createClass({
  propTypes: {
    tweets: React.PropTypes.object,
    events: React.PropTypes.object
  },
  getDefaultProps: function(){
    return{
        tweets: {},
        events: {}
    }
  },
  render: function(){
    if(Object.keys(this.props.events).length == 0){
      console.log('no dialog');
    return <div className="content">
            <Form/>
            <Panes tweets={this.props.tweets}/>
           </div>
    }else{
      console.log('show dialog');
    return <div className="content">
            <Form/>
            <Panes tweets={this.props.tweets}/>
            <Dialog events={this.props.events}/>
           </div>
           ;
   }
  }
});
