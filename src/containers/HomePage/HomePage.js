import React, { Component } from "react";
import "./HomePage.css";

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: ""
        };
    }


    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        });
    }

    handleSubmit = () => {
        if(this.state.userName=== "haneeq" && this.state.password==="haneeq@123"){
            this.props.history.push("/UserHomePage");
        }
        else{
            alert("Username or password incorrect");
        }        
    }

    render() {
        return (
        <div className="Home">
            <div className="lander">
            <h2>The Handmade Cakes Company</h2>
            <p>We accept orders online</p>          
            </div>
            
            <div className="loginForm">
                <div>
                    <label><b>Username</b></label> <br/>
                    <input id="userName" type="text" placeholder="Enter Username" onChange={this.handleChange} />
                </div>
                <div>
                    <label><b>Password</b></label> <br/>
                    <input id="password" type="password" placeholder="Enter Password" onChange={this.handleChange} />
                </div>
                <div>
                    <button onClick = { ()=> this.handleSubmit()} >Login</button>
                </div>
            </div>
        </div>
        );
    }
}