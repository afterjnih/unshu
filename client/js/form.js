var React = require('react');
var request = require('superagent');
var serverUrl = 'http://' + location.host + '/events';

var Form = React.createClass({
  getInitialState: function(){
      return{
        keyword: ""
      };
    },
  handleChange: function(event){
    this.setState({
      keyword: event.target.value
    });
  },
  submitHandler: function(event){
    console.log(event);
    event.preventDefault();
    request
      .post(serverUrl)
      // .send({greaturl: this.state.url})
      .set('Content-Type', 'string')
      .send(this.state.keyword)
      .end(function(err, res){
        console.log(res);
      });
  },
  render: function(){
    return <form onSubmit={this.submitHandler}>
      <input
        type="text"
        placeholder="スペース区切りで&条件"
        value={this.state.keyword}
        onChange={this.handleChange} />
      <button type="submit">検索</button>
      </form>;
  }
})

module.exports = Form;
