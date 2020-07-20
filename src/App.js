import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import './App.css';
import Form from './components/form';
import EditForm from './components/editForm';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users:[],
      editForm:false,
      temporal:[]
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
  }

  alertDelete = id =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      background: '#2d2d2d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.value){
       this._delete(id);
      }
    })
  }
  alertSuccess = (word) => {
    Swal.fire(
     word,
    'The user has been '+ word +'.',
    'success'
    )
  }

  _delete = id => {
    fetch('https://academlo-api-users.herokuapp.com/user/' +id,{
        method: 'DELETE'
    })
    .then(() => {
        this.alertSuccess('Deleted');
        this.getData()
    })
    .catch(error => console.error(error));
  }

  editUser = (user) => {
    const id = user.id;
    this.state.users.filter((user) => {
      if(user.id === id){
        return this.setState({
          temporal: {
            id:user.id,
            name: user.name,
            lastname:user.lastname,
            email: user.email,
            password:user.password
        }
      });  
      }
    })
    this.setState({editForm:!this.state.editForm})
  }

  updateUser = (event) => {
    event.preventDefault();
    const numId = this.state.temporal.id;
    fetch('https://academlo-api-users.herokuapp.com/user/' +numId,{
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.temporal)
    })
    .then(() => {
        this.alertSuccess('Edited');
        this.getData()
    })
    .catch(error => console.error(error));
    console.log(this.state.users)
    this.setState({ editForm : !this.state.editForm })
  }

  handleInputEdit = event => {
    event.preventDefault();
    this.setState({ 
      temporal: {
        ...this.state.temporal,
        [event.target.name]: event.target.value 
      }
    });
};

  render() {
    
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
                        className="btn btn-primary"
                        onClick={()=>this.editUser(user)}
                        >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={()=>this.alertDelete(user.id)}>
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
        {this.state.editForm === true ? 
        (<EditForm 
        user ={this.state.temporal} 
        editInput = {this.handleInputEdit}
        updateUser ={this.updateUser}/>) : (<div />)}
      </div>
    );
  }
}

export default App;