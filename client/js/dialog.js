var React = require('react');
var Modal = require('boron/FadeModal');
var request = require('superagent');
var serverUrl = 'http://localhost:3000/event';

var Dialog = React.createClass({
  propTypes: {
    events: React.PropTypes.object
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
  showModal: function(){
    this.refs.modal.show();
  },
  hideModal: function(){
    this.refs.modal.hide();
  },
  componentDidMount: function(){
    console.log('mount!!!!!!!!!!!!!!!!');
    this.refs.modal.show();
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
      <div className='dialog'>
        <Modal ref="modal">
          <h2>イベントを選択してください</h2>
          <form onSubmit={this.submitHandler}>
            {this.showEvents(this.props.events)}
            <button type="submit">監視する</button>
          </form>
        </Modal>
      </div>
    );
  }
});

module.exports = Dialog;
