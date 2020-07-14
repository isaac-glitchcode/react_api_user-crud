import React, { Component } from 'react';



export default class Form extends Component {
    constructor(props){
        super(props);
        this.state={
            users : []
        }
    }
    
    addUser = (event) => {
        event.preventDefault();
        // var data = {username: 'example'};
        
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state)
        })  
          .then(res => res.json())
          .then(response => console.log('Success:', response))
          .catch(error => console.log(error));
    };
    
      handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state)
      };
  render() {
    return (
        <div>
            <form onInput={this.handleInput} onSubmit={this.addUser}>
                <input name="users" type="text" placeholder="Name" />
                <input type="submit" />
            </form>
            

        </div>
    );
  }
}
