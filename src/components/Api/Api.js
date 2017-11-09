import React, { Component } from 'react'
import Header from '../Header/Header'
import {connect} from 'react-redux'
import { searchApi, addApi, handleName, handleUpc, handleRetail, handleCost, handleQuantity, handleVendor } from '../../ducks/reducer'
import {Link} from 'react-router-dom'


class Api extends Component {
    constructor(){
        super();

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


  


  render() {



    return (
        <div>
          <div>
            <Header/>
          </div>
  
          <div className='api-search-results' >
            
              <p>Search Api</p>
              <input onKeyPress={this.handleKeyPressApi} className='search-input' type="text"/> 
              
              { this.props.apiSearch !== true ? (<div className='fill' ></div>) :(
                  this.props.apiResults.map((item, i) => {
                      return (
             <div className='create-box' key={i} >
            <div className='create-inputs'>
              <p className='text-one'>Name:</p>
              <input onChange={(e) => this.props.handleName({value: e.target.value, index: i})} value={this.props.apiResults[i].name} className='text-input' type="text"/>
              <p className='text-two'>UPC:</p>
              <input onChange={(e) => this.props.handleUpc({value: e.target.value, index: i})} value={this.props.apiResults[i].upc} className='text-input-one' type="text"/>
              <p className='text-three'>Cost:</p>
              <input onChange={(e) => this.props.handleCost({value: e.target.value, index: i})} className='text-input-two' type="text"/>
              <p className='text-four'>Retail:</p>
              <input onChange={(e) => this.props.handleRetail({value: e.target.value, index: i})} value={this.props.apiResults[i].salePrice} className='text-input-three' type="text"/>
              <p className='text-five'>Quantity:</p>
              <input onChange={(e) => this.props.handleQuantity({value: e.target.value, index: i})} className='text-input-four' type="text"/>
              <p className='text-six'>Vendor:</p>
              <input onChange={(e) => this.props.handleVendor({value: e.target.value, index: i})} className='text-input-five' type="text"/>
                <Link to='/dashboard' className='link-button' >
                  <button className='api-button' onClick={() => this.props.addApi(
                      {
                          itemName: this.props.apiResults[i].name,
                          upc: this.props.apiResults[i].upc,
                          cost: this.props.apiResults[i].cost,
                          retail: this.props.apiResults[i].salePrice,
                          quantity: this.props.apiResults[i].quantity,
                          vendor: this.props.apiResults[i].vendor
                        })} >Add Item</button>
                </Link>
            </div>
            </div>
              )
            }))}
          </div>
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return{
      itemName: state.itemName,
      upc: state.upc,
      cost: state.cost,
      retail: state.retail,
      quantity: state.quantity,
      vendor: state.vendor,
      apiSearch: state.apiSearch,
      apiResults: state.apiResults    
    }
  }
  
  
  export default connect(mapStateToProps, { searchApi, addApi, handleName, handleUpc, handleRetail, handleCost, handleQuantity, handleVendor })(Api)