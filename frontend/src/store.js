import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { recipeListReducer, recipeDetailsReducer } from './reducers/recipeReducers' 
import { favReducer } from './reducers/favReducers'

const reducer = combineReducers({
    recipeList: recipeListReducer,
    recipeDetails: recipeDetailsReducer,
    fav: favReducer
})

const favItemsFromStorage = localStorage.getItem('favItems') ? JSON.parse(localStorage.getItem('favItems')) : []

const initialState = {
    fav: { favItems: favItemsFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store