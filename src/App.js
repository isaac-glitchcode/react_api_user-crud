import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
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
    .then(data => this.setState({ users: data.data}))
    .catch(error => console.log(error));
    console.log(this.state)
  }

  alertDelete = id =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.value){
       this._delete(id);
      }
    })
  }

  _delete = id => {
    fetch('https://academlo-api-users.herokuapp.com/user/' +id,{
        method: 'DELETE'
    })
    .then(() => {
        Swal.fire(
          'Deleted!',
          'The user has been deleted.',
          'success'
        );
        this.getData()
    })
    .catch(error => console.error(error));
    console.log(this.state.users)
  }

  render() {
    console.log(this.state.users)
    const users = this.state.users.map((user)=>{
      return <div className="users col-md-4" key={user.id}> 
                <div className="card mt-4">
                  <div className="card-title text-center">
                    <h2>User</h2>
                    <div className="card-body">
                      <div>{user.name}</div>
                      <div>{user.lastname}</div>
                      <div>{user.email}</div>
                      <div>{user.password}</div>
                    </div>
                    <div >
                      <button
                        className="btn btn-danger"
                        onClick={()=>this.alertDelete(user.id)}>
                          {console.log(user.id)}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
             </div>
          })
    
    return (
      <div className="App">
        <Form getDataFn = {this.getData}/>
        {users}
      </div>
    );
  }
}

export default App;
