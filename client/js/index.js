var React = require('react');
var Dialog = require('./dialog.js');
var Form = require('./form.js');
var Panes = require('./panes.js');
var util = require('../../util/util');
var texts = [];
var tweets = {};
var data = {};
// var events;
var maxTweetsPerPerson = 10;

var ws = new WebSocket('ws://' + location.host);
console.log(ws);
ws.onmessage = function (event) {
  var events;
  console.log(event);
  if (event.data !== ''){
    data = JSON.parse(event.data);
    if ('events' in data){
      events = data.events;
    }else if('message' in data){ //人数が多いまたは0のとき
      events = {message: data.message};
    }else{
      tweets = util.pushTweet(data, tweets, maxTweetsPerPerson);
      console.log(tweets);
    }
  }
  console.log(typeof tweets);
  React.render(<Content tweets={tweets} events={events}/>, document.body);
};

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
