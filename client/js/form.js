var React = require('react');
var request = require('superagent');
var serverUrl = 'http://localhost:3000/event';

var Form = React.createClass({
  getInitialState: function(){
      return{
        url: "John Doe"
      };
    },
  handleChange: function(event){
    this.setState({
      url: event.target.value
    });
  },
  submitHandler: function(event){
    event.preventDefault();
    request
      .post(serverUrl)
      // .send({greaturl: this.state.url})
      .set('Content-Type', 'string')
      .send(this.state.url)
      .end(function(err, res){
        console.log(res);
      });
  },
  render: function(){
    return <form onSubmit={this.submitHandler}>
      <input
        type="text"
        value={this.state.url}
        onChange={this.handleChange} />
      <button type="submit">送信</button>
      </form>;
  }
})

module.exports = Form;
