import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { recipeListReducer, recipeDetailsReducer } from './reducers/recipeReducers' 
import { favReducer } from './reducers/favReducers'
import { userLoginReducer } from './reducers/userReducers'
 
const reducer = combineReducers({
    recipeList: recipeListReducer,
    recipeDetails: recipeDetailsReducer,
    fav: favReducer,
    userLogin: userLoginReducer
})

const favItemsFromStorage = localStorage.getItem('favItems') ? JSON.parse(localStorage.getItem('favItems')) : []

const userInfomStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    fav: { favItems: favItemsFromStorage },
    userLogin: { userInfo: userInfomStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store