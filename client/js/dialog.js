var React = require('react');
var Modal = require('boron/FadeModal');
var request = require('superagent');
var serverUrl = 'http://' + location.host + '/event';

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
  componentDidMount: function(){
    console.log('Mount!!!!!!');
    console.log(Object.keys(this.props.events).length);
    if (Object.keys(this.props.events).length !== 0){
      this.refs.modal.show();
    }else{
      this.refs.modal.hide();
    }
  },
  componentDidUpdate: function(){
    console.log('update!!!!!!');
    console.log(Object.keys(this.props.events).length);
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
  hideModal: function(){
    this.refs.modal.hide();
  },
  renderModal: function(events){
    if(typeof events.message !== "undefined"){
      return(
        <div>
          <h4 className="messageAboutInvalidNumberOfPeople">{events.message}</h4>
          <div className="text-center">
            <button onClick={this.hideModal}>閉じる</button>
          </div>
        </div>
      );
    }else if(Object.keys(events).length !== 0){
      return(
        <div>
          <h2 className="text-center">イベントを選択してください</h2>
          <form onSubmit={this.submitHandler}>
            {this.showEvents(this.props.events)}
            <div className="text-center">
              <button className="submitButton" type="submit">Watch!!</button>
            </div>
          </form>
        </div>
      );
    }else{
      return(<div>chosen!!!</div>)
    }
  },
  render: function(){
    // return({this.renderModal(this.props.events)});
    console.log(Object.keys(this.props.events).length);
    return(
        <Modal ref="modal">
          {this.renderModal(this.props.events)}
        </Modal>
    );
  }
});

module.exports = Dialog;
