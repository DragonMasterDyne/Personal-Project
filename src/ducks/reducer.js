import axios from 'axios'


const initialState = {
    ID: 0,
    itemName: '',
    upc: 0,
    cost: 0,
    retail: 0,
    quantity: 0,
    vendor: '',
    user: {},
    users: [],
    userName: '',
    userEmail: '',
    apiResults: [],
    itemSearch: [],    
    api: false,
    apiSearch: false,
    itemCreated: false,
    itemUpdated: false,
    checkedGrocery: false,
    checkedDairy: false,
    checkedFrozen: false,
    checkedHoliday: false,
    search: false
}

// Ceate Users

const CREATE_USER = 'CREATE_USER'

export function handleClickCreateUser(user){
    // console.log(user)
   const createNewUser = axios.post('/create/user', user)
   .then(res => res.data)
    return {
        type: CREATE_USER,
        payload: createNewUser
    }
  }

// Search users

const GET_USERS = 'GET_USERS'

export function getUsers() {
    const allUsers = axios.get('/api/users')
    .then((res) => res.data)
    return {
        type: GET_USERS,
        payload: allUsers
    }
}

const GET_USER_INFO ='GET_USER_INFO'

export function getUserInfo() {
    const user = axios.get('/auth/me').then( res => {
        if (user === {}) {
            return 
        }
    } )
    return {
        type:GET_USER_INFO,
        payload: user
    }
}


// Search items

const SEARCH_ITEM = 'SEARCH_ITEM'

export function searchItem(e){
     const item = axios.get(`/search/${e.target.value}`).then((res) =>  res.data)
    return {
        type: SEARCH_ITEM,
        payload: item
    }
  }
const SEARCH_API = 'SEARCH_API'

export function searchApi(e){
     const item = axios.get(`/search/api/${e.target.value}`)
      .then((res) =>  res.data.items )
    return {
        type: SEARCH_API,
        payload: item
    }
  }

  // Create items

  const CREATE_ITEM_API = 'CREATE_ITEM_API'

  export function addApi(newItem) {
      const createItem = axios.post('/create/item/api', newItem)
      return {
          type: CREATE_ITEM_API,
          payload: createItem
      }
  }

  // Update Item

  const UPDATE_ITEM = 'UPDATE_ITEM'

  export function updateItem(item){
    const updateItem = axios.put('/update/item', item)
      return {
          type: UPDATE_ITEM,
          payload: updateItem
      }
  }

  // Handle Changes 

  const HANDLE_CHANGE_NAME = 'HANDLE_CHANGE_NAME'

  export function handleName(e) {

      return {
          type: HANDLE_CHANGE_NAME,
          payload: e
      }
  }
  
  const HANDLE_CHANGE_UPC = 'HANDLE_CHANGE_UPC'

  export function handleUpc(e) {
      return {
          type: HANDLE_CHANGE_UPC,
          payload: e
      }
  }
  const HANDLE_CHANGE_COST = 'HANDLE_CHANGE_COST'

  export function handleCost(e) {
      return {
          type: HANDLE_CHANGE_COST,
          payload: e
      }
  }
  
  const HANDLE_CHANGE_RETAIL = 'HANDLE_CHANGE_RETAIL'

  export function handleRetail(e) {
      return {
          type: HANDLE_CHANGE_RETAIL,
          payload: e
      }
  }
  const HANDLE_CHANGE_QUANTITY = 'HANDLE_CHANGE_QUANTITY'

  export function handleQuantity(e) {
      return {
          type: HANDLE_CHANGE_QUANTITY,
          payload: e
      }
  }
  const HANDLE_CHANGE_VENDOR = 'HANDLE_CHANGE_VENDOR'

  export function handleVendor(e) {
      return {
          type: HANDLE_CHANGE_VENDOR,
          payload: e
      }
  }

  // Resets/Set Snackbar Switches 

  const RESET = 'RESET'

  export function reset() {
      const off = false
      const zero = 0
      return {
       type: RESET,
       payload1: off,
       payload2: zero
      }
  }


