import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default class Dash extends Component {
  constructor(){
    super();

    this.state = {
        ID: 0,
        itemName: '',
        upc: 0,
        cost: 0,
        retail: 0,
        quantity: 0,
        vendor: ''
    }

    this.handleKeyPres = this.handleKeyPres.bind(this)
    this.handleClickRemove = this.handleClickRemove.bind(this)
  }

  handleClickRemove(){
    const answer = window.confirm('Are you sure you want to remove this item?')
    if(answer){
      axios.delete(`http://localhost:3535/delete/item/${this.state.ID}`)
    } else {
      return null
    }
  }


  handleKeyPres(e){
    if (e.key === 'Enter') {
      axios.get(`http://localhost:3535/search/${e.target.value}`)
      .then((res) => {
        console.log('response', res)
        
        this.setState({
          ID: res.data[0].ID,
          itemName: res.data[0].item_name,
          upc: res.data[0].product_code,
          cost: res.data[0].cost,
          retail: res.data[0].retail,
          quantity: res.data[0].quantity,
          vendor: res.data[0].vendor
        })
      })
      .then( ()=> console.log(this.state))
    }
  }
  
  

  render() {
    

    return (
      <div>
        <div>
          <Header/>
        </div>

        <div className='search-results' >
            <p>Search Inventory</p>
            <input onKeyPress={this.handleKeyPres} className='search-input' type="text"/> 
            {/* Need to find good way to display it and finish back end
              /* <p>Filter By Category</p>
            <select name="Filter" id="filter-type">
              <option value="null">None</option>
              <option value="Holiday">Holiday</option>
              <option value="Grocery">Grocery</option>
              <option value="Dairy">Dairy</option>
              <option value="Frozen">Frozen</option>
            </select>   */}
            { this.state.itemName === '' ? (<div></div>) :(
           <div className='result-box'>
              <div>Name:<span className='result-boxes'> {this.state.itemName} </span></div>

              <div>Cost:<span className='result-boxes'> {this.state.cost} </span></div>

              <div>UPC:<span className='result-boxes'> {this.state.upc} </span></div>

              <div>Price:<span className='result-boxes'> {this.state.retail} </span></div>

              <div>Vendor:<span className='result-boxes'> {this.state.vendor} </span></div>

              <div>Quantity:<span className='result-boxes'> {this.state.quantity} </span></div>

              <Link to={`/update/${this.state.ID}`} >
                <button className='create-button' >Update Item</button>
              </Link>
                <button onClick={this.handleClickRemove} className='create-button' >Delete Item</button>
          </div>
            )}
        </div>
      </div>
    )
  }
}
