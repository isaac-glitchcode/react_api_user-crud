import React from 'react';
import './App.css';
import Form from './components/form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isFetch : true,
    };
  }

  componentDidMount() {
    //Obtener los posts
    fetch("https://academlo-api-users.herokuapp.com")
      .then(response => response.json())
      .then(results => this.setState({message : results , isFetch:false}))
      .catch(error => console.log(error));
  }

 
  render() {
    if(this.state.isFetch){
      return 'Loading...'
    }
    return (
      <div>
        {console.log(this.state.message.message)}
        <Form/>
      </div>
    );
  }
}

export default App;
