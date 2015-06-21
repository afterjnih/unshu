var React = require('react');

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
