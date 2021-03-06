import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';
import Catagories from '../Catagories/Catagories'

export default class Create extends Component {
  constructor(){
    super();

    this.state = {
      itemName: '',
      upc: 0,
      cost: 0,
      retail: 0,
      quantity: 0,
      vendor: '',
      open: false
  }
  this.resetState = this.resetState.bind(this)
  this.handleName = this.handleName.bind(this)
  this.handleUpc = this.handleUpc.bind(this)
  this.handleCost = this.handleCost.bind(this)
  this.handleRetail = this.handleRetail.bind(this)
  this.handleQuantity = this.handleQuantity.bind(this)
  this.handleVendor = this.handleVendor.bind(this)
  this.handleClick = this.handleClick.bind(this)
  }

  handleClick(state){
    console.log(this.state)
    axios.post('/create/item', this.state)
    this.setState({
      itemName: '',
      upc: 0,
      cost: 0,
      retail: 0,
      quantity: 0,
      vendor: '',
      open: true
    }, () => setTimeout(this.resetState, 5000))
    
  }

  resetState() {
    this.setState({
      open: false
    })
  }
  handleName(e) {
    this.setState({
      itemName: e.target.value
    })
    // console.log(this.state)
  }

  handleUpc(e) {
    this.setState({
      upc: e.target.value
    })
  }

  handleCost(e) {
    this.setState({
      cost: e.target.value
    })
  }

  handleRetail(e) {
    this.setState({
      retail: e.target.value
    })
  }

  handleQuantity(e) {
    this.setState({
      quantity: e.target.value
    })
  }

  handleVendor(e) {
    this.setState({
      vendor: e.target.value
    })
  }
  

  render() {
    
    return (
      
      <div className='create-main' >
       <Header/>
       <div className='top-level'>
        <h5 className='title-text' >Create a new Item</h5>
      <div className='create-box'>
          <div className='create-inputs'>
            <p className='text-one'>Name:</p>
            <input onChange={this.handleName} value={this.state.itemName} className='text-input' type="text"/>
            <p className='text-two'>UPC:</p>
            <input onChange={this.handleUpc} value={this.state.upc === 0 ? '' : this.state.upc} className='text-input-one' type="text"/>
            <p className='text-three'>Cost:</p>
            <input onChange={this.handleCost} value={this.state.cost === 0 ? '' : this.state.cost} className='text-input-two' type="text"/>
            <p className='text-four'>Retail:</p>
            <input onChange={this.handleRetail} value={this.state.retail === 0 ? '' : this.state.retail} className='text-input-three' type="text"/>
            <p className='text-five'>Quantity:</p>
            <input onChange={this.handleQuantity} value={this.state.quantity === 0 ? '' : this.state.quantity} className='text-input-four' type="text"/>
            <p className='text-six'>Vendor:</p>
            <input onChange={this.handleVendor} value={this.state.vendor} className='text-input-five' type="text"/>
            {/* <Catagories/> */}
            <button onClick={this.handleClick} className='create-button' >Create Item</button>
            <div>
            </div>
            <Snackbar
                open={this.state.open}
                message="Item has been created"
                autoHideDuration={4000}
            />
          </div>
        </div>
        </div>
      </div>
    )
  }
}
