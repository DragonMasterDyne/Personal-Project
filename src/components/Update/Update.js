import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { reset, updateItem } from '../../ducks/reducer'
import {connect} from 'react-redux'


class Update extends Component {
  constructor(){
    super();

    this.state = {
      id: 0,
      itemName: '',
      upc: 0,
      cost: 0,
      retail: 0,
      quantity: 0,
      vendor: ''
  }
  this.handleName = this.handleName.bind(this)
  this.handleUpc = this.handleUpc.bind(this)
  this.handleCost = this.handleCost.bind(this)
  this.handleRetail = this.handleRetail.bind(this)
  this.handleQuantity = this.handleQuantity.bind(this)
  this.handleVendor = this.handleVendor.bind(this)
  this.handleClick = this.handleClick.bind(this)
  }

  

  componentDidMount() {
    // console.log(this.props)
    axios.get(`/update/${this.props.match.params.ID}`)
    .then((res) => {
      this.setState({
        id: res.data[0].id,
        itemName: res.data[0].item_name,
        upc: res.data[0].product_code,
        cost: res.data[0].cost,
        retail: res.data[0].retail,
        quantity: res.data[0].quantity,
        vendor: res.data[0].vendor
      })
      // console.log(this.state)
    })
  }

  handleClick(state){
    // console.log(this.state)
    // this.props.set()
    // axios.put('/update/item', this.state)
    this.props.updateItem(this.state)
  }
  handleName(e) {
    this.setState({
      itemName: e.target.value
    })
    console.log(this.state)
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

    
    // console.log(this.state.ID)

    return (
      
      <div className='create-main' >
       <Header/>
       <div className='update-top-level'>
        <h5 className='title-text' >Update Item</h5>
      <div className='create-box'>
          <div className='create-inputs'>
            <p className='text-one'>Name:</p>
            <input onChange={this.handleName} className='text-input' type="text" value={this.state.itemName}/>
            <p className='text-two'>UPC:</p>
            <input onChange={this.handleUpc} className='text-input-one' type="text" value={this.state.upc}/>
            <p className='text-three'>Cost:</p>
            <input onChange={this.handleCost} className='text-input-two' type="text" value={this.state.cost}/>
            <p className='text-four'>Retail:</p>
            <input onChange={this.handleRetail} className='text-input-three' type="text" value={this.state.retail}/>
            <p className='text-five'>Quantity:</p>
            <input onChange={this.handleQuantity} className='text-input-four' type="text" value={this.state.quantity}/>
            <p className='text-six'>Vendor:</p>
            <input onChange={this.handleVendor} className='text-input-five' type="text" value={this.state.vendor}/>
            <Link to='/dashboard' className='link-button' >
              <button onClick={this.handleClick} className='update-button' >Update Item</button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return{
    itemUpdated: state.itemUpdated
  }
}


export default connect(mapStateToProps, { reset, updateItem })(Update)