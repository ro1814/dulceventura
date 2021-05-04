import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { recipeListReducer, recipeDetailsReducer, recipeDeleteReducer, recipeCreateReducer, recipeUpdateReducer, recipeReviewCreateReducer } from './reducers/recipeReducers' 
import { favReducer } from './reducers/favReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
 
const reducer = combineReducers({
    recipeList: recipeListReducer,
    recipeDetails: recipeDetailsReducer,
    recipeCreate: recipeCreateReducer,
    recipeDelete: recipeDeleteReducer,
    recipeUpdate: recipeUpdateReducer,
    recipeReviewCreate: recipeReviewCreateReducer,
    fav: favReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
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