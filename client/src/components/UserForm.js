import React, { Component } from 'react';
import axios from 'axios';
import "../App.css";

export default class CreateUser extends Component {
    state = {
        firstName:'',
        lastName:'',
        age:0,
        gender:'',
        error:'',
        visible: true,
        users:[]
    }
 

componentDidMount() {
    axios.get('/api/users')
    .then(response => {
        if(response.data.length > 0) {
            this.setState({
                users: response.data.map(user => user.firstName),
                
            })
        }
    })
}

validate= () => {
    let error='';

      if(!this.state.firstName || !this.state.lastName || !this.state.age){
        error="can't be Blank";
    }
      if(error){
          this.setState({error});
          return false;
      }
      return true;

}
    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const config ={
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const userData = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            age:this.state.age,
            gender:this.state.gender
        };
    
        
       const isValid = this.validate();
        if(isValid){
            axios.post('/api/users', userData, config)
            .then(res => console.log(res.data));
           window.location="/";
    
        this.setState({
            firstName:'',
            lastName:'',
            age:0,
            gender:''
        })
    }
        }
        

        
    render() {
        return (
            <div className="container">
    <button className="btn btn-primary" onClick={() => {this.setState({
        visible:false
    })}}>Add Details</button>
                    <br/>
                    <br/>
                    {this.state.visible ? null :
                <form onSubmit={this.handleSubmit} className="contain">
                    
                    <div className="form-group">
                    
                        <label>Firstname: </label>
                        <br/>
                        <input type="text"
                        placeholder="Enter firstname"
                        name="firstName"
                        className="form-group"
                        value={this.state.firstName}
                        onChange={this.onChange}/>
                        <div style={{ fontSize: 12, color: "red"}}>{this.state.error}</div>
                        
                    </div>
                    
                    <div className="form-group">
                        <label>Lastname: </label>
                        <br/>
                        <input type="text"
                        placeholder="Enter lastname"
                        name="lastName"
                        className="form-group"
                        value={this.state.lastName}
                        onChange={this.onChange}/>
                        <div style={{ fontSize: 12, color: "red"}}>{this.state.error}</div>
                    </div>
                    
                    <div className="form-group">
                        <label>Age: </label>
                        <br/>
                        <input type="number"
                        name="age"
                        className="form-group"
                        value={this.state.age}
                        onChange={this.onChange}/>
                        <div style={{ fontSize: 12, color: "red"}}>{this.state.error}</div>
                    </div>
                    
                    <div className="form-group">
                        <label>Gender:
                            <br/>
                        <input type="radio" value="male" name="gender" checked={this.state.gender ==="male"} onChange={this.onChange}/>Male 
                        <br/>
                        
                        <input type="radio" value="female" name="gender" checked={this.state.gender ==="female"} onChange={this.onChange}/>Female
                        </label>
                        <div style={{ fontSize: 12, color: "red"}}>{this.state.error}</div>
                         </div>

                         <div className="form-group">
                            <input type="submit" value="CreateUser" className="btn btn-primary" />
                         </div>
                </form>
    }
            </div>
        )
    }
}


