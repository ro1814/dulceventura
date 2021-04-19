import axios from 'axios'
import { FAV_ADD_ITEM, FAV_REMOVE_ITEM } from '../constants/favConstant'

export const addToFav = ( id ) => async ( dispatch, getState ) => {
    const { data } = await axios.get(`/api/recipes/${id}`)

    dispatch({
        type: FAV_ADD_ITEM,
        payload: {
            recipe: data._id,
            name: data.name,
            image: data.image
        }
    })

    localStorage.setItem('favItems', JSON.stringify(getState().fav.favItems))
}

export const removeFromFav = (id) => (dispatch, getState) => {
    dispatch({
        type: FAV_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('favItems', JSON.stringify(getState().fav.favItems))
}