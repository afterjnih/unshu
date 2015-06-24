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
      eventList.push(<div className="event">
                       <input className="eventsRadioButton" type="radio" name="event" onChange={this.onChange} value={events[title].url + 'participation/'}/>
                       <span className="eventTitle">{title}</span>
                     </div>);
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
          <h2 className="text-center">イベントを選択してください</h2>
          <form onSubmit={this.submitHandler}>
            {this.showEvents(this.props.events)}
            <div className="text-center">
              <button className="submitButton" type="submit">Watch!!</button>
            </div>
          </form>
        </Modal>
    );
  }
});

module.exports = Dialog;
