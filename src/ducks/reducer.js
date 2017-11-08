import axios from 'axios'
const initialState = {
    ID: 0,
    itemName: '',
    upc: 0,
    cost: 0,
    retail: 0,
    quantity: 0,
    vendor: '',
    users: [],
    userName: '',
    userEmail: ''
}

// Ceate Users

const CREATE_USER = 'CREATE_USER'

export function handleClickCreateUser(user){
    console.log(user)
   const createNewUser = axios.post('http://localhost:3535/create/user', user)
    return {
        type: CREATE_USER,
        payload: createNewUser
    }
  }

// Search users

const GET_USERS = 'GET_USERS'

export function getUsers() {
    const allUsers = axios.get('http://localhost:3535/users')
    .then((res) => res.data)
    return {
        type: GET_USERS,
        payload: allUsers
    }
}


// Search items

const SEARCH_ITEM = 'SEARCH_ITEM'

export function searchItem(e){
     const item = axios.get(`http://localhost:3535/search/${e.target.value}`)
      .then((res) =>  res.data[0] )
    return {
        type: SEARCH_ITEM,
        payload: item
    }
  }
const SEARCH_API = 'SEARCH_API'

export function searchApi(e){
     const item = axios.get(`http://localhost:3535/search/api/${e.target.value}`)
      .then((res) =>  res.data.items[0] )
    return {
        type: SEARCH_API,
        payload: item
    }
  }

  // Create items

  const CREATE_ITEM_API = 'CREATE_ITEM_API'

  export function addApi(item) {
      const createItem = axios.post('http://localhost:3535/create/item/api', item)
      return {
          type: CREATE_ITEM_API,
          payload: createItem
      }
  }



export default function reducer(state=initialState, action) {
    switch(action.type) {
        case SEARCH_ITEM + '_FULFILLED':
            let {ID, item_name, product_code, cost, retail, quantity, vendor} = action.payload
                return Object.assign({}, state, {ID, itemName: item_name, product_code, cost, retail, quantity, vendor})
        case SEARCH_API + '_FULFILLED':
            let {name, upc, salePrice} = action.payload
                return Object.assign({}, state, {itemName: name, product_code: upc, retail: salePrice})
        case GET_USERS + '_FULFILLED':
            let user = action.payload
                return Object.assign({}, state, {users: user})
        case CREATE_USER + '_FULFILLED':
            let newUsers = action.payload
                return Object.assign({}, state, {users: newUsers})
        case CREATE_ITEM_API + '_FULFILLED':
            let api = action.payload
                return Object.assign({}, state, {api})
        default: 
            return state
    }
}