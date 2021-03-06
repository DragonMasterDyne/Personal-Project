import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { searchItem, searchApi, reset, getUserInfo } from '../../ducks/reducer'
import Snackbar from 'material-ui/Snackbar';


 class Dash extends Component {
  constructor(props){
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleClickRemove = this.handleClickRemove.bind(this)
  }

  handleClickRemove(id){
    const answer = window.confirm('Are you sure you want to remove this item?')
    if(answer){
      axios.delete(`/delete/item/${id.id}`)
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
    this.props.reset();
    this.props.getUserInfo();
  }
  
  

  render() {
    console.log(this.props)
    console.log(this.props.itemSearch)
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
            { this.props.search !== true ? (<div className='fill'></div>) :(
              this.props.itemSearch.map((item, i) => {
                return (
           <div className='create-box' key={i}>
          <div className='create-inputs'>
            <p className='text-one'>Name:</p>
            <input  value={this.props.itemSearch[i].item_name} disabled='true' className='text-input' type="text"/>
            <p className='text-two'>UPC:</p>
            <input value={this.props.itemSearch[i].product_code} disabled='true' className='text-input-one' type="text"/>
            <p className='text-three'>Cost:</p>
            <input  value={this.props.itemSearch[i].cost} disabled='true' className='text-input-two' type="text"/>
            <p className='text-four'>Retail:</p>
            <input value={this.props.itemSearch[i].retail} disabled='true' className='text-input-three' type="text"/>
            <p className='text-five'>Quantity:</p>
            <input value={this.props.itemSearch[i].quantity} disabled='true' className='text-input-four' type="text"/>
            <p className='text-six'>Vendor:</p>
            <input value={this.props.itemSearch[i].vendor} disabled='true' className='text-input-five' type="text"/>

              <Link to={`/update/${this.props.itemSearch[i].id}`}  >
                <button className='create-button'>Update Item</button>
              </Link>
                <button onClick={() => this.handleClickRemove({id: this.props.itemSearch[i].id})} className='remove-button'>Delete Item</button>
          </div>
          <div className='fill2'></div>
          </div>
                )})
            )}
        </div >
        <Snackbar
                open={this.props.api}
                message="Item has been Added!"
                autoHideDuration={4000}
            />
        <Snackbar
                open={this.props.itemUpdated}
                message="Item has been Updated!"
                autoHideDuration={4000}
            />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    id: state.id,
    itemName: state.itemName,
    upc: state.upc,
    cost: state.cost,
    retail: state.retail,
    quantity: state.quantity,
    vendor: state.vendor,
    api: state.api,
    itemCreated: state.itemCreated,
    itemUpdated: state.itemUpdated,
    itemSearch: state.itemSearch,
    search: state.search
  }
}


export default connect(mapStateToProps, { searchItem, searchApi, reset, getUserInfo })(Dash)