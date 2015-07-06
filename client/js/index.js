var React = require('react');
var Dialog = require('./dialog.js');
var Form = require('./form.js');
var Panes = require('./panes.js');
var util = require('../../util/util');
var texts = [];
var tweets = {};
var data = {};
var maxTweetsPerPerson = 10;

var ws = new WebSocket('ws://' + location.host);
console.log(ws);
ws.onmessage = function (event) {
  console.log(event);
  if (event.data === ''){
  }else{
    data = JSON.parse(event.data);
    if (typeof data.events !== "undefined"){
    }else if(typeof data.message !== "undefined"){ //人数が多いまたは0のとき
      data.events = {message: data.message};
    }else if (typeof data.user === "undefined"){ //初回接続時
      tweets = [];
      for (userId in data){
        tweets[userId] = {name:                    data[userId].name,
                          screen_name:             data[userId].screen_name,
                          profile_image_url_https: data[userId].profile_image_url_https,
                          texts:                   [data[userId].text]
                          }
      }
    }else{ //通常のtweet受信時
      tweets = util.pushTweet(data, tweets, maxTweetsPerPerson);
      console.log(tweets);
    }
  }
  console.log(typeof tweets);
    React.render(<Content tweets={tweets} events={data.events}/>, document.body);
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
    console.log(this.props.tweets);
    console.log(Object.keys(this.props.tweets).length);
    console.log('this is content');
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
