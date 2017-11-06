import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { searchItem } from '../../ducks/reducer'


 class Dash extends Component {
  constructor(props){
    super(props);

    // this.state = {
    //     ID: 0,
    //     itemName: '',
    //     upc: 0,
    //     cost: 0,
    //     retail: 0,
    //     quantity: 0,
    //     vendor: ''
    // }

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleClickRemove = this.handleClickRemove.bind(this)
  }

  handleClickRemove(){
    const answer = window.confirm('Are you sure you want to remove this item?')
    if(answer){
      axios.delete(`http://localhost:3535/delete/item/${this.props.ID}`)
    } else {
      return null
    }
  }


  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.props.searchItem(e)
    }
  }
  
  

  render(props) {
    

    return (
      <div>
        <div>
          <Header/>
        </div>

        <div className='search-results' >
            <p>Search Inventory</p>
            <input onKeyPress={this.handleKeyPress} className='search-input' type="text"/> 
            {/* Need to find good way to display it and finish back end
              /* <p>Filter By Category</p>
            <select name="Filter" id="filter-type">
              <option value="null">None</option>
              <option value="Holiday">Holiday</option>
              <option value="Grocery">Grocery</option>
              <option value="Dairy">Dairy</option>
              <option value="Frozen">Frozen</option>
            </select>   */}
            { this.props.itemName === '' ? (<div></div>) :(
           <div className='create-box'>
          <div className='create-inputs'>
            <p className='text-one'>Name:</p>
            <input  value={this.props.itemName} className='text-input' type="text"/>
            <p className='text-two'>UPC:</p>
            <input value={this.props.upc} className='text-input-one' type="text"/>
            <p className='text-three'>Cost:</p>
            <input  value={this.props.cost} className='text-input-two' type="text"/>
            <p className='text-four'>Retail:</p>
            <input value={this.props.retail} className='text-input-three' type="text"/>
            <p className='text-five'>Quantity:</p>
            <input value={this.props.quantity} className='text-input-four' type="text"/>
            <p className='text-six'>Vendor:</p>
            <input value={this.props.vendor} className='text-input-five' type="text"/>

              <Link to={`/update/${this.props.ID}`} >
                <button className='create-button' >Update Item</button>
              </Link>
                <button onClick={this.handleClickRemove} className='remove-button' >Delete Item</button>
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
    ID: state.ID,
    itemName: state.item_name,
    upc: state.product_code,
    cost: state.cost,
    retail: state.retail,
    quantity: state.quantity,
    vendor: state.vendor
  }
}


export default connect(mapStateToProps, { searchItem })(Dash)