import React, { Component } from 'react'
import Header from '../Header/Header'
import {connect} from 'react-redux'
import { searchApi, addApi } from '../../ducks/reducer'
import {Link} from 'react-router-dom'


class Api extends Component {
    constructor(){
        super();
        this.state = {
            itemName: '',
            retail: 0,
            upc: 0
        }

        this.handleName = this.handleName.bind(this)
        this.handleUpc = this.handleUpc.bind(this)
        this.handleRetail = this.handleRetail.bind(this)
        this.handleKeyPressApi = this.handleKeyPressApi.bind(this)        
    }



    handleKeyPressApi(e){
        if (e.key === 'Enter') {
          this.props.searchApi(e).then(
              this.setState({
                itemName: this.props.itemName,
                upc: this.props.upc,
                retail: this.props.retail
          }))
        }
      }

    handleName(e){
        this.setState({
            itemName: e.target.value
        })
    }

    handleUpc(e){
        this.setState({
            upc: e.target.value
        })
    }

    handleRetail(e){
        this.setState({
            retail: e.target.value
        })
    }

  


  render() {



    return (
        <div>
          <div>
            <Header/>
          </div>
  
          <div className='api-search-results' >
            
              <p>Search Api</p>
              <input onKeyPress={this.handleKeyPressApi} className='search-input' type="text"/> 
              
              { this.props.itemName === '' ? (<div></div>) :(
             <div className='create-box'>
            <div className='create-inputs'>
              <p className='text-one'>Name:</p>
              <input onChange={this.handleName} defaultValue={this.props.itemName} className='text-input' type="text"/>
              <p className='text-two'>UPC:</p>
              <input onChange={this.handleUpc} defaultValue={this.props.upc} className='text-input-one' type="text"/>
              <p className='text-three'>Cost:</p>
              <input ref='cost' className='text-input-two' type="text"/>
              <p className='text-four'>Retail:</p>
              <input onChange={this.handleRetail} defaultValue={this.props.retail} className='text-input-three' type="text"/>
              <p className='text-five'>Quantity:</p>
              <input ref='quantity' className='text-input-four' type="text"/>
              <p className='text-six'>Vendor:</p>
              <input ref='vendor' className='text-input-five' type="text"/>
                <Link to='/dashboard' className='link-button' >
                  <button className='api-button' onClick={() => this.props.addApi(
                      {
                          itemName: this.state.itemName,
                          upc: this.state.upc,
                          cost: this.refs.cost.value,
                          retail: this.state.retail,
                          quantity: this.refs.quantity.value,
                          vendor: this.refs.vendor.value
                        })} >Add Item</button>
                </Link>
            </div>
            </div>
              )}
          </div>
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return{
      itemName: state.itemName,
      upc: state.product_code,
      cost: state.cost,
      retail: state.retail,
      quantity: state.quantity,
      vendor: state.vendor
    }
  }
  
  
  export default connect(mapStateToProps, { searchApi, addApi })(Api)