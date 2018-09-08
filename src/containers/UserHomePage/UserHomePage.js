import React, { Component } from "react";

export default class UserHomePage extends Component {

  handleNewOrder = () => {
    this.props.history.push("/Orders");       
  }

  render() {
    return (
        <div style={{ textAlign: 'center', marginTop: '35px'}}>
            <h4><a onClick = { ()=> this.handleNewOrder()} >Place new order</a></h4>
        </div>
    )
  }
}