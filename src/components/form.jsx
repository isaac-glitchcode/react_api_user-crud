import React, { Component } from 'react';



export default class Form extends Component {
    constructor(props){
        super(props);
        this.state={
          formData:{}
        }
    }
    
    register = (event) => {
        event.preventDefault();
    
        fetch(" https://academlo-api-users.herokuapp.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.formData)
        })  
          .then(response => response.json())
          .then(data => {
                
                this.props.getDataFn();
          } )
          .catch(error => console.log(error)); 
    };
    
    setInputValue = event => {
        event.preventDefault();
        this.setState({ 
          formData: {
            ...this.state.formData,
            [event.target.name]: event.target.value 
          }
        });
        console.log(this.state)
    };

    render() {
        return (
            <div className="form">
                <form onSubmit={this.register} onInput={this.setInputValue} >
                    <input name="name"     type="text"     placeholder="Name(s)" />
                    <input name="lastname" type="text"     placeholder="Lastname" />
                    <input name="email"    type="email"    placeholder="Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <input type="submit" />
                </form> 
             </div> 
        );
  }
}