// Checkbox Switches

const CHECKED_GROCERY = 'CHECKED_GROCERY'

    export function updateCheckGrocery(check) {
        let value = () => {
            if (check === true ) {
            return false 
        } else if (check === false ) {
            return true
        }
    }
      return {
        type: CHECKED_GROCERY,
        payload: value
        }
    }
//   const SET = 'SET'

//   export function set() {
//       const on = true;
//       return {
//           type: SET,
//           payload: on
//       }
//   }



export default function reducer(state=initialState, action) {
    switch(action.type) {
        case SEARCH_ITEM + '_FULFILLED':
            // let {ID, item_name, product_code, cost, retail, quantity, vendor} = action.payload
            let searchResults = action.payload
                // return Object.assign({}, state, {ID, itemName: item_name, upc: product_code, cost, retail, quantity, vendor})
                return Object.assign({}, state, {itemSearch: searchResults, search: true})
        case SEARCH_API + '_FULFILLED':
            let apiResult = action.payload
                return Object.assign({}, state, {apiResults: apiResult, apiSearch: true})
        case GET_USERS + '_FULFILLED':
            let user = action.payload
                return Object.assign({}, state, {users: user})
        case GET_USER_INFO + '_FULFILLED':
                return Object.assign({}, state, {user: action.payload})
        case CREATE_USER + '_FULFILLED':
            let newUsers = action.payload
                return Object.assign({}, state, {users: newUsers})
        case CREATE_ITEM_API + '_FULFILLED':
            let api = action.payload.config.data
                return Object.assign({}, state, {itemName: api.itemName, upc: api.upc, cost: api.cost, retail: api.retail, quantity: api.quantity, vendor: api.vendor, api: true})
        case UPDATE_ITEM + '_FULFILLED':
            let update = action.payload
                return Object.assign({}, state, {itemName: update.itemName, upc: update.upc, cost: update.cost, retail: update.retail, quantity: update.quantity, vendor: update.vendor, itemUpdated: true})
        case HANDLE_CHANGE_NAME:
            let copyName = state.apiResults.slice()
                copyName[action.payload.index].name = action.payload.value
                return Object.assign({}, state, {apiResults: copyName})
        case HANDLE_CHANGE_UPC:
            let copyUpc = state.apiResults.slice()
                copyUpc[action.payload.index].upc = action.payload.value
                return Object.assign({}, state, {apiResults: copyUpc})
        case HANDLE_CHANGE_COST:
            let copyCost = state.apiResults.slice()
                copyCost[action.payload.index].cost = action.payload.value
                    return Object.assign({}, state, {apiResults: copyCost})
        case HANDLE_CHANGE_RETAIL:
            let copyRetail = state.apiResults.slice()
                copyRetail[action.payload.index].salePrice = action.payload.value
                    return Object.assign({}, state, {apiResults: copyRetail})
        case HANDLE_CHANGE_QUANTITY:
            let copyQuantity = state.apiResults.slice()
                copyQuantity[action.payload.index].quantity = action.payload.value
                    return Object.assign({}, state, {apiResults: copyQuantity})
        case HANDLE_CHANGE_VENDOR:
            let copyVendor = state.apiResults.slice()
                copyVendor[action.payload.index].vendor = action.payload.value
                    return Object.assign({}, state, {apiResults: copyVendor})
        case RESET:
            let setOff = action.payload1
            let zero = action.payload2
                return Object.assign({}, state, {api: setOff, itemUpdated: setOff, ID: zero})
        case CHECKED_GROCERY:
            let checkG = action.payload
                return Object.assign({}, state, {checkedGrocery: checkG})
        // case SET:
        //     let setOn = action.payload
        //         return Object.assign({}, state, {itemUpdated: setOn})
        default: 
            return state
    }
}