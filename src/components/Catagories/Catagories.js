import React, { Component } from 'react'
import Checkbox from 'material-ui/Checkbox'
import {connect} from 'react-redux'
import { updateCheckGrocery } from '../../ducks/reducer'


 class Catagories extends Component {
    constructor(){
        super();

        this.state = {
            checkedGrocery: false,
            checkedDairy: false,
            checkedFrozen: false,
            checkedHoliday: false,
            checkedDisableGrocery: false,
            checkedDisableDairy: false,
            checkedDisableFrozen: false,
            checkedDisableHoliday: false
        }

        this.updateCheckGrocery = this.updateCheckGrocery.bind(this)
        this.updateCheckDairy = this.updateCheckDairy.bind(this)
        this.updateCheckFrozen = this.updateCheckFrozen.bind(this)
        this.updateCheckHoliday = this.updateCheckHoliday.bind(this)
    }

    
    updateCheckGrocery() {
        this.setState({
            checkedGrocery: !this.state.checkedGrocery,
            checkedDisableDairy: !this.state.checkedDisableDairy,
            checkedDisableFrozen: !this.state.checkedDisableFrozen,
            checkedDisableHoliday: !this.state.checkedDisableHoliday
        })
      }
    updateCheckDairy() {
        this.setState({
            checkedDairy: !this.state.checkedDairy,
            checkedDisableGrocery: !this.state.checkedDisableGrocery,
            checkedDisableFrozen: !this.state.checkedDisableFrozen,
            checkedDisableHoliday: !this.state.checkedDisableHoliday
          })
      }
    updateCheckFrozen() {
        this.setState({
            checkedFrozen: !this.state.checkedFrozen,
            checkedDisableGrocery: !this.state.checkedDisableGrocery,
            checkedDisableDairy: !this.state.checkedDisableDairy,
            checkedDisableHoliday: !this.state.checkedDisableHoliday
        })
      }
    updateCheckHoliday() {
        this.setState({
            checkedHoliday: !this.state.checkedHoliday,
            checkedDisableGrocery: !this.state.checkedDisableGrocery,
            checkedDisableDairy: !this.state.checkedDisableDairy,
            checkedDisableFrozen: !this.state.checkedDisableFrozen
        })
      }
    
    


  render() {



    return (
      <div className='check-box'>
        <Checkbox  className='check1' 
        label = 'Grocery'
        checked={this.state.checkedGrocery}
        onCheck={this.updateCheckGrocery}
        disabled={this.state.checkedDisableGrocery}
        />
        <Checkbox  className='check2'
        label = 'Dairy'
        checked={this.state.checkedDairy}
        onCheck={this.updateCheckDairy}
        disabled={this.state.checkedDisableDairy}
        />
        <Checkbox  className='check3'
        label = 'Frozen'
        checked={this.state.checkedFrozen}
        onCheck={this.updateCheckFrozen}
        disabled={this.state.checkedDisableFrozen}
        />
        {/* <Checkbox  className='check4'
        label = 'Holiday'
        checked={this.state.checkedHoliday}
        onCheck={this.updateCheckHoliday}
        disabled={this.state.checkedDisableHoliday}
        /> */}
      </div>
    )
  }
}


function mapStateToProps(state) {
    return{
        checkedGrocery: state.checkedGrocery,
        checkedDairy: state.checkedDairy,
        checkedFrozen: state.checkedFrozen,
        checkedHoliday: state.checkedHoliday
    }
  }


export default connect(mapStateToProps, { updateCheckGrocery })(Catagories)