import React from 'react';
import './App.css';
import Form from './components/form';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users:[]
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () =>{
    fetch("https://academlo-api-users.herokuapp.com/users")
    .then(response => response.json())
    .then(results => this.setState({ users: results.data}))
    .catch(error => console.log(error));
  }
 
  render() {
    
    return (
      <div className="App">
        <Form getDataFn = {this.getData}/>
        <div className="users"> 
          <table >
            {console.log(this.state.users)} 
                <thead>
                    <tr>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.users.map(({name, lastname, email, password}, index) =>
                    <tr key={index}>
                        <td>{name}</td>
                        <td>{lastname}</td>
                        <td>{email}</td>
                        <td>{password}</td>
                    </tr>
                        )}
                </tbody>
            </table>   
          </div>
      </div>
    );
  }
}

export default App;
