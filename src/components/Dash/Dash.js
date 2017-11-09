import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { searchItem, searchApi, reset } from '../../ducks/reducer'
import Snackbar from 'material-ui/Snackbar';


 class Dash extends Component {
  constructor(props){
    super(props);

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
  
  componentDidMount() {
    reset()
  }
  
  

  render() {
    console.log(this.props)

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
            { this.props.ID === 0 ? (<div></div>) :(
           <div className='create-box'>
          <div className='create-inputs'>
            <p className='text-one'>Name:</p>
            <input  value={this.props.itemName} disabled='true' className='text-input' type="text"/>
            <p className='text-two'>UPC:</p>
            <input value={this.props.upc} disabled='true' className='text-input-one' type="text"/>
            <p className='text-three'>Cost:</p>
            <input  value={this.props.cost} disabled='true' className='text-input-two' type="text"/>
            <p className='text-four'>Retail:</p>
            <input value={this.props.retail} disabled='true' className='text-input-three' type="text"/>
            <p className='text-five'>Quantity:</p>
            <input value={this.props.quantity} disabled='true' className='text-input-four' type="text"/>
            <p className='text-six'>Vendor:</p>
            <input value={this.props.vendor} disabled='true' className='text-input-five' type="text"/>

              <Link to={`/update/${this.props.ID}`}  >
                <button className='create-button'>Update Item</button>
              </Link>
                <button onClick={this.handleClickRemove} className='remove-button'>Delete Item</button>
          </div>
          </div>
            )}
        </div>
        <Snackbar
                open={this.props.api}
                message="Item has been added!"
                autoHideDuration={4000}
            />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    ID: state.ID,
    itemName: state.itemName,
    upc: state.upc,
    cost: state.cost,
    retail: state.retail,
    quantity: state.quantity,
    vendor: state.vendor,
    api: state.api
  }
}


export default connect(mapStateToProps, { searchItem, searchApi, reset })(Dash)