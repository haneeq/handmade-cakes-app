import React, { Component } from "react";

export default class Orders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shapes: "",
            size: [100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000],
            totalPrice: "",
            selectedShape: "",
            selectedSize: "",
            selectedToppings:[],
            messageText: "",
        };
    }

    componentDidMount(){

        // 'Content-Type': 'application/json'      
        this.getAllShapes();
        this.getAllToppings();
      }

      getAllShapes = () => {
        const result = this.invokeAPI('Shapes');        
        result.then(data =>{
            this.setState({ shapes : data });
        });
      }

      getAllToppings = () => {
        const result = this.invokeAPI('Toppings');        
        result.then(data =>{
            this.setState({ toppings : data });
        });
      }

      invokeAPI = (urlPath, data, method) => {

        var url = "http://localhost:49903/api/" + urlPath;
        var body = {
            headers: { 'Access-Control-Allow-Origin' : '*', 'Content-Type' : 'application/json; charset=utf-8' },
            method: method ? method : "GET",
            body: data ? JSON.stringify(data) : data
        }

        return fetch(url, body)
        .then(response =>{
            return response.json()
        })
        .then(data =>{
            return data;
        });

      }

    onChangeDropdown = (event) => {

        this.setState({ [event.target.name] : event.target.value }, 
                    () => { 
                        this.calculatePrice();
                    });
    }

    onChangeToppings = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        this.setState({selectedToppings : value}, 
            () => { 
                this.calculatePrice();
            });
    }

    calculatePrice = async () => {
        let selectedShape = this.state.selectedShape;
        let selectedSize = this.state.selectedSize;
        if(selectedShape && selectedSize && selectedShape != 0 && selectedSize != 0){
            const data = {
                "ShapeId" : selectedShape,
                "Size" : selectedSize,
                "Message" : this.state.messageText,
                "lstToppings": this.state.selectedToppings && this.state.selectedToppings
            }

            let url = "";
            (selectedShape == 1) ? url = "SquareShape" : (selectedShape == 2) ? url ="RoundShape" : "";

            this.invokeAPI(url, data, "POST")
                .then(data =>{
                    this.setState({ totalPrice : data.price });
                }).catch(e =>{
                    console.log(e)
                });
        }
        else{
            this.setState({ totalPrice : 0 });
        }
    }

    submitOrder = async () => {     
        let selectedShape = this.state.selectedShape;
        let selectedSize = this.state.selectedSize;
        if(selectedShape && selectedSize && selectedShape != 0 && selectedSize != 0) {

            const data = {
                "id" : Math.floor(Math.random() * (999999 - 0 + 1)) + 0,
                "ShapeId" : selectedShape,
                "Size" : selectedSize,
                "Message" : this.state.messageText,
                "lstToppings": this.state.selectedToppings && this.state.selectedToppings,
                "Price" : this.state.totalPrice
            }

            const result = this.invokeAPI("Orders", data, "POST");
                result.then(data =>{
                    console.log("SUCCESS --", data)
                    alert("Order placed successfully");
                }).catch(e =>{
                    console.log(e)
                });
        }
        else{
            alert("Shape and size are mandatory!")
        }
    }     

    render() {
        return (
            <div>
            <div>
                <label style={{width: '100px'}}>Shape<span style={{color: 'red'}}>*</span></label>
                <select name="selectedShape" value={this.state.selectedShape} onChange={(e) => this.onChangeDropdown(e)}>
                    <option value={0}>-- Select --</option>
                    {this.state.shapes && this.state.shapes.map((obj, index) => {
                        
                        return <option key={index} value={obj.id}>{obj.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label style={{width: '100px'}}>Size<span style={{color: 'red'}}>*</span></label>
                <select name="selectedSize" value={this.state.selectedSize} onChange={(e) => this.onChangeDropdown(e)}>
                    <option value={0}>-- Select --</option>
                    {this.state.size && this.state.size.map((val, index) => {
                        
                        return <option key={index} value={val}>{val}</option>
                    })}
                </select>
            </div>
            <div>
                <label style={{ width: '100px', verticalAlign: 'top'}}>Toppings&nbsp; &nbsp;</label>
                <select name="selectedToppings" value={this.state.selectedToppings} multiple={true} 
                    onChange={(e) => this.onChangeToppings(e)}>
                    {this.state.toppings && this.state.toppings.map((obj, index) => {
                        
                        return <option key={index} value={obj.id}>{obj.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label style={{width: '100px'}}>Message (optional)</label>
                <input type="text" name="messageText" maxLength="20" placeholder="Maximum 20 characters allowed" width="100px"
                    value={this.state.messageText} onChange={(e) => this.onChangeDropdown(e)} 
                    style={{width : "25%"}}/>
            </div>
            <div>
                <label style={{width: '100px'}}>Price</label>
                <label style={{ color: 'Red', fontSize: '20px'}}>$ {this.state.totalPrice ? this.state.totalPrice : 0}</label>
            </div>
            <div>
                <button onClick={this.submitOrder} style={{width : "10%", padding: '7px'}} >Submit Order</button>
            </div>
            </div>
        )
    }
}