import axios from 'axios'
const initialState = {
    ID: 0,
    itemName: '',
    upc: 0,
    cost: 0,
    retail: 0,
    quantity: 0,
    vendor: '',
    users: []
}

// Search users

const GET_USERS = 'GET_USERS'

export function getUsers() {
    const users = axios.get('http://localhost:3535/users')
    .then((res) => res.data)
    .then(()=> console.log(initialState.users))
    return {
        type: GET_USERS,
        payload: users
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



export default function reducer(state=initialState, action) {
    switch(action.type) {
        case SEARCH_ITEM + '_FULFILLED':
        let {ID, item_name, product_code, cost, retail, quantity, vendor} = action.payload
        return Object.assign({}, state, {ID, item_name, product_code, cost, retail, quantity, vendor})
        case GET_USERS + '_FULFILLED':
        return Object.assign({}, state, {users: [action.payload]})
        default: 
            return state
    }
}