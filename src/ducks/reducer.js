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
   const createNewUser = axios.post('http://localhost:3535/create/user', user)
    return {
        type: CREATE_USER,
        payload: createNewUser
    }
  }

const USER_NAME = 'USER_NAME'

export function handleChangeUserName(e) {
    return {
        type: USER_NAME,
        payload: e
    }
}

const USER_EMAIL = 'USER_EMAIL'

export function handleChangeUserEmail(e) {
    const newEmail = {'email': e}
    return {
        type: USER_EMAIL,
        payload: newEmail
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



export default function reducer(state=initialState, action) {
    switch(action.type) {
        case SEARCH_ITEM + '_FULFILLED':
        let {ID, item_name, product_code, cost, retail, quantity, vendor} = action.payload
        return Object.assign({}, state, {ID, item_name, product_code, cost, retail, quantity, vendor})
        case GET_USERS + '_FULFILLED':
        let user = action.payload
        return Object.assign({}, state, {users: user})
        case CREATE_USER + '_FULFILLED':
        let newUsers = action.payload
        return Object.assign({}, state, {users: newUsers})
        case USER_NAME + '_FUlFILLED':
        let name = action.payload;
        return Object.assign({}, state, {userName: name})
        case USER_EMAIL + '_FUlFILLED':
        let {email} = action.payload;
        return Object.assign({}, state, {userEmail: email})
        default: 
            return state
    }
}