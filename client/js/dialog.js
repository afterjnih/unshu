var React = require('react');
var Modal = require('boron/FadeModal');
var request = require('superagent');
var serverUrl = 'http://localhost:3000/event';

var Dialog = React.createClass({
  propTypes: {
    events: React.PropTypes.object
  },
  getDefaultProps: function(){
    return{
      events: {}
    };
  },
  getInitialState: function(){
    return{
      eventUrl: null
    };
  },
  onChange: function(event){
    this.setState({
      eventUrl: event.target.value
    });
  },
  componentDidUpdate: function(){
    if (Object.keys(this.props.events).length !== 0){
      this.refs.modal.show();
    }else{
      this.refs.modal.hide();
    }
  },
  showEvents: function(events){
    var eventList = [];
    for(title in events){
      eventList.push(<input type="radio" name="event" onChange={this.onChange} value={events[title].url + 'participation/'}>{title}</input>);
    };
    return eventList;
  },
  submitHandler: function(event){
      event.preventDefault();
      request.post(serverUrl)
             .set('Content-Type', 'string')
             .send(this.state.eventUrl)
             .end(function(err, res){
               console.log(res);
             });
  },
  render: function(){
    return(
        <Modal ref="modal">
          <h2>イベントを選択してください</h2>
          <form onSubmit={this.submitHandler}>
            {this.showEvents(this.props.events)}
            <button type="submit">監視する</button>
          </form>
        </Modal>
    );
  }
});

module.exports = Dialog;
